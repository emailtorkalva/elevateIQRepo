import type { Metadata } from "next";

import { ContactSection } from "@/components/contact/contact-section";
import { Footer } from "@/components/home/footer";
import { Navbar } from "@/components/home/navbar";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Contact | ${BRAND_NAME}`,
  description: `Contact ${BRAND_NAME} for IAM, cloud, DevOps, data, managed services, and staffing programs.`,
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-8">
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
