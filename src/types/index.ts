export interface SiteSettings {
  id: number;
  company_name: string;
  tagline: string;
  domain: string;
  logo_url: string;
  favicon_url: string;
  phone: string;
  secondary_phone: string;
  email: string;
  sales_email: string;
  whatsapp: string;
  whatsapp_message: string;
  address: string;
  office_hours: string;
  google_map_embed: string;
  website_title: string;
  meta_description: string;
  footer_text: string;
  copyright_text: string;
}

export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
  button_text: string;
  button_url: string;
  is_button_visible: boolean;
  order: number;
  is_active: boolean;
}

export interface AboutSection {
  history_heading: string;
  history_text: string;
  history_image: string;
  mission_heading: string;
  mission_text: string;
  vision_heading: string;
  vision_text: string;
  proprietor_name: string;
  proprietor_designation: string;
  proprietor_photo: string;
  proprietor_message: string;
  proprietor_signature: string;
}

export interface CoreValue {
  id: number;
  title: string;
  description: string;
  icon_name: string;
  order: number;
}

export interface WhyChooseReason {
  id: number;
  title: string;
  description: string;
  icon_name: string;
  order: number;
  is_active: boolean;
}

export interface CompanyDocument {
  id: number;
  title: string;
  category: 'Legal' | 'Tax' | 'Membership' | 'Financial' | 'Compliance';
  document_number: string;
  issuing_authority: string;
  description: string;
  file_url: string;
  order: number;
  is_active: boolean;
  updated_at: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  order: number;
  is_active: boolean;
  item_count?: number;
}

export interface Product {
  id: number;
  category_id: number;
  category_name?: string;
  name: string;
  slug: string;
  sku: string;
  brand: string;
  model: string;
  short_description: string;
  full_description: string;
  specifications: Record<string, string>;
  main_image: string;
  additional_images: string[];
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
}

export interface EngineeringService {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  image_url: string;
  icon_name: string;
  deliverables: string[];
  order: number;
  is_active: boolean;
  is_featured: boolean;
}

export interface Industry {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  supplied_equipment: string[];
  order: number;
  is_active: boolean;
}

export interface VendorDocument {
  id: number;
  title: string;
  document_code: string;
  description: string;
  file_format: string;
  file_size: string;
  file_url: string;
  order: number;
  is_active: boolean;
  updated_at: string;
}

export type RFQStatus = 'New' | 'Contacted' | 'Quotation Sent' | 'Completed' | 'Cancelled';

export interface RFQ {
  id: number;
  reference_no: string;
  customer_name: string;
  company_name: string;
  email: string;
  phone: string;
  product_id?: number | null;
  product_name: string;
  quantity: string;
  requirement: string;
  message: string;
  attachment_url?: string;
  attachment_name?: string;
  status: RFQStatus;
  admin_notes?: string;
  created_at: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  is_read: boolean;
  admin_notes?: string;
  created_at: string;
}

export interface SocialLink {
  id: number;
  platform: 'facebook' | 'linkedin' | 'instagram' | 'youtube' | 'twitter' | 'whatsapp' | 'telegram' | 'tiktok' | 'other' | string;
  label: string;
  url: string;
  order: number;
  is_active: boolean;
}

export type AdminRole = 'Super Admin' | 'Content Manager' | 'Inquiry Manager' | 'Custom Admin';

export type AdminModule = 
  | 'settings'
  | 'banners'
  | 'about'
  | 'categories'
  | 'products'
  | 'services'
  | 'industries'
  | 'company-docs'
  | 'vendor-docs'
  | 'rfqs'
  | 'messages'
  | 'users'
  | 'backup';

export interface AdminUser {
  id: number;
  username: string;
  name: string;
  email: string;
  role: AdminRole;
  avatar?: string;
  last_login?: string;
  password?: string;
  permissions?: AdminModule[];
}
