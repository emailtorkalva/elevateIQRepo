import type { Metadata } from "next";

import { Footer } from "@/components/home/footer";
import { Navbar } from "@/components/home/navbar";
import { ProsePage } from "@/components/legal/prose-page";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Privacy Policy | ${BRAND_NAME}`,
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main>
        <ProsePage
          title="Privacy Policy"
          description={`How ${BRAND_NAME} collects, uses, and protects information submitted through this website.`}
        >
          <h2>Information we collect</h2>
          <p>
            When you submit our contact form, we collect your name, work email, company, service
            interest, and message. We use this solely to respond to your inquiry and discuss
            potential engagements.
          </p>

          <h2>How we store data</h2>
          <p>
            Form submissions are stored in our secure database (Supabase) with access restricted to
            authorized elevateIQ staff. We do not sell personal information to third parties.
          </p>

          <h2>Retention</h2>
          <p>
            Inquiry records are retained for up to 24 months unless a longer period is required for
            business or legal purposes, or you request deletion sooner.
          </p>

          <h2>Your rights</h2>
          <p>
            You may request access, correction, or deletion of your data by emailing us at the
            address on our contact page. We will respond within a reasonable timeframe.
          </p>

          <h2>Cookies & analytics</h2>
          <p>
            This site may use essential cookies for theme preferences. If analytics are enabled in
            the future, this policy will be updated accordingly.
          </p>
        </ProsePage>
      </main>
      <Footer />
    </>
  );
}
