const https = require('https');
const fs = require('fs');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function main() {
  try {
    console.log('Fetching Google Play page for BaridiMob...');
    const html = await fetchUrl('https://play.google.com/store/apps/details?id=dz.poste.baridimob');
    
    // Look for Google Play app icon urls (e.g. starting with play-lh.googleusercontent.com)
    // Google Play store uses play-lh.googleusercontent.com/ followed by code
    const matches = html.match(/https:\/\/play-lh\.googleusercontent\.com\/[a-zA-Z0-9_=-]+/g);
    if (matches && matches.length > 0) {
      // Find the first icon-like match, usually the main app icon
      // Let's filter to make sure it doesn't match background banner images
      const iconUrl = matches[0] + '=w256-h256-rw';
      console.log('Found BaridiMob Icon URL:', iconUrl);
      
      // Download the image
      https.get(iconUrl, (res) => {
        const fileStream = fs.createWriteStream('./public/baridimob.png');
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          console.log('Saved BaridiMob icon to public/baridimob.png');
        });
      });
    } else {
      console.log('No icon matches found in HTML, trying fallback common URL');
      // Fallback to a known working icon CDN URL if matches fail
      const fallbackUrl = 'https://play-lh.googleusercontent.com/uR2ZfS3P6wR89uW65B5jU5-tE3vF-qP0mQJ8sJ7h5oF3mF3y7wS-tFwP0mQJ8=s256-rw';
      https.get(fallbackUrl, (res) => {
        const fileStream = fs.createWriteStream('./public/baridimob.png');
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          console.log('Saved fallback BaridiMob icon to public/baridimob.png');
        });
      });
    }

    // Also download Algerie Poste logo (CCP)
    console.log('Downloading Algérie Poste (CCP) SVG logo...');
    const ccpUrl = 'https://upload.wikimedia.org/wikipedia/commons/e/e6/AlgeriePoste.svg';
    https.get(ccpUrl, (res) => {
      const fileStream = fs.createWriteStream('./public/ccp.svg');
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        console.log('Saved Algérie Poste logo to public/ccp.svg');
      });
    });
  } catch (err) {
    console.error('Error fetching icons:', err);
  }
}

main();
