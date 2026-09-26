import React, { createContext, useContext, useState, useEffect } from 'react';
import { dbStore } from '../db/dbStore';
import {
  SiteSettings,
  Banner,
  AboutSection,
  CoreValue,
  WhyChooseReason,
  CompanyDocument,
  ProductCategory,
  Product,
  EngineeringService,
  Industry,
  VendorDocument,
  RFQ,
  ContactMessage,
  SocialLink,
  AdminUser
} from '../types';

interface DataContextType {
  settings: SiteSettings;
  banners: Banner[];
  about: AboutSection;
  coreValues: CoreValue[];
  whyChooseReasons: WhyChooseReason[];
  companyDocuments: CompanyDocument[];
  categories: ProductCategory[];
  products: Product[];
  services: EngineeringService[];
  industries: Industry[];
  vendorDocuments: VendorDocument[];
  rfqs: RFQ[];
  contactMessages: ContactMessage[];
  socialLinks: SocialLink[];
  adminUsers: AdminUser[];
  currentAdmin: AdminUser | null;
  store: typeof dbStore;
  refresh: () => void;
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [, setTick] = useState(0);

  useEffect(() => {
    void dbStore.initialize();
    const unsubscribe = dbStore.subscribe(() => {
      setTick((t) => t + 1);
    });
    return unsubscribe;
  }, []);

  const value: DataContextType = {
    settings: dbStore.getSettings(),
    banners: dbStore.getBanners(false),
    about: dbStore.getAbout(),
    coreValues: dbStore.getCoreValues(),
    whyChooseReasons: dbStore.getWhyChooseReasons(false),
    companyDocuments: dbStore.getCompanyDocuments(false),
    categories: dbStore.getCategories(false),
    products: dbStore.getProducts(false),
    services: dbStore.getServices(false),
    industries: dbStore.getIndustries(false),
    vendorDocuments: dbStore.getVendorDocuments(false),
    rfqs: dbStore.getRFQs(),
    contactMessages: dbStore.getContactMessages(),
    socialLinks: dbStore.getSocialLinks(false),
    adminUsers: dbStore.getAdminUsers(),
    currentAdmin: dbStore.getCurrentAdmin(),
    store: dbStore,
    refresh: () => setTick((t) => t + 1),
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export function useData(): DataContextType {
  const ctx = useContext(DataContext);
  if (!ctx) {
    throw new Error('useData must be used within a DataProvider');
  }
  return ctx;
}
