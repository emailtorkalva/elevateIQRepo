import type { Metadata } from "next";

import { Footer } from "@/components/home/footer";
import { Navbar } from "@/components/home/navbar";
import { ProsePage } from "@/components/legal/prose-page";
import { BRAND_NAME, CONTACT_EMAIL } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Security | ${BRAND_NAME}`,
};

export default function SecurityPage() {
  return (
    <>
      <Navbar />
      <main>
        <ProsePage
          title="Security & data protection"
          description={`How ${BRAND_NAME} approaches security for client programs and this website.`}
        >
          <h2>Client program security</h2>
          <p>
            For client engagements, we follow agreed security standards including least-privilege
            access, encrypted transport, documented change control, and background checks for
            personnel on regulated accounts. Specific controls are defined in statements of work and
            security addenda.
          </p>

          <h2>Compliance support</h2>
          <p>
            Our teams support clients operating under HIPAA, SOC 2, PCI DSS, and other frameworks.
            We do not claim certification on behalf of {BRAND_NAME} unless explicitly stated in a
            signed attestation; we help clients meet their control objectives.
          </p>

          <h2>Website & form data</h2>
          <p>
            This site is served over HTTPS. Contact form data is transmitted to our API and stored
            in a managed database with role-based access. Service credentials are kept server-side
            only.
          </p>

          <h2>Report a concern</h2>
          <p>
            To report a security issue related to our website or services, email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with subject &ldquo;Security
            report.&rdquo; We aim to acknowledge within two business days.
          </p>
        </ProsePage>
      </main>
      <Footer />
    </>
  );
}
