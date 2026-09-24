import React, { useState, useEffect } from 'react';
import { DataProvider, useData } from './context/DataContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Public Pages & Components
import { HeroSlider } from './components/home/HeroSlider';
import { 
  CompanyIntroSection, 
  WhyChooseSection, 
  FeaturedProductsSection, 
  ServicesOverviewSection, 
  IndustriesOverviewSection, 
  CTASection 
} from './components/home/HomeSections';

import { AboutPage } from './pages/AboutPage';
import { CompanyProfilePage } from './pages/CompanyProfilePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { VendorEnlistmentPage } from './pages/VendorEnlistmentPage';
import { ContactPage } from './pages/ContactPage';
import { RFQPage } from './pages/RFQPage';

// Admin Panel Components
import { AdminLayout, AdminTab } from './components/admin/AdminLayout';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminSettings } from './components/admin/AdminSettings';
import { AdminBanners } from './components/admin/AdminBanners';
import { AdminAbout } from './components/admin/AdminAbout';
import { AdminCategories } from './components/admin/AdminCategories';
import { AdminProducts } from './components/admin/AdminProducts';
import { AdminServices } from './components/admin/AdminServices';
import { AdminIndustries } from './components/admin/AdminIndustries';
import { AdminCompanyDocs } from './components/admin/AdminCompanyDocs';
import { AdminVendorDocs } from './components/admin/AdminVendorDocs';
import { AdminRFQs } from './components/admin/AdminRFQs';
import { AdminMessages } from './components/admin/AdminMessages';
import { AdminUsers } from './components/admin/AdminUsers';
import { AdminBackup } from './components/admin/AdminBackup';
import { AdminLoginModal } from './components/admin/AdminLoginModal';

function MainApplication() {
  const { currentAdmin, settings } = useData();

  // Navigation State
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [isAdminView, setIsAdminView] = useState<boolean>(false);
  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);

  // Parse path and params
  const navigate = (path: string) => {
    setCurrentPath(path);
    setIsAdminView(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAdmin = () => {
    if (currentAdmin) {
      setIsAdminView(true);
    } else {
      setLoginModalOpen(true);
    }
  };

  // Sync page title with settings
  useEffect(() => {
    if (settings.website_title) {
      document.title = settings.website_title;
    }
  }, [settings.website_title]);

  // Route Router Logic
  const renderPublicPage = () => {
    const url = new URL(currentPath, 'http://localhost');
    const pathname = url.pathname;
    const searchParams = url.searchParams;

    if (pathname === '/') {
      return (
        <div className="space-y-0">
          <HeroSlider navigate={navigate} />
          <CompanyIntroSection navigate={navigate} />
          <WhyChooseSection navigate={navigate} />
          <FeaturedProductsSection 
            navigate={navigate} 
            openRFQWithProduct={(id) => navigate(`/rfq?product=${id}`)}
          />
          <ServicesOverviewSection navigate={navigate} />
          <IndustriesOverviewSection navigate={navigate} />
          <CTASection navigate={navigate} />
        </div>
      );
    }

    if (pathname === '/about') {
      return <AboutPage navigate={navigate} />;
    }

    if (pathname === '/company-profile') {
      return <CompanyProfilePage navigate={navigate} />;
    }

    if (pathname === '/products') {
      const cat = searchParams.get('category') || undefined;
      return <ProductsPage navigate={navigate} selectedCategorySlug={cat} />;
    }

    if (pathname.startsWith('/products/')) {
      const slug = pathname.replace('/products/', '');
      return <ProductDetailPage slug={slug} navigate={navigate} />;
    }

    if (pathname === '/services') {
      return <ServicesPage navigate={navigate} />;
    }

    if (pathname === '/industries') {
      return <IndustriesPage navigate={navigate} />;
    }

    if (pathname === '/vendor-enlistment') {
      return <VendorEnlistmentPage navigate={navigate} />;
    }

    if (pathname === '/contact') {
      return <ContactPage navigate={navigate} />;
    }

    if (pathname === '/rfq') {
      const prodId = searchParams.get('product') ? Number(searchParams.get('product')) : null;
      const serviceName = searchParams.get('service') || undefined;
      const industryName = searchParams.get('industry') || undefined;
      return (
        <RFQPage
          navigate={navigate}
          preselectedProductId={prodId}
          preselectedServiceName={serviceName}
          preselectedIndustryName={industryName}
        />
      );
    }

    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-3xl font-display font-extrabold text-slate-900">
          404 - Page Not Found
        </h2>
        <p className="text-sm text-slate-600">
          The requested page could not be located in ART Industrial Solutions portal.
        </p>
        <button onClick={() => navigate('/')} className="btn-industrial-primary text-xs">
          Return to Homepage
        </button>
      </div>
    );
  };

  // Render Admin View
  const renderAdminContent = () => {
    switch (adminTab) {
      case 'dashboard':
        return <AdminDashboard setTab={setAdminTab} />;
      case 'settings':
      case 'social-links':
        return <AdminSettings />;
      case 'banners':
        return <AdminBanners />;
      case 'about':
        return <AdminAbout />;
      case 'company-docs':
        return <AdminCompanyDocs />;
      case 'vendor-docs':
        return <AdminVendorDocs />;
      case 'categories':
        return <AdminCategories />;
      case 'products':
        return <AdminProducts />;
      case 'services':
        return <AdminServices />;
      case 'industries':
        return <AdminIndustries />;
      case 'rfqs':
        return <AdminRFQs />;
      case 'messages':
        return <AdminMessages />;
      case 'users':
        return <AdminUsers />;
      case 'backup':
        return <AdminBackup />;
      default:
        return <AdminDashboard setTab={setAdminTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {isAdminView ? (
        <div className="flex-1 flex overflow-hidden min-h-screen">
          <AdminLayout
            currentTab={adminTab}
            setTab={setAdminTab}
            closeAdmin={() => setIsAdminView(false)}
          />
          <main className="flex-1 overflow-y-auto bg-slate-100/70 p-6 sm:p-10">
            <div className="max-w-7xl mx-auto">
              {renderAdminContent()}
            </div>
          </main>
        </div>
      ) : (
        <>
          <Navbar
            currentPath={currentPath}
            navigate={navigate}
            openAdmin={handleOpenAdmin}
          />
          <main className="flex-1">
            {renderPublicPage()}
          </main>
          <Footer
            navigate={navigate}
            openAdmin={handleOpenAdmin}
          />
        </>
      )}

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSuccess={() => {
          setLoginModalOpen(false);
          setIsAdminView(true);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <MainApplication />
    </DataProvider>
  );
}
