export type Industry = {
  slug: string;
  name: string;
  headline: string;
  description: string;
  focusAreas: string[];
  compliance?: string[];
};

export const industries: Industry[] = [
  {
    slug: "healthcare",
    name: "Healthcare & life sciences",
    headline: "Identity, interoperability, and compliant cloud for care delivery",
    description:
      "We help hospitals and payers modernize IAM, integrate clinical platforms, and operate cloud workloads aligned to HIPAA and HITRUST expectations.",
    focusAreas: ["IAM & privileged access", "EHR integration programs", "HIPAA-aligned cloud operations"],
    compliance: ["HIPAA", "HITRUST", "SOC 2"],
  },
  {
    slug: "financial-services",
    name: "Financial services",
    headline: "Secure platforms for payments, banking, and regulated data",
    description:
      "From landing zones to DevSecOps, we design environments that support auditability, segregation of duties, and rapid product delivery.",
    focusAreas: ["Cloud migration", "DevSecOps pipelines", "Data platform modernization"],
    compliance: ["SOC 2", "PCI DSS", "FFIEC guidance"],
  },
  {
    slug: "retail",
    name: "Retail & consumer",
    headline: "Peak-ready commerce, supply chain, and store technology",
    description:
      "Seasonal scale, omnichannel reliability, and workforce programs when you need specialists on short notice.",
    focusAreas: ["E-commerce reliability", "Staff augmentation", "Managed operations"],
    compliance: ["PCI DSS", "SOC 2"],
  },
  {
    slug: "technology",
    name: "Technology & SaaS",
    headline: "Platform engineering and product delivery at startup speed",
    description:
      "We embed with product teams to stand up CI/CD, observability, and identity patterns that scale with ARR growth.",
    focusAreas: ["Platform engineering", "IAM for B2B SaaS", "QA automation"],
  },
];

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}
