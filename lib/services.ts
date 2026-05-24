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

/** Unsplash images — professional IT / consulting visuals */
export const serviceImages = {
  iam: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80",
  appDev: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
  digital: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
  devops: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=1200&q=80",
  dataWarehouse: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
  qa: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80",
  cloudData: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=80",
  dataCenter: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80",
  managed: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
  staffing: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
  cloud: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
} as const;

export type ServiceOffering = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  deliverables: string[];
  icon: LucideIcon;
  image: string;
  highlight?: boolean;
  featured?: boolean;
};

export const serviceOfferings: ServiceOffering[] = [
  {
    slug: "iam-services",
    title: "IAM Services",
    description:
      "Identity governance, SSO, and privileged access programs designed for enterprises with complex compliance needs.",
    longDescription:
      "We assess your identity landscape, design target-state architecture, and implement tooling such as Okta, Microsoft Entra ID, and SailPoint—with automated joiner-mover-leaver workflows and audit-ready access reviews.",
    features: [
      "Identity governance & administration",
      "SSO & multi-factor authentication",
      "Privileged access management",
    ],
    deliverables: [
      "Current-state assessment & roadmap",
      "SSO integration playbooks",
      "Access review automation",
    ],
    icon: KeyRound,
    image: serviceImages.iam,
    featured: true,
  },
  {
    slug: "application-development",
    title: "Application Development",
    description:
      "Custom applications and modernization programs using proven agile delivery and enterprise integration patterns.",
    longDescription:
      "From greenfield products to legacy modernization, we build secure, maintainable applications with clear API boundaries, automated testing, and documentation your teams can own.",
    features: [
      "Custom enterprise applications",
      "Modernization & API integration",
      "Agile delivery & maintenance",
    ],
    deliverables: [
      "Architecture & technical design",
      "Sprint demos and release notes",
      "Runbooks and handover sessions",
    ],
    icon: Code2,
    image: serviceImages.appDev,
    featured: true,
  },
  {
    slug: "digital-process-transformation",
    title: "Digital Process Transformation",
    description:
      "Process discovery, workflow automation, and operating-model change that reduce manual work and improve visibility.",
    longDescription:
      "We map critical workflows, identify automation candidates, and implement solutions on platforms like Power Platform and ServiceNow—paired with change management so adoption sticks.",
    features: [
      "Process discovery & optimization",
      "Workflow automation",
      "Digital operating models",
    ],
    deliverables: [
      "Process maps & ROI estimates",
      "Automation backlog prioritization",
      "Training and adoption metrics",
    ],
    icon: Workflow,
    image: serviceImages.digital,
    featured: true,
  },
  {
    slug: "devops-services",
    title: "DevOps Services",
    description:
      "CI/CD, infrastructure as code, and DevSecOps practices that embed security and reliability into delivery.",
    longDescription:
      "Our engineers implement Terraform modules, pipeline templates, and observability standards so your teams ship frequently with guardrails for security and compliance.",
    features: [
      "CI/CD pipeline engineering",
      "Infrastructure as code",
      "DevSecOps & compliance automation",
    ],
    deliverables: [
      "Pipeline reference implementations",
      "IaC module library",
      "SLO/SLI dashboards",
    ],
    icon: GitBranch,
    image: serviceImages.devops,
    featured: true,
  },
  {
    slug: "data-warehousing-analytics",
    title: "Data Warehousing & Analytics",
    description:
      "Modern warehouse design, ELT pipelines, and BI layers that turn fragmented data into trusted metrics.",
    longDescription:
      "We implement Snowflake, BigQuery, or Redshift solutions with medallion architecture, data quality checks, and self-service analytics governed for your organization.",
    features: [
      "Data warehouse design",
      "ETL/ELT pipelines",
      "BI & advanced analytics",
    ],
    deliverables: [
      "Target data model",
      "Pipeline documentation",
      "Executive KPI dashboards",
    ],
    icon: Database,
    image: serviceImages.dataWarehouse,
  },
  {
    slug: "quality-assurance",
    title: "Quality Assurance",
    description:
      "Test strategy, automation, and performance engineering so releases meet security and usability bars.",
    longDescription:
      "We establish test pyramids, automate regression suites, and run load tests aligned to peak business events—integrating with your CI/CD for fast feedback.",
    features: [
      "Test automation frameworks",
      "Performance & load testing",
      "Security & regression testing",
    ],
    deliverables: [
      "Test strategy document",
      "Automated regression suite",
      "Performance baseline report",
    ],
    icon: CheckCircle2,
    image: serviceImages.qa,
  },
  {
    slug: "cloud-data-services",
    title: "Cloud Data Services",
    description:
      "Data lakes, streaming analytics, and governance on AWS, Azure, and GCP.",
    longDescription:
      "We design scalable ingestion, cataloging, and access controls so analytics teams move quickly without compromising privacy requirements.",
    features: [
      "Cloud data lakes & warehouses",
      "Real-time analytics pipelines",
      "Data governance & compliance",
    ],
    deliverables: [
      "Lakehouse architecture",
      "Data catalog & lineage",
      "Role-based access model",
    ],
    icon: CloudCog,
    image: serviceImages.cloudData,
  },
  {
    slug: "data-center-services",
    title: "Data Center Services",
    description:
      "Hybrid infrastructure, DR planning, and capacity management for business-critical workloads.",
    longDescription:
      "We help you right-size on-prem and colocation footprints, document recovery procedures, and plan migrations to cloud where it makes financial sense.",
    features: [
      "Colocation & hybrid infrastructure",
      "Disaster recovery planning",
      "Capacity & performance management",
    ],
    deliverables: [
      "DR runbooks & test results",
      "Capacity forecast model",
      "Migration wave plan",
    ],
    icon: Server,
    image: serviceImages.dataCenter,
  },
  {
    slug: "managed-services",
    title: "Managed Services",
    description:
      "24/7 monitoring, incident response, and patch management with SLA-backed operations.",
    longDescription:
      "Our NOC and engineering teams operate your platforms with defined SLAs, monthly service reviews, and continuous improvement backlogs.",
    features: [
      "24/7 monitoring & incident response",
      "Patch & vulnerability management",
      "SLA-backed operations",
    ],
    deliverables: [
      "Service catalog & SLAs",
      "Monthly operational reports",
      "Problem management trends",
    ],
    icon: Settings,
    image: serviceImages.managed,
    featured: true,
  },
  {
    slug: "staffing-solutions",
    title: "Staffing Solutions",
    description:
      "Contract and permanent placement for cloud, security, data, and engineering roles.",
    longDescription:
      "We screen for technical depth and communication skills, then onboard consultants with playbooks so they contribute in the first sprint—not the third month.",
    features: [
      "Contract & permanent placement",
      "Cloud, security & dev talent",
      "Rapid team augmentation",
    ],
    deliverables: [
      "Role profiles & interview loops",
      "Onboarding checklists",
      "Quarterly talent reviews",
    ],
    icon: Users,
    image: serviceImages.staffing,
    featured: true,
  },
  {
    slug: "cloud-services",
    title: "Cloud Services",
    description:
      "Cloud strategy, migration, and FinOps across AWS, Azure, and Google Cloud.",
    longDescription:
      "From landing zones to workload migrations, we deliver cloud programs with security baselines, cost guardrails, and operational models your teams can run.",
    features: [
      "Cloud strategy & architecture",
      "Migration & modernization",
      "Cloud ops & FinOps",
    ],
    deliverables: [
      "Landing zone blueprint",
      "Migration factory playbook",
      "Cost optimization report",
    ],
    icon: Cloud,
    image: serviceImages.cloud,
    highlight: true,
    featured: true,
  },
];

export const featuredServiceOfferings = serviceOfferings.filter((s) => s.featured);

export function getService(slug: string) {
  return serviceOfferings.find((s) => s.slug === slug);
}
