import type { Metadata } from "next";

import { CTA } from "@/components/home/cta";
import { Footer } from "@/components/home/footer";
import { Navbar } from "@/components/home/navbar";
import { ServiceCards } from "@/components/services/service-cards";
import { ServicesHero } from "@/components/services/services-hero";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Services | ${BRAND_NAME}`,
  description:
    "IAM, application development, DevOps, cloud, data, managed services, and staffing from elevateIQ.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <ServicesHero />
        <ServiceCards />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
