export type BillingCycle = "monthly" | "yearly" | "lifetime";
export type Currency = "DZD" | "USD";

export interface CyclePrice {
  price: string;
  period: string;
  originalPrice?: string;
  savingsBadge?: string;
  subline: string;
}

export interface TierPricingByCurrency {
  DZD: Record<BillingCycle, CyclePrice>;
  USD: Record<BillingCycle, CyclePrice>;
}

export interface FeatureBullet {
  label: string;
  tooltip?: string;
}

export interface FeatureCategory {
  title: string;
  items: FeatureBullet[];
}

export interface StandardOrVipTier {
  id: "standard" | "vip";
  eyebrow: string;
  name: string;
  subtitle: string;
  recommendedBadge?: string;
  cta: string;
  pricing: TierPricingByCurrency;
  categories: FeatureCategory[];
}

export interface CustomTier {
  id: "custom";
  eyebrow: string;
  badge: string;
  name: string;
  scopeStrip: string;
  ownershipTag: string;
  deliveryTag: string;
  priceLabel: string;
  priceSubline: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  modalPlanLabel: string;
  whatsappMessage: string;
  categories: FeatureCategory[];
}

export type MatrixCellValue = boolean | string;

export interface MatrixRow {
  feature: string;
  subtitle: string;
  standard: MatrixCellValue;
  vip: MatrixCellValue;
  custom: MatrixCellValue;
}

export interface MatrixCategory {
  title: string;
  rows: MatrixRow[];
}

export interface TimelineStep {
  number: string;
  title: string;
  description: string;
}

export interface CustomProjectContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  scopes: {
    website: string;
    desktop: string;
    mobile: string;
  };
  steps: TimelineStep[];
  guarantees: string[];
  cta: string;
  modalPlanLabel: string;
  whatsappMessage: string;
}

export interface BillingCycleLabels {
  monthly: string;
  yearly: string;
  lifetime: string;
  yearlyShortBadge: string;
}
