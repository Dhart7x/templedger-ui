import React, { useState } from "react";
import BookDemoModal from "@/components/BookDemoModal";
import { Nav, Footer } from "@/components/MarketingLayout";

const C = {
  indigo: "#14082E",
  beige: "#FAFAF8",
  purple: "#4C1D95",
};

const sans = "'IBM Plex Sans', system-ui, sans-serif";
const body = "'Inter', system-ui, sans-serif";

const Privacy = () => {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <div style={{ background: C.beige, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Nav onBookDemo={() => setDemoOpen(true)} />

      <main
        style={{
          flex: 1,
          padding: "128px 24px 96px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <article
          style={{
            width: "100%",
            maxWidth: 720,
            fontFamily: body,
            fontSize: 15,
            lineHeight: 1.7,
            color: "rgba(20,8,46,0.85)",
          }}
        >
          <h1
            style={{
              fontFamily: sans,
              fontWeight: 600,
              fontSize: "clamp(32px, 5vw, 44px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: C.indigo,
              margin: "0 0 24px",
            }}
          >
            Privacy Policy
          </h1>

          <p style={{ margin: "0 0 40px", color: "rgba(20,8,46,0.6)" }}>
            Last updated: August 12, 2026
          </p>

          <p style={{ margin: "0 0 28px" }}>
            TempLedger, Inc. ("TempLedger", "we", "us") is a Delaware corporation. This policy explains what information we collect through this website, how we use it, and the choices you have. It applies to visitors of this website and to the information you submit through our forms.
          </p>

          <h2
            style={{
              fontFamily: sans,
              fontWeight: 600,
              fontSize: "clamp(18px, 2.2vw, 22px)",
              lineHeight: 1.25,
              color: C.indigo,
              margin: "44px 0 16px",
            }}
          >
            Information we collect
          </h2>

          <p style={{ margin: "0 0 20px" }}>
            <strong style={{ color: C.indigo }}>Information you provide.</strong> When you book a demo or join our waitlist, we collect the information you enter: your name, company, job title, region, and, where you choose to provide it, your approximate annual agency spend and agency staff headcount.
          </p>

          <p style={{ margin: "0 0 28px" }}>
            <strong style={{ color: C.indigo }}>Information collected automatically.</strong> Like most websites, we and our service providers collect certain information automatically when you visit: IP address, browser type, device information, pages viewed, and how you arrived at our site. This is collected through cookies and similar technologies, including analytics and advertising tags such as the LinkedIn Insight Tag.
          </p>

          <h2
            style={{
              fontFamily: sans,
              fontWeight: 600,
              fontSize: "clamp(18px, 2.2vw, 22px)",
              lineHeight: 1.25,
              color: C.indigo,
              margin: "44px 0 16px",
            }}
          >
            How we use your information
          </h2>

          <p style={{ margin: "0 0 20px" }}>
            We use the information you provide to respond to your demo request, manage our early access waitlist, communicate with you about TempLedger, and improve our website and offering. We use automatically collected information to understand how our website is used, measure the effectiveness of our marketing, and reach relevant audiences with advertising on platforms such as LinkedIn.
          </p>

          <p style={{ margin: "0 0 28px" }}>
            Where UK or EU data protection law applies, our legal bases are: performance of steps you request prior to entering a contract (responding to your demo or waitlist request), our legitimate interests in operating and marketing our business, and your consent where required, for example for certain cookies.
          </p>

          <h2
            style={{
              fontFamily: sans,
              fontWeight: 600,
              fontSize: "clamp(18px, 2.2vw, 22px)",
              lineHeight: 1.25,
              color: C.indigo,
              margin: "44px 0 16px",
            }}
          >
            Sharing
          </h2>

          <p style={{ margin: "0 0 28px" }}>
            We do not sell your personal information. We share it only with service providers who help us operate, such as website hosting, scheduling, analytics, and advertising platforms, and only as needed to provide their services to us. These providers are bound by their own obligations to protect your information. We may also disclose information where required by law.
          </p>

          <h2
            style={{
              fontFamily: sans,
              fontWeight: 600,
              fontSize: "clamp(18px, 2.2vw, 22px)",
              lineHeight: 1.25,
              color: C.indigo,
              margin: "44px 0 16px",
            }}
          >
            International transfers
          </h2>

          <p style={{ margin: "0 0 28px" }}>
            We operate from the United States and serve visitors in the United States and the United Kingdom. If you are in the UK, your information may be transferred to and processed in the United States. Where required, we rely on appropriate safeguards for such transfers.
          </p>

          <h2
            style={{
              fontFamily: sans,
              fontWeight: 600,
              fontSize: "clamp(18px, 2.2vw, 22px)",
              lineHeight: 1.25,
              color: C.indigo,
              margin: "44px 0 16px",
            }}
          >
            Retention
          </h2>

          <p style={{ margin: "0 0 28px" }}>
            We keep the information you submit for as long as needed to respond to your request, maintain our waitlist, and meet legal obligations, after which it is deleted or anonymized.
          </p>

          <h2
            style={{
              fontFamily: sans,
              fontWeight: 600,
              fontSize: "clamp(18px, 2.2vw, 22px)",
              lineHeight: 1.25,
              color: C.indigo,
              margin: "44px 0 16px",
            }}
          >
            Your rights
          </h2>

          <p style={{ margin: "0 0 28px" }}>
            Depending on where you live, you may have rights to access, correct, delete, or receive a copy of your personal information, to object to or restrict certain processing, and to withdraw consent. UK residents have these rights under UK GDPR and may lodge a complaint with the Information Commissioner's Office. Residents of certain US states have similar rights under their state privacy laws. To exercise any of these rights, contact us at the address below.
          </p>

          <h2
            style={{
              fontFamily: sans,
              fontWeight: 600,
              fontSize: "clamp(18px, 2.2vw, 22px)",
              lineHeight: 1.25,
              color: C.indigo,
              margin: "44px 0 16px",
            }}
          >
            Cookies
          </h2>

          <p style={{ margin: "0 0 28px" }}>
            You can control cookies through your browser settings. Opting out of advertising cookies does not remove ads; it makes them less relevant.
          </p>

          <h2
            style={{
              fontFamily: sans,
              fontWeight: 600,
              fontSize: "clamp(18px, 2.2vw, 22px)",
              lineHeight: 1.25,
              color: C.indigo,
              margin: "44px 0 16px",
            }}
          >
            Children
          </h2>

          <p style={{ margin: "0 0 28px" }}>
            This website is intended for business audiences and not for children under 16. We do not knowingly collect information from children.
          </p>

          <h2
            style={{
              fontFamily: sans,
              fontWeight: 600,
              fontSize: "clamp(18px, 2.2vw, 22px)",
              lineHeight: 1.25,
              color: C.indigo,
              margin: "44px 0 16px",
            }}
          >
            Changes
          </h2>

          <p style={{ margin: "0 0 28px" }}>
            We may update this policy from time to time. The date at the top reflects the latest version.
          </p>

          <h2
            style={{
              fontFamily: sans,
              fontWeight: 600,
              fontSize: "clamp(18px, 2.2vw, 22px)",
              lineHeight: 1.25,
              color: C.indigo,
              margin: "44px 0 16px",
            }}
          >
            Contact
          </h2>

          <p style={{ margin: 0, color: C.purple }}>
            <a
              href="mailto:privacy@templedger.com"
              style={{
                color: C.purple,
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              privacy@templedger.com
            </a>
          </p>
        </article>
      </main>

      <Footer />
      <BookDemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  );
};

export default Privacy;
