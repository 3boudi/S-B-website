import { setRequestLocale } from "next-intl/server";
import Image from "next/image";

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div style={{ backgroundColor: "#ffffff", color: "#000000", minHeight: "100vh", padding: "60px 20px", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          {/* Using a standard img tag to ensure the logo aspect ratio is respected without hardcoding dimensions */}
          <img src="/logo2.png" alt="Company Logo" style={{ maxWidth: "200px", height: "auto" }} />
        </div>
        
        <h1 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "40px", fontWeight: "bold" }}>
          Privacy Policy & Terms of Use
        </h1>
        
        <div style={{ lineHeight: "1.8", fontSize: "1.1rem" }}>
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "15px", fontWeight: "bold" }}>1. App & Website Security</h2>
            <p>Our applications and website are built with security as a top priority. We take all necessary measures to protect the integrity of our services and ensure a safe environment for our users.</p>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "15px", fontWeight: "bold" }}>2. Zero Data Collection</h2>
            <p><strong>We do not collect any personal data at all.</strong> We respect your privacy completely. Our business model relies strictly on providing software activation codes. You simply purchase a code from us to activate the service, and absolutely no personal information is tracked, stored, or processed by our systems.</p>
          </section>

          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "15px", fontWeight: "bold" }}>3. WhatsApp Chatbot Disclaimer & Liability</h2>
            <p>Please note the following regarding the use of our WhatsApp chatbot integration and related software:</p>
            <ul style={{ paddingLeft: "25px", marginTop: "15px", listStyleType: "disc" }}>
              <li style={{ marginBottom: "10px" }}><strong>No Responsibility for Misuse:</strong> We are not responsible for any bad, inappropriate, or unauthorized usage of the WhatsApp chatbot by users or any third parties.</li>
              <li><strong>No Guarantee of Uninterrupted Service:</strong> We are not liable if the chatbot breaks, stops working, or experiences downtime due to WhatsApp API changes, third-party technical issues, or any other unforeseen reasons.</li>
            </ul>
          </section>
        </div>
        
        <div style={{ marginTop: "60px", textAlign: "center", fontSize: "0.9rem", color: "#666" }}>
          <p>By using our applications, website, or purchasing an activation code, you acknowledge and agree to these terms.</p>
        </div>
      </div>
    </div>
  );
}
