---
name: electron-desktop-installer
description: Comprehensive Skill for AI Agents to build, manage, and package high-performance Electron desktop applications with embedded SQLite, native hardware printing, background automation, and rock-solid electron-builder NSIS installers.
---

# ELECTRON DESKTOP APP & PERFECT INSTALLER SKILL

This document provides complete instructions, architecture guidelines, code patterns, and packaging configurations for AI agents to build a **perfect Electron desktop application and installer** tailored to this project stack (**Electron + Vite + React 19 + Better-SQLite3 + Thermal Printing + WhatsApp/Puppeteer Automation + Appwrite Licensing + NSIS Installer**).

---

## 1. CORE ARCHITECTURE & PROCESS ISOLATION

### 1.1 Process Separation Blueprint
To build a secure, stable, high-performance desktop application, strict isolation between processes must be enforced:

1. **Main Process (`electron.cjs`)**:
   - Manages application lifecycle (`app`), native windows (`BrowserWindow`), system tray (`Tray`), IPC handling (`ipcMain`), database operations (`better-sqlite3`), and hardware printers.
   - Restricts security risks: Debugging options like `--inspect` or `--remote-debugging` must terminate packaged production apps immediately.
   - Controls single-instance locking (`app.requestSingleInstanceLock()`).

2. **Preload Process (`preload.cjs`)**:
   - Acts as an immutable, safe bridge using `contextBridge.exposeInMainWorld()`.
   - Never exposes whole Node modules (`fs`, `child_process`, `net`) to the UI renderer.
   - Exposes clean, function-scoped async invocation methods (`electronDB`).

3. **Renderer Process (`src/` with Vite & React)**:
   - Modern UI rendering.
   - Reads synchronously from an in-memory cache and dispatches async updates via IPC.

```js
// Window Creation Best Practice (electron.cjs)
mainWindow = new BrowserWindow({
  width: 1280,
  height: 800,
  minWidth: 900,
  minHeight: 600,
  icon: path.join(__dirname, 'assets', 'icon.png'),
  autoHideMenuBar: true,
  show: false, // Prevents white flash during initial rendering
  webPreferences: {
    preload: path.join(__dirname, 'preload.cjs'),
    nodeIntegration: false,
    contextIsolation: true,
    sandbox: true,
    backgroundThrottling: false
  }
});
```

---

## 2. DATA ARCHITECTURE & DUAL-LAYER STORAGE ENGINE

### 2.1 Storage Pattern
- **In-Memory Cache (Renderer)**: All UI reads occur instantly against cached array/map collections.
- **SQLite Database (`database.cjs` via `better-sqlite3`)**:
  - Uses Write-Ahead Logging (`PRAGMA journal_mode = WAL;`) for maximum crash resilience.
  - Automatic daily database backups to `app.getPath('userData')/backups/`.
  - Schema initialization with safe table migrations (`CREATE TABLE IF NOT EXISTS`).

### 2.2 Hydration Guarantee
- Upon startup, the Renderer process must trigger a full hydration fetch before making the application interactive.
- If data mutation occurs externally or via background workers, the main process broadcasts `db:updated-externally` over IPC to notify the UI to refresh its in-memory state.

---

## 3. NATIVE HARDWARE & SUBSYSTEM INTEGRATIONS

### 3.1 ESC/POS & Thermal Printing Engine (`printEngine.cjs`)
- Supports silent paper printing via invisible secondary `BrowserWindow` instances (`printPreload.cjs`, `receiptPreload.cjs`).
- Supports ESC/POS network thermal receipt printing via direct TCP socket or printer driver commands (`node-thermal-printer`).
- Provides thermal status validation, paper cut options, character set encoding, and live preview rendering.

### 3.2 Headless WhatsApp Automation (`whatsappHelper.cjs`)
- Runs `whatsapp-web.js` / Puppeteer inside the main Electron process.
- Persists session data safely inside `whatsapp_session/` within `app.getPath('userData')`.
- Handles QR code generation, incoming message routing, automated appointment scheduling, and customer notification dispatch.

### 3.3 Anti-Tamper & Licensing Engine (`licenseHelper.cjs`)
- Hardware ID (HWID) generation combining system hardware GUIDs.
- System Clock Tamper Prevention: Persists `last_checked_time`. If local device clock is rolled back, flags `cheated_flag = true` and locks premium features.
- Offline activation tokens + remote validation via Appwrite Cloud (`appwriteHelper.cjs`).

---

## 4. `ELECTRON-BUILDER` & PERFECT NSIS INSTALLER ENGINE

### 4.1 Production Packaging Setup (`package.json`)

```json
"build": {
  "appId": "com.salondztech.app",
  "productName": "Salon DZ Tech",
  "copyright": "Copyright 2026 Salon DZ Tech",
  "directories": {
    "output": "release"
  },
  "files": [
    "dist/**/*",
    "*.cjs",
    "electron.cjs",
    "preload.cjs",
    "database.cjs",
    "whatsappHelper.cjs",
    "appwriteHelper.cjs",
    "backupEngine.cjs",
    "licenseHelper.cjs",
    "assets/**/*"
  ],
  "win": {
    "target": "nsis",
    "icon": "assets/icon.png",
    "artifactName": "salondztech-vip-setup.exe",
    "executableName": "Salon DZ Tech",
    "signAndEditExecutable": true,
    "signtoolOptions": {
      "sign": "./sign.cjs"
    }
  },
  "nsis": {
    "oneClick": false,
    "allowToChangeInstallationDirectory": true,
    "createDesktopShortcut": true,
    "createStartMenuShortcut": true,
    "shortcutName": "Salon DZ Tech",
    "uninstallDisplayName": "Salon DZ Tech",
    "runAfterFinish": true,
    "multiLanguageInstaller": true,
    "installerSidebar": "assets/installerSidebar.bmp",
    "uninstallerSidebar": "assets/installerSidebar.bmp",
    "artifactName": "salondztech-vip-setup.exe"
  },
  "asar": true,
  "compression": "normal",
  "removePackageScripts": true,
  "afterPack": "./afterPack.cjs"
}
```

### 4.2 Metadata & Icon Post-Pack Hook (`afterPack.cjs`)
In Windows build pipelines, `rcedit` can fail if Windows Defender holds a temporary handle on the freshly compiled executable. The agent **must** use a retry loop with exponential delay:

```javascript
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

module.exports = async function (context) {
  if (context.electronPlatformName !== 'win32') return;
  const exePath = path.join(context.appOutDir, 'Salon DZ Tech.exe');
  const rceditPath = findRcedit();
  const iconPath = path.join(context.outDir, '.icon-ico', 'icon.ico');

  const cmd = `"${rceditPath}" "${exePath}" --set-version-string FileDescription "Salon DZ Tech" --set-version-string ProductName "Salon DZ Tech" --set-version-string LegalCopyright "Copyright 2026 Salon DZ Tech" --set-file-version 1.0.0 --set-product-version 1.0.0.0 --set-icon "${iconPath}"`;

  const maxRetries = 5;
  for (let i = 1; i <= maxRetries; i++) {
    try {
      await new Promise((resolve, reject) => {
        exec(cmd, (err) => err ? reject(err) : resolve());
      });
      console.log('[afterPack Hook] Executable resources updated successfully.');
      return;
    } catch (err) {
      if (i === maxRetries) throw err;
      await new Promise(r => setTimeout(r, 3000));
    }
  }
};
```

### 4.3 Custom Code Signing Hook (`sign.cjs`)
Handles signing binaries using Windows SDK `signtool.exe` with DigiCert RFC 3161 timestamping:

```javascript
const { execSync } = require('child_process');

module.exports = async function (configuration) {
  const filePath = configuration.path;
  const certSubject = process.env.CSC_NAME || "salondztech";
  const cmd = `signtool.exe sign /a /n "${certSubject}" /fd sha256 /tr "http://timestamp.digicert.com" /td sha256 "${filePath}"`;

  try {
    execSync(cmd, { stdio: 'inherit' });
    console.log(`[Sign Hook] Signed: ${filePath}`);
  } catch (err) {
    console.warn(`[Sign Hook] Signing warning: File build proceeding unsigned for local/dev use.`);
  }
};
```

---

## 5. AGENT CHECKLIST & VERIFICATION WORKFLOW

Before declaring an Electron desktop app or installer build complete, the AI Agent must execute the following step-by-step verification process:

1. **Verify UI Bundle Compilation**:
   `npm run build`
2. **Verify Native Module ABI Compilation**:
   Ensure `better-sqlite3` matches the target Electron Node ABI (`electron-rebuild`).
3. **Execute Full Desktop Build & Installer Packaging**:
   `npm run electron:build`
4. **Inspect Build Outputs**:
   Verify that `release/salondztech-vip-setup.exe` and unpacked binaries in `release/win-unpacked` exist and execute without errors.
5. **Verify Single-Instance & System Tray**:
   Launch app twice to ensure secondary instance focuses the main app, close main window to verify background tray balloon message.

---
