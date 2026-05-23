export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  services: string[];
  challenge: string;
  approach: string;
  outcomes: string[];
  duration: string;
  quote?: {
    text: string;
    author: string;
    role: string;
  };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "regional-health-iam",
    title: "Enterprise IAM modernization for a regional health system",
    client: "Regional health system (12 hospitals)",
    industry: "Healthcare",
    services: ["IAM Services", "Managed Services"],
    challenge:
      "Fragmented identity tools, manual access reviews, and audit findings ahead of a major EHR upgrade.",
    approach:
      "Assessed identity landscape, designed target architecture on Okta and SailPoint, migrated 48 applications to SSO, and automated joiner-mover-leaver workflows.",
    outcomes: [
      "Reduced access review cycle time from 6 weeks to 9 days",
      "SSO coverage increased from 62% to 94% of workforce applications",
      "Passed SOC 2 Type II audit with zero high-severity identity findings",
    ],
    duration: "14 months",
    quote: {
      text: "elevateIQ became an extension of our security team—they delivered governance we could show auditors with confidence.",
      author: "Rachel Mendenhall",
      role: "CISO, Regional Health System",
    },
  },
  {
    slug: "fintech-cloud-migration",
    title: "AWS landing zone and DevSecOps for a payments platform",
    client: "Mid-market payments processor",
    industry: "Financial services",
    services: ["Cloud Services", "DevOps Services"],
    challenge:
      "On-prem workloads blocking product releases; no standardized CI/CD or environment parity across teams.",
    approach:
      "Built a multi-account AWS landing zone, implemented Terraform modules, GitHub Actions pipelines with SAST/DAST gates, and observability with Datadog.",
    outcomes: [
      "Deployment frequency improved from monthly to multiple releases per week",
      "Mean time to restore production incidents dropped by 41%",
      "Annual infrastructure spend reduced by ~18% after rightsizing and reservations",
    ],
    duration: "9 months",
    quote: {
      text: "They brought discipline to our cloud migration without slowing delivery—the runbooks and pipelines still run our teams today.",
      author: "Daniel Okoro",
      role: "VP Engineering, Payments Platform",
    },
  },
  {
    slug: "retail-staff-augmentation",
    title: "Cloud and security staffing for omnichannel retail program",
    client: "National specialty retailer",
    industry: "Retail",
    services: ["Staffing Solutions", "Cloud Services"],
    challenge:
      "Peak-season digital initiatives required 25+ specialized roles that could not be filled through traditional hiring in time.",
    approach:
      "Deployed a blended team of cloud architects, security engineers, and QA leads with weekly delivery governance and knowledge transfer plans.",
    outcomes: [
      "Filled 27 roles in 21 business days across three time zones",
      "Holiday peak supported with 99.95% storefront availability",
      "42% of contractors converted to full-time internal hires post-program",
    ],
    duration: "6 months",
    quote: {
      text: "We met our launch date because elevateIQ understood retail timelines—not just résumés.",
      author: "Priya Natarajan",
      role: "Head of IT Operations, Specialty Retail",
    },
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
