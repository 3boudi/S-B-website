import { setRequestLocale } from "next-intl/server";

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div style={{ backgroundColor: "#ffffff", color: "#111111", minHeight: "100vh", padding: "60px 20px", fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        
        {/* Header with Logo */}
        <div style={{ textAlign: "center", marginBottom: "45px" }}>
          <img 
            src="/logo2.png" 
            alt="Company Logo" 
            style={{ maxWidth: "180px", height: "auto", display: "inline-block", marginBottom: "20px" }} 
          />
          <h1 style={{ fontSize: "2.4rem", fontWeight: "800", letterSpacing: "-0.5px", margin: "0 0 10px 0", color: "#000000" }}>
            Privacy Policy & Terms of Service
          </h1>
          <p style={{ fontSize: "1rem", color: "#444444", margin: 0 }}>
            Master License Agreement, Data Privacy & Liability Disclaimer
          </p>
        </div>

        {/* Mandatory Agreement Notice Box */}
        <div style={{ 
          backgroundColor: "#f9f9f9", 
          border: "2px solid #111111", 
          borderRadius: "8px", 
          padding: "24px", 
          marginBottom: "40px" 
        }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: "700", margin: "0 0 10px 0", color: "#000000", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            ⚠️ Mandatory User Agreement & Confirmation
          </h2>
          <p style={{ fontSize: "1rem", lineHeight: "1.7", margin: 0, color: "#222222" }}>
            By purchasing an activation code, downloading, installing, accessing, or using any of our applications, software, chatbot services, or websites, you explicitly, unconditionally, and irrevocably agree to comply with and be bound by all terms, conditions, and protective rules detailed in this policy. If you do not agree with any part of these terms, you must not purchase, activate, or use our software or services.
          </p>
        </div>

        {/* Legal Sections */}
        <div style={{ lineHeight: "1.8", fontSize: "1.05rem", color: "#222222" }}>

          {/* Section 1: Data Collection & Complete Privacy */}
          <section style={{ marginBottom: "35px", borderBottom: "1px solid #e5e5e5", paddingBottom: "30px" }}>
            <h2 style={{ fontSize: "1.45rem", fontWeight: "700", marginBottom: "14px", color: "#000000" }}>
              1. Zero Data Collection & Customer Privacy
            </h2>
            <p style={{ margin: "0 0 12px 0" }}>
              <strong>We do not collect, track, store, monitor, or sell any of your personal or business data.</strong>
            </p>
            <ul style={{ paddingLeft: "24px", margin: 0 }}>
              <li style={{ marginBottom: "8px" }}>
                <strong>Local Data Storage:</strong> All application data (such as client files, services, appointments, revenue, receipts, and records) is stored exclusively locally on your own machine/device. We maintain no external database or server tracking your business information.
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>User Responsibility for Backups:</strong> Because we have no access to your data, you are 100% responsible for backing up your files and databases. We are not liable for any data loss, hardware failure, corrupted files, accidental deletions, or operating system crashes.
              </li>
            </ul>
          </section>

          {/* Section 2: Activation Code & License Protection */}
          <section style={{ marginBottom: "35px", borderBottom: "1px solid #e5e5e5", paddingBottom: "30px" }}>
            <h2 style={{ fontSize: "1.45rem", fontWeight: "700", marginBottom: "14px", color: "#000000" }}>
              2. Software License, Activation Codes & Sales Terms
            </h2>
            <p style={{ margin: "0 0 12px 0" }}>
              Our business model operates strictly on granting software licenses via digital activation codes:
            </p>
            <ul style={{ paddingLeft: "24px", margin: 0 }}>
              <li style={{ marginBottom: "8px" }}>
                <strong>Strict No-Refund Policy:</strong> Once an activation license code is generated, delivered, or activated, the sale is final, non-refundable, non-exchangeable, and non-cancellable under any circumstances.
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Single-Device / Single-User License:</strong> Each activation code is issued for a single authorized device/installation as agreed during purchase. Codes cannot be transferred, shared, or cloned onto unauthorized systems.
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Prohibition of Resale & Redistribution:</strong> You are strictly forbidden from reselling, sublicensing, renting, leasing, distributing, publicizing, or sharing our activation codes or software files with third parties.
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Anti-Piracy & Anti-Tampering:</strong> Any attempt to decompile, reverse-engineer, crack, modify source code, bypass licensing checks, or exploit the software will result in the immediate and permanent revocation of your license without compensation, and may lead to legal action.
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Right to Invalidate Fraudulent Codes:</strong> We reserve the right to immediately deactivate any activation key associated with fraud, payment disputes, unauthorized sharing, or violation of these terms.
              </li>
            </ul>
          </section>

          {/* Section 3: App Security & Environment */}
          <section style={{ marginBottom: "35px", borderBottom: "1px solid #e5e5e5", paddingBottom: "30px" }}>
            <h2 style={{ fontSize: "1.45rem", fontWeight: "700", marginBottom: "14px", color: "#000000" }}>
              3. Application Security & Operating Environment
            </h2>
            <p style={{ margin: "0 0 12px 0" }}>
              We build our software with modern industry security practices to ensure safe operation:
            </p>
            <ul style={{ paddingLeft: "24px", margin: 0 }}>
              <li style={{ marginBottom: "8px" }}>
                The user is solely responsible for maintaining the physical and digital security of their own computer/device, including installing security updates, using antivirus protection, and guarding device access.
              </li>
              <li style={{ marginBottom: "8px" }}>
                We are not liable for security breaches, malware infections, or operational disruptions caused by third-party software, compromised local networks, or unauthorized local machine access.
              </li>
            </ul>
          </section>

          {/* Section 4: WhatsApp Chatbot Liability & Disclaimer */}
          <section style={{ marginBottom: "35px", borderBottom: "1px solid #e5e5e5", paddingBottom: "30px" }}>
            <h2 style={{ fontSize: "1.45rem", fontWeight: "700", marginBottom: "14px", color: "#000000" }}>
              4. WhatsApp Chatbot Integration & Liability Exclusions
            </h2>
            <p style={{ margin: "0 0 12px 0" }}>
              Regarding the optional WhatsApp automation and chatbot capabilities:
            </p>
            <ul style={{ paddingLeft: "24px", margin: 0 }}>
              <li style={{ marginBottom: "8px" }}>
                <strong>Independent Software (No Affiliation):</strong> We are an independent provider and are not affiliated, associated, authorized, endorsed by, or in any way officially connected with WhatsApp LLC or Meta Platforms, Inc.
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>No Responsibility for Misuse or Spam:</strong> You assume full legal responsibility for all messages, promotions, or interactions sent through your WhatsApp account. We have zero responsibility for spamming, improper usage, harassment, or violations of communication laws committed by the user.
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>No Liability for Account Restrictions or Bans:</strong> You acknowledge that Meta/WhatsApp enforces automated policies. We are not responsible or liable if your WhatsApp account or phone number is blocked, restricted, rate-limited, or banned by WhatsApp/Meta.
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>No Guarantee Against Breakage or Downtime:</strong> WhatsApp and its web APIs frequently change. We do not guarantee uninterrupted chatbot operation and are not liable if the chatbot breaks, stops responding, undergoes downtime, or malfunctions due to WhatsApp updates, browser changes, network instability, or server outages.
              </li>
            </ul>
          </section>

          {/* Section 5: As-Is Warranty & Limitation of Liability */}
          <section style={{ marginBottom: "35px", borderBottom: "1px solid #e5e5e5", paddingBottom: "30px" }}>
            <h2 style={{ fontSize: "1.45rem", fontWeight: "700", marginBottom: "14px", color: "#000000" }}>
              5. "As-Is" Warranty & Total Limitation of Liability
            </h2>
            <p style={{ margin: "0 0 12px 0" }}>
              All software, activation codes, websites, and integrations are provided strictly on an <strong>"AS IS"</strong> and <strong>"AS AVAILABLE"</strong> basis without warranties of any kind, whether express, implied, or statutory.
            </p>
            <p style={{ margin: 0 }}>
              To the maximum extent permitted by applicable law, the software creators, owners, and developers shall under no circumstances be held liable for any direct, indirect, incidental, punitive, special, or consequential damages (including, but not limited to, loss of business revenue, lost profits, lost appointments, business interruption, or data corruption) arising out of the use or inability to use our software, activation codes, or chatbot services.
            </p>
          </section>

          {/* Section 6: Policy Changes & Legal Binding */}
          <section style={{ marginBottom: "35px" }}>
            <h2 style={{ fontSize: "1.45rem", fontWeight: "700", marginBottom: "14px", color: "#000000" }}>
              6. Modifications & Governing Acceptance
            </h2>
            <p style={{ margin: 0 }}>
              We reserve the right to amend, update, or revise these policies and terms at any time without prior individual notice. Any updates will be published on this page. Your continued use of the software, apps, or website following any changes constitutes full acknowledgment and acceptance of the revised terms.
            </p>
          </section>

        </div>

        {/* Footer Confirmation Notice */}
        <div style={{ 
          marginTop: "50px", 
          paddingTop: "25px", 
          borderTop: "2px solid #111111", 
          textAlign: "center", 
          fontSize: "0.95rem", 
          color: "#444444" 
        }}>
          <p style={{ margin: "0 0 8px 0", fontWeight: "600", color: "#000000" }}>
            By continuing to use our products or purchasing an activation license code, you confirm that you have read, understood, and agreed to all the rules above.
          </p>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "#777777" }}>
            © {new Date().getFullYear()} All Rights Reserved.
          </p>
        </div>

      </div>
    </div>
  );
}
