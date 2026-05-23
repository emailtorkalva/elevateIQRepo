import { CompanyIntro } from "@/components/home/company-intro";
import { CTA } from "@/components/home/cta";
import { ClientsStrip, Partners } from "@/components/home/partners-clients";
import { Footer } from "@/components/home/footer";
import { Hero } from "@/components/home/hero";
import { Navbar } from "@/components/home/navbar";
import { Services } from "@/components/home/services";
import { Stats } from "@/components/home/stats";
import { Testimonials } from "@/components/home/testimonials";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import ContactForm from "@/components/contact/contact-form";
<ContactForm></>

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CompanyIntro />
        <WhyChooseUs />
        <Services />
        <Stats />
        <Partners />
        <Testimonials />
        <ClientsStrip />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
