export interface SystemLink {
  id: string;
  title: string;
  englishTitle?: string;
  description: string;
  category: 'qc' | 'docs' | 'training' | 'safety' | 'smart-hospital';
  url: string;
  altUrls?: { label: string; url: string; iconName?: string }[]; // For systems with multiple options like reports
  iconName: string; // To match lucide icons dynamically
  badge?: string;
  isPopular?: boolean;
}

export type CategoryType = 'all' | 'qc' | 'docs' | 'training' | 'safety' | 'smart-hospital';
