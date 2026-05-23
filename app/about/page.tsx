import type { Metadata } from "next";

import { AboutHero } from "@/components/about/about-hero";
import { MissionVision } from "@/components/about/mission-vision";
import { Team } from "@/components/about/team";
import { Timeline } from "@/components/about/timeline";
import { CTA } from "@/components/home/cta";
import { Footer } from "@/components/home/footer";
import { Navbar } from "@/components/home/navbar";

import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `About | ${BRAND_NAME}`,
  description: `Learn about ${BRAND_NAME}—IT consulting for IAM, cybersecurity, application development, cloud, DevOps, and digital transformation.`,
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutHero />
        <MissionVision />
        <Timeline />
        <Team />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
