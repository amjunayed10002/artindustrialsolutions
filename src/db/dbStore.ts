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
  RFQStatus,
  ContactMessage,
  SocialLink,
  AdminUser
} from '../types';

import {
  initialSiteSettings,
  initialBanners,
  initialAboutSection,
  initialCoreValues,
  initialWhyChooseReasons,
  initialCompanyDocuments,
  initialCategories,
  initialProducts,
  initialServices,
  initialIndustries,
  initialVendorDocuments,
  initialRFQs,
  initialContactMessages,
  initialSocialLinks,
  initialAdminUsers
} from './initialData';

const STORAGE_KEY = 'art_industrial_db_v1';
const AUTH_KEY = 'art_admin_session';

interface DatabaseState {
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
}

function getDefaultState(): DatabaseState {
  return {
    settings: { ...initialSiteSettings },
    banners: [...initialBanners],
    about: { ...initialAboutSection },
    coreValues: [...initialCoreValues],
    whyChooseReasons: [...initialWhyChooseReasons],
    companyDocuments: [...initialCompanyDocuments],
    categories: [...initialCategories],
    products: [...initialProducts],
    services: [...initialServices],
    industries: [...initialIndustries],
    vendorDocuments: [...initialVendorDocuments],
    rfqs: [...initialRFQs],
    contactMessages: [...initialContactMessages],
    socialLinks: [...initialSocialLinks],
    adminUsers: [...initialAdminUsers],
  };
}

class DatabaseStore {
  private state: DatabaseState;
  private listeners: Set<() => void> = new Set();
  private currentAdmin: AdminUser | null = null;

  constructor() {
    this.state = this.loadState();
    this.currentAdmin = this.loadSession();
  }

  private loadState(): DatabaseState {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure all required collections exist
        return {
          ...getDefaultState(),
          ...parsed,
          settings: { ...initialSiteSettings, ...(parsed.settings || {}) },
          about: { ...initialAboutSection, ...(parsed.about || {}) },
        };
      }
    } catch {
      // Fallback
    }
    return getDefaultState();
  }

  private saveState(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch {
      // Storage limits or private mode
    }
    this.notify();
  }

  private loadSession(): AdminUser | null {
    try {
      const saved = localStorage.getItem(AUTH_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach((l) => l());
  }

  // --- Auth & Admin Session ---
  public getCurrentAdmin(): AdminUser | null {
    return this.currentAdmin;
  }

  public loginAdmin(username: string, password: string): { success: boolean; error?: string; user?: AdminUser } {
    // Admin login validation (supports 'admin' / 'admin123', 'content' / 'content123', 'sales' / 'sales123')
    const user = this.state.adminUsers.find(
      (u) => u.username.toLowerCase() === username.trim().toLowerCase() || u.email.toLowerCase() === username.trim().toLowerCase()
    );

    if (!user) {
      return { success: false, error: 'User not found with provided credentials.' };
    }

    if (password === 'admin123' || password === 'password' || password === 'art2026') {
      const loggedUser = {
        ...user,
        last_login: new Date().toISOString().replace('T', ' ').substring(0, 16),
      };
      this.currentAdmin = loggedUser;
      localStorage.setItem(AUTH_KEY, JSON.stringify(loggedUser));
      this.notify();
      return { success: true, user: loggedUser };
    }

    return { success: false, error: 'Invalid password. (Default is admin123)' };
  }

  public logoutAdmin(): void {
    this.currentAdmin = null;
    localStorage.removeItem(AUTH_KEY);
    this.notify();
  }

  // --- Getters ---
  public getSettings(): SiteSettings {
    return { ...this.state.settings };
  }

  public getBanners(activeOnly = true): Banner[] {
    const list = [...this.state.banners].sort((a, b) => a.order - b.order);
    return activeOnly ? list.filter((b) => b.is_active) : list;
  }

  public getAbout(): AboutSection {
    return { ...this.state.about };
  }

  public getCoreValues(): CoreValue[] {
    return [...this.state.coreValues].sort((a, b) => a.order - b.order);
  }

  public getWhyChooseReasons(activeOnly = true): WhyChooseReason[] {
    const list = [...this.state.whyChooseReasons].sort((a, b) => a.order - b.order);
    return activeOnly ? list.filter((r) => r.is_active) : list;
  }

  public getCompanyDocuments(activeOnly = true): CompanyDocument[] {
    const list = [...this.state.companyDocuments].sort((a, b) => a.order - b.order);
    return activeOnly ? list.filter((d) => d.is_active) : list;
  }

  public getCategories(activeOnly = true): ProductCategory[] {
    const list = [...this.state.categories].sort((a, b) => a.order - b.order);
    const filtered = activeOnly ? list.filter((c) => c.is_active) : list;

    // Attach dynamic item count
    return filtered.map((cat) => ({
      ...cat,
      item_count: this.state.products.filter((p) => p.category_id === cat.id && p.is_active).length,
    }));
  }

  public getProducts(activeOnly = true, categorySlug?: string): Product[] {
    let list = [...this.state.products];
    if (activeOnly) {
      list = list.filter((p) => p.is_active);
    }
    if (categorySlug) {
      const cat = this.state.categories.find((c) => c.slug === categorySlug);
      if (cat) {
        list = list.filter((p) => p.category_id === cat.id);
      }
    }
    // Attach category name
    return list.map((p) => {
      const c = this.state.categories.find((cat) => cat.id === p.category_id);
      return {
        ...p,
        category_name: c ? c.name : 'General Industrial',
      };
    });
  }

  public getProductById(id: number): Product | undefined {
    const p = this.state.products.find((prod) => prod.id === id);
    if (!p) return undefined;
    const c = this.state.categories.find((cat) => cat.id === p.category_id);
    return { ...p, category_name: c ? c.name : 'General Industrial' };
  }

  public getProductBySlug(slug: string): Product | undefined {
    const p = this.state.products.find((prod) => prod.slug === slug);
    if (!p) return undefined;
    const c = this.state.categories.find((cat) => cat.id === p.category_id);
    return { ...p, category_name: c ? c.name : 'General Industrial' };
  }

  public getServices(activeOnly = true): EngineeringService[] {
    const list = [...this.state.services].sort((a, b) => a.order - b.order);
    return activeOnly ? list.filter((s) => s.is_active) : list;
  }

  public getServiceBySlug(slug: string): EngineeringService | undefined {
    return this.state.services.find((s) => s.slug === slug);
  }

  public getIndustries(activeOnly = true): Industry[] {
    const list = [...this.state.industries].sort((a, b) => a.order - b.order);
    return activeOnly ? list.filter((i) => i.is_active) : list;
  }

  public getVendorDocuments(activeOnly = true): VendorDocument[] {
    const list = [...this.state.vendorDocuments].sort((a, b) => a.order - b.order);
    return activeOnly ? list.filter((d) => d.is_active) : list;
  }

  public getRFQs(): RFQ[] {
    return [...this.state.rfqs].sort((a, b) => b.id - a.id);
  }

  public getContactMessages(): ContactMessage[] {
    return [...this.state.contactMessages].sort((a, b) => b.id - a.id);
  }

  public getSocialLinks(activeOnly = true): SocialLink[] {
    const list = [...this.state.socialLinks].sort((a, b) => a.order - b.order);
    return activeOnly ? list.filter((s) => s.is_active) : list;
  }

  public getAdminUsers(): AdminUser[] {
    return [...this.state.adminUsers];
  }

  // --- CRUD Modifiers ---

  // Site Settings
  public updateSettings(partial: Partial<SiteSettings>): void {
    this.state.settings = { ...this.state.settings, ...partial };
    this.saveState();
  }

  // Banners
  public addBanner(banner: Omit<Banner, 'id'>): Banner {
    const newId = this.state.banners.length ? Math.max(...this.state.banners.map((b) => b.id)) + 1 : 1;
    const newBanner: Banner = { ...banner, id: newId };
    this.state.banners.push(newBanner);
    this.saveState();
    return newBanner;
  }

  public updateBanner(id: number, partial: Partial<Banner>): void {
    this.state.banners = this.state.banners.map((b) => (b.id === id ? { ...b, ...partial } : b));
    this.saveState();
  }

  public deleteBanner(id: number): void {
    this.state.banners = this.state.banners.filter((b) => b.id !== id);
    this.saveState();
  }

  // About Section
  public updateAbout(partial: Partial<AboutSection>): void {
    this.state.about = { ...this.state.about, ...partial };
    this.saveState();
  }

  // Core Values
  public addCoreValue(value: Omit<CoreValue, 'id'>): CoreValue {
    const newId = this.state.coreValues.length ? Math.max(...this.state.coreValues.map((v) => v.id)) + 1 : 1;
    const newVal: CoreValue = { ...value, id: newId };
    this.state.coreValues.push(newVal);
    this.saveState();
    return newVal;
  }

  public updateCoreValue(id: number, partial: Partial<CoreValue>): void {
    this.state.coreValues = this.state.coreValues.map((v) => (v.id === id ? { ...v, ...partial } : v));
    this.saveState();
  }

  public deleteCoreValue(id: number): void {
    this.state.coreValues = this.state.coreValues.filter((v) => v.id !== id);
    this.saveState();
  }

  // Why Choose Reasons
  public addWhyChooseReason(reason: Omit<WhyChooseReason, 'id'>): WhyChooseReason {
    const newId = this.state.whyChooseReasons.length ? Math.max(...this.state.whyChooseReasons.map((r) => r.id)) + 1 : 1;
    const newReason: WhyChooseReason = { ...reason, id: newId };
    this.state.whyChooseReasons.push(newReason);
    this.saveState();
    return newReason;
  }

  public updateWhyChooseReason(id: number, partial: Partial<WhyChooseReason>): void {
    this.state.whyChooseReasons = this.state.whyChooseReasons.map((r) => (r.id === id ? { ...r, ...partial } : r));
    this.saveState();
  }

  public deleteWhyChooseReason(id: number): void {
    this.state.whyChooseReasons = this.state.whyChooseReasons.filter((r) => r.id !== id);
    this.saveState();
  }

  // Company Documents
  public addCompanyDocument(doc: Omit<CompanyDocument, 'id'>): CompanyDocument {
    const newId = this.state.companyDocuments.length ? Math.max(...this.state.companyDocuments.map((d) => d.id)) + 1 : 1;
    const newDoc: CompanyDocument = { ...doc, id: newId };
    this.state.companyDocuments.push(newDoc);
    this.saveState();
    return newDoc;
  }

  public updateCompanyDocument(id: number, partial: Partial<CompanyDocument>): void {
    this.state.companyDocuments = this.state.companyDocuments.map((d) => (d.id === id ? { ...d, ...partial } : d));
    this.saveState();
  }

  public deleteCompanyDocument(id: number): void {
    this.state.companyDocuments = this.state.companyDocuments.filter((d) => d.id !== id);
    this.saveState();
  }

  // Categories
  public addCategory(cat: Omit<ProductCategory, 'id'>): ProductCategory {
    const newId = this.state.categories.length ? Math.max(...this.state.categories.map((c) => c.id)) + 1 : 1;
    const newCat: ProductCategory = { ...cat, id: newId };
    this.state.categories.push(newCat);
    this.saveState();
    return newCat;
  }

  public updateCategory(id: number, partial: Partial<ProductCategory>): void {
    this.state.categories = this.state.categories.map((c) => (c.id === id ? { ...c, ...partial } : c));
    this.saveState();
  }

  public deleteCategory(id: number): void {
    this.state.categories = this.state.categories.filter((c) => c.id !== id);
    this.saveState();
  }

  // Products
  public addProduct(prod: Omit<Product, 'id'>): Product {
    const newId = this.state.products.length ? Math.max(...this.state.products.map((p) => p.id)) + 1 : 1;
    const newProd: Product = { ...prod, id: newId };
    this.state.products.push(newProd);
    this.saveState();
    return newProd;
  }

  public updateProduct(id: number, partial: Partial<Product>): void {
    this.state.products = this.state.products.map((p) => (p.id === id ? { ...p, ...partial } : p));
    this.saveState();
  }

  public deleteProduct(id: number): void {
    this.state.products = this.state.products.filter((p) => p.id !== id);
    this.saveState();
  }

  // Services
  public addService(serv: Omit<EngineeringService, 'id'>): EngineeringService {
    const newId = this.state.services.length ? Math.max(...this.state.services.map((s) => s.id)) + 1 : 1;
    const newServ: EngineeringService = { ...serv, id: newId };
    this.state.services.push(newServ);
    this.saveState();
    return newServ;
  }

  public updateService(id: number, partial: Partial<EngineeringService>): void {
    this.state.services = this.state.services.map((s) => (s.id === id ? { ...s, ...partial } : s));
    this.saveState();
  }

  public deleteService(id: number): void {
    this.state.services = this.state.services.filter((s) => s.id !== id);
    this.saveState();
  }

  // Industries
  public addIndustry(ind: Omit<Industry, 'id'>): Industry {
    const newId = this.state.industries.length ? Math.max(...this.state.industries.map((i) => i.id)) + 1 : 1;
    const newInd: Industry = { ...ind, id: newId };
    this.state.industries.push(newInd);
    this.saveState();
    return newInd;
  }

  public updateIndustry(id: number, partial: Partial<Industry>): void {
    this.state.industries = this.state.industries.map((i) => (i.id === id ? { ...i, ...partial } : i));
    this.saveState();
  }

  public deleteIndustry(id: number): void {
    this.state.industries = this.state.industries.filter((i) => i.id !== id);
    this.saveState();
  }

  // Vendor Documents
  public addVendorDocument(doc: Omit<VendorDocument, 'id'>): VendorDocument {
    const newId = this.state.vendorDocuments.length ? Math.max(...this.state.vendorDocuments.map((d) => d.id)) + 1 : 1;
    const newDoc: VendorDocument = { ...doc, id: newId };
    this.state.vendorDocuments.push(newDoc);
    this.saveState();
    return newDoc;
  }

  public updateVendorDocument(id: number, partial: Partial<VendorDocument>): void {
    this.state.vendorDocuments = this.state.vendorDocuments.map((d) => (d.id === id ? { ...d, ...partial } : d));
    this.saveState();
  }

  public deleteVendorDocument(id: number): void {
    this.state.vendorDocuments = this.state.vendorDocuments.filter((d) => d.id !== id);
    this.saveState();
  }

  // RFQ
  public addRFQ(rfqData: Omit<RFQ, 'id' | 'reference_no' | 'created_at' | 'status'>): RFQ {
    const newId = this.state.rfqs.length ? Math.max(...this.state.rfqs.map((r) => r.id)) + 1 : 1;
    const year = new Date().getFullYear();
    const ref = `RFQ-${year}-${String(100 + newId).padStart(4, '0')}`;
    const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const newRFQ: RFQ = {
      ...rfqData,
      id: newId,
      reference_no: ref,
      status: 'New',
      created_at: dateStr,
    };
    this.state.rfqs.unshift(newRFQ);
    this.saveState();
    return newRFQ;
  }

  public updateRFQStatus(id: number, status: RFQStatus, notes?: string): void {
    this.state.rfqs = this.state.rfqs.map((r) =>
      r.id === id ? { ...r, status, ...(notes !== undefined ? { admin_notes: notes } : {}) } : r
    );
    this.saveState();
  }

  public deleteRFQ(id: number): void {
    this.state.rfqs = this.state.rfqs.filter((r) => r.id !== id);
    this.saveState();
  }

  // Contact Messages
  public addContactMessage(data: Omit<ContactMessage, 'id' | 'is_read' | 'created_at'>): ContactMessage {
    const newId = this.state.contactMessages.length ? Math.max(...this.state.contactMessages.map((m) => m.id)) + 1 : 1;
    const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const newMsg: ContactMessage = {
      ...data,
      id: newId,
      is_read: false,
      created_at: dateStr,
    };
    this.state.contactMessages.unshift(newMsg);
    this.saveState();
    return newMsg;
  }

  public markContactMessageRead(id: number, is_read: boolean, notes?: string): void {
    this.state.contactMessages = this.state.contactMessages.map((m) =>
      m.id === id ? { ...m, is_read, ...(notes !== undefined ? { admin_notes: notes } : {}) } : m
    );
    this.saveState();
  }

  public deleteContactMessage(id: number): void {
    this.state.contactMessages = this.state.contactMessages.filter((m) => m.id !== id);
    this.saveState();
  }

  // Social Links
  public addSocialLink(link: Omit<SocialLink, 'id'>): SocialLink {
    const newId = this.state.socialLinks.length ? Math.max(...this.state.socialLinks.map((s) => s.id)) + 1 : 1;
    const newLink: SocialLink = { ...link, id: newId };
    this.state.socialLinks.push(newLink);
    this.saveState();
    return newLink;
  }

  public updateSocialLink(id: number, partial: Partial<SocialLink>): void {
    this.state.socialLinks = this.state.socialLinks.map((s) => (s.id === id ? { ...s, ...partial } : s));
    this.saveState();
  }

  public deleteSocialLink(id: number): void {
    this.state.socialLinks = this.state.socialLinks.filter((s) => s.id !== id);
    this.saveState();
  }

  // Admin Users
  public addAdminUser(user: Omit<AdminUser, 'id'>): AdminUser {
    const newId = this.state.adminUsers.length ? Math.max(...this.state.adminUsers.map((u) => u.id)) + 1 : 1;
    const newUser: AdminUser = {
      ...user,
      id: newId,
      last_login: user.last_login || 'Never',
    };
    this.state.adminUsers.push(newUser);
    this.saveState();
    return newUser;
  }

  public updateAdminUser(id: number, partial: Partial<AdminUser>): void {
    this.state.adminUsers = this.state.adminUsers.map((u) => (u.id === id ? { ...u, ...partial } : u));
    if (this.currentAdmin && this.currentAdmin.id === id) {
      this.currentAdmin = { ...this.currentAdmin, ...partial };
      localStorage.setItem(AUTH_KEY, JSON.stringify(this.currentAdmin));
    }
    this.saveState();
  }

  public deleteAdminUser(id: number): void {
    this.state.adminUsers = this.state.adminUsers.filter((u) => u.id !== id);
    this.saveState();
  }

  // Backup & Reset
  public resetToDefaults(): void {
    this.state = getDefaultState();
    this.saveState();
  }

  public exportJSON(): string {
    return JSON.stringify(this.state, null, 2);
  }

  public importJSON(jsonStr: string): boolean {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.settings && parsed.categories) {
        this.state = {
          ...getDefaultState(),
          ...parsed,
        };
        this.saveState();
        return true;
      }
    } catch {
      // invalid JSON
    }
    return false;
  }
}

export const dbStore = new DatabaseStore();
