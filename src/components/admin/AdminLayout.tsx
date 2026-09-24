import React from 'react';
import { useData } from '../../context/DataContext';
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  FileText, 
  FolderTree, 
  Package, 
  Wrench, 
  Building2, 
  FileCheck, 
  Inbox, 
  MessageSquare, 
  Settings, 
  Users, 
  Database, 
  LogOut, 
  ExternalLink,
  ChevronRight,
  Shield,
  Briefcase
} from 'lucide-react';

export type AdminTab = 
  | 'dashboard'
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
  | 'social-links'
  | 'users'
  | 'backup';

interface NavItem {
  id: AdminTab;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  badgeColor?: string;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

interface AdminLayoutProps {
  currentTab: AdminTab;
  setTab: (tab: AdminTab) => void;
  closeAdmin: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ currentTab, setTab, closeAdmin }) => {
  const { currentAdmin, store, rfqs, contactMessages } = useData();

  const newRfqCount = rfqs.filter((r) => r.status === 'New').length;
  const unreadMsgCount = contactMessages.filter((m) => !m.is_read).length;

  const handleLogout = () => {
    store.logoutAdmin();
    closeAdmin();
  };

  const isPermitted = (tabId: AdminTab): boolean => {
    if (!currentAdmin) return false;
    if (currentAdmin.role === 'Super Admin') return true;
    if (tabId === 'dashboard') return true;

    // Check custom permissions list if present
    if (currentAdmin.permissions && Array.isArray(currentAdmin.permissions)) {
      return currentAdmin.permissions.includes(tabId as any);
    }

    // Role-based fallbacks
    if (currentAdmin.role === 'Content Manager') {
      return ['banners', 'about', 'company-docs', 'vendor-docs', 'categories', 'products', 'services', 'industries'].includes(tabId);
    }
    if (currentAdmin.role === 'Inquiry Manager') {
      return ['rfqs', 'messages'].includes(tabId);
    }

    return false;
  };

  const navGroups: NavGroup[] = [
    {
      group: 'OVERVIEW',
      items: [
        { id: 'dashboard' as AdminTab, label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
      ]
    },
    {
      group: 'WEBSITE CONTENT',
      items: [
        { id: 'banners' as AdminTab, label: 'Hero Banners', icon: <ImageIcon className="w-4 h-4" /> },
        { id: 'about' as AdminTab, label: 'About Us & Proprietor', icon: <FileText className="w-4 h-4" /> },
        { id: 'company-docs' as AdminTab, label: 'Company Profile & Legal', icon: <FileCheck className="w-4 h-4" /> },
        { id: 'vendor-docs' as AdminTab, label: 'Vendor Enlistment Docs', icon: <Briefcase className="w-4 h-4" /> },
      ]
    },
    {
      group: 'CATALOG & SERVICES',
      items: [
        { id: 'categories' as AdminTab, label: 'Product Categories', icon: <FolderTree className="w-4 h-4" /> },
        { id: 'products' as AdminTab, label: 'All Products', icon: <Package className="w-4 h-4" /> },
        { id: 'services' as AdminTab, label: 'Engineering Services', icon: <Wrench className="w-4 h-4" /> },
        { id: 'industries' as AdminTab, label: 'Industries We Serve', icon: <Building2 className="w-4 h-4" /> },
      ]
    },
    {
      group: 'INQUIRIES & MESSAGES',
      items: [
        { 
          id: 'rfqs' as AdminTab, 
          label: 'RFQs / Quotations', 
          icon: <Inbox className="w-4 h-4" />,
          badge: newRfqCount > 0 ? newRfqCount : undefined,
          badgeColor: 'bg-amber-500 text-slate-950'
        },
        { 
          id: 'messages' as AdminTab, 
          label: 'Contact Inquiries', 
          icon: <MessageSquare className="w-4 h-4" />,
          badge: unreadMsgCount > 0 ? unreadMsgCount : undefined,
          badgeColor: 'bg-emerald-500 text-white'
        },
      ]
    },
    {
      group: 'SYSTEM & SETTINGS',
      items: [
        { id: 'settings' as AdminTab, label: 'Global Website Settings', icon: <Settings className="w-4 h-4" /> },
        { id: 'users' as AdminTab, label: 'Admin Users & Roles', icon: <Users className="w-4 h-4" /> },
        { id: 'backup' as AdminTab, label: 'Database Backup & Reset', icon: <Database className="w-4 h-4" /> },
      ]
    }
  ];

  const filteredNavGroups = navGroups
    .map((g) => ({
      ...g,
      items: g.items.filter((item) => isPermitted(item.id)),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <aside className="w-64 bg-slate-950 text-slate-400 border-r border-slate-800 flex flex-col shrink-0 min-h-screen">
      {/* Brand Bar */}
      <div className="h-16 px-5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-amber-500 text-slate-950 font-display font-extrabold flex items-center justify-center text-sm shadow-xs">
            ART
          </div>
          <div>
            <div className="text-xs font-bold text-white font-display tracking-tight">
              Management Panel
            </div>
            <div className="text-[10px] text-amber-400 font-mono">
              Live SQLite Database
            </div>
          </div>
        </div>

        <button
          onClick={closeAdmin}
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-900 rounded transition-colors"
          title="Return to Public Website"
        >
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>

      {/* Admin User Info Bar */}
      {currentAdmin && (
        <div className="px-5 py-3 bg-slate-900/60 border-b border-slate-800/80 flex items-center justify-between">
          <div className="truncate pr-2">
            <div className="text-xs font-semibold text-white truncate">
              {currentAdmin.name}
            </div>
            <div className="text-[10px] font-mono text-amber-400">
              {currentAdmin.role}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-slate-400 hover:text-rose-400 transition-colors p-1"
            title="Log Out"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {filteredNavGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            <div className="px-3 text-[10px] font-mono font-semibold tracking-wider text-slate-400 uppercase mb-1">
              {group.group}
            </div>
            {group.items.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setTab(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer Return */}
      <div className="p-3 border-t border-slate-800">
        <button
          onClick={closeAdmin}
          className="w-full btn-industrial-outline text-xs justify-center py-2 bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Exit to Public Website</span>
        </button>
      </div>
    </aside>
  );
};
