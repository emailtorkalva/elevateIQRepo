import type { Metadata } from "next";

import { Footer } from "@/components/home/footer";
import { Navbar } from "@/components/home/navbar";
import { ProsePage } from "@/components/legal/prose-page";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Terms of Use | ${BRAND_NAME}`,
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main>
        <ProsePage
          title="Terms of Use"
          description={`Terms governing use of the ${BRAND_NAME} website.`}
        >
          <h2>Use of this site</h2>
          <p>
            This website is provided for general information about {BRAND_NAME} services. Content is
            not a binding offer; statements about capabilities are subject to formal statements of
            work and master agreements.
          </p>

          <h2>Intellectual property</h2>
          <p>
            Text, graphics, and branding on this site are owned by {BRAND_NAME} or used with
            permission. You may not reproduce materials for commercial use without written consent.
          </p>

          <h2>Disclaimer</h2>
          <p>
            We strive for accuracy but do not warrant that site content is complete or current.
            Case studies and testimonials represent past programs; results vary by client context.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, {BRAND_NAME} is not liable for damages arising
            from use of this website or reliance on its content.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of the State of Georgia, USA, without regard to
            conflict-of-law principles.
          </p>
        </ProsePage>
      </main>
      <Footer />
    </>
  );
}
