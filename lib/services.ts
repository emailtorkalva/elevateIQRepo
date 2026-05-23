import {
  CheckCircle2,
  Cloud,
  CloudCog,
  Code2,
  Database,
  GitBranch,
  KeyRound,
  Server,
  Settings,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type ServiceOffering = {
  slug: string;
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  highlight?: boolean;
  featured?: boolean;
};

export const serviceOfferings: ServiceOffering[] = [
  {
    slug: "iam-services",
    title: "IAM Services",
    description:
      "Securing identities and managing access efficiently is crucial for organizations of every size. We deliver cutting-edge Identity and Access Management solutions.",
    features: [
      "Identity governance & administration",
      "SSO & multi-factor authentication",
      "Privileged access management",
    ],
    icon: KeyRound,
    featured: true,
  },
  {
    slug: "application-development",
    title: "Application Development",
    description:
      "We craft high-performance, future-ready applications that drive business growth—in a rapidly evolving digital world where agility and innovation matter.",
    features: [
      "Custom enterprise applications",
      "Modernization & API integration",
      "Agile delivery & maintenance",
    ],
    icon: Code2,
    featured: true,
  },
  {
    slug: "digital-process-transformation",
    title: "Digital Process Transformation",
    description:
      "We help organizations navigate the evolving digital landscape with process automation, workflow modernization, and change management.",
    features: [
      "Process discovery & optimization",
      "Workflow automation",
      "Digital operating models",
    ],
    icon: Workflow,
    featured: true,
  },
  {
    slug: "devops-services",
    title: "DevOps Services",
    description:
      "Security is fundamental to development—not an afterthought. Our DevSecOps services embed protection across the entire software lifecycle.",
    features: [
      "CI/CD pipeline engineering",
      "Infrastructure as code",
      "DevSecOps & compliance automation",
    ],
    icon: GitBranch,
    featured: true,
  },
  {
    slug: "data-warehousing-analytics",
    title: "Data Warehousing & Analytics",
    description:
      "Well-architected data warehouses consolidate, manage, and analyze structured and unstructured data—powering confident business decisions.",
    features: [
      "Data warehouse design",
      "ETL/ELT pipelines",
      "BI & advanced analytics",
    ],
    icon: Database,
  },
  {
    slug: "quality-assurance",
    title: "Quality Assurance",
    description:
      "Rigorous QA ensures your applications meet performance, security, and usability standards before they reach production.",
    features: [
      "Test automation frameworks",
      "Performance & load testing",
      "Security & regression testing",
    ],
    icon: CheckCircle2,
  },
  {
    slug: "cloud-data-services",
    title: "Cloud Data Services",
    description:
      "Secure, scalable cloud data management spanning storage, analytics, and governance across leading cloud platforms.",
    features: [
      "Cloud data lakes & warehouses",
      "Real-time analytics pipelines",
      "Data governance & compliance",
    ],
    icon: CloudCog,
  },
  {
    slug: "data-center-services",
    title: "Data Center Services",
    description:
      "Reliable data center solutions ensuring optimal performance, security, and scalability for business-critical applications.",
    features: [
      "Colocation & hybrid infrastructure",
      "Disaster recovery planning",
      "Capacity & performance management",
    ],
    icon: Server,
  },
  {
    slug: "managed-services",
    title: "Managed Services",
    description:
      "Streamline IT operations, enhance system reliability, and focus on core business objectives with comprehensive managed support.",
    features: [
      "24/7 monitoring & incident response",
      "Patch & vulnerability management",
      "SLA-backed operations",
    ],
    icon: Settings,
    featured: true,
  },
  {
    slug: "staffing-solutions",
    title: "Staffing Solutions",
    description:
      "Top-tier IT talent to drive business success—sourcing, screening, and deploying skilled professionals across technology disciplines.",
    features: [
      "Contract & permanent placement",
      "Cloud, security & dev talent",
      "Rapid team augmentation",
    ],
    icon: Users,
    featured: true,
  },
  {
    slug: "cloud-services",
    title: "Cloud Services",
    description:
      "Harness cloud computing to drive agility, scalability, and innovation—with engineering, operations, and migration expertise.",
    features: [
      "Cloud strategy & architecture",
      "Migration & modernization",
      "Cloud ops & FinOps",
    ],
    icon: Cloud,
    highlight: true,
    featured: true,
  },
];

export const featuredServiceOfferings = serviceOfferings.filter(
  (s) => s.featured
);
