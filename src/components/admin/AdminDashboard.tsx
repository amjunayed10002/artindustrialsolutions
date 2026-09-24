import React from 'react';
import { useData } from '../../context/DataContext';
import { AdminTab } from './AdminLayout';
import { 
  Package, 
  FolderTree, 
  Wrench, 
  Building2, 
  FileCheck, 
  Inbox, 
  MessageSquare, 
  ArrowRight, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Plus
} from 'lucide-react';

interface AdminDashboardProps {
  setTab: (tab: AdminTab) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ setTab }) => {
  const { 
    products, 
    categories, 
    services, 
    industries, 
    companyDocuments, 
    vendorDocuments, 
    rfqs, 
    contactMessages, 
    settings,
    store 
  } = useData();

  const totalProducts = products.length;
  const totalCategories = categories.length;
  const totalServices = services.length;
  const totalIndustries = industries.length;
  const totalDocs = companyDocuments.length + vendorDocuments.length;
  const totalRFQs = rfqs.length;
  const newRFQs = rfqs.filter((r) => r.status === 'New').length;
  const totalMessages = contactMessages.length;
  const unreadMessages = contactMessages.filter((m) => !m.is_read).length;

  const statCards = [
    { label: 'Total Products', value: totalProducts, tab: 'products' as AdminTab, icon: <Package className="w-5 h-5 text-amber-500" />, sub: `${products.filter(p => p.is_featured).length} featured` },
    { label: 'Product Categories', value: totalCategories, tab: 'categories' as AdminTab, icon: <FolderTree className="w-5 h-5 text-sky-500" />, sub: 'Active departments' },
    { label: 'Engineering Services', value: totalServices, tab: 'services' as AdminTab, icon: <Wrench className="w-5 h-5 text-emerald-500" />, sub: 'Turnkey capabilities' },
    { label: 'Industries We Serve', value: totalIndustries, tab: 'industries' as AdminTab, icon: <Building2 className="w-5 h-5 text-indigo-500" />, sub: 'Manufacturing sectors' },
    { label: 'Total Documents', value: totalDocs, tab: 'company-docs' as AdminTab, icon: <FileCheck className="w-5 h-5 text-teal-500" />, sub: 'Statutory & vendor files' },
    { label: 'Total RFQs', value: totalRFQs, tab: 'rfqs' as AdminTab, icon: <Inbox className="w-5 h-5 text-amber-500" />, sub: `${newRFQs} pending quotes`, highlight: newRFQs > 0 },
    { label: 'Contact Inquiries', value: totalMessages, tab: 'messages' as AdminTab, icon: <MessageSquare className="w-5 h-5 text-purple-500" />, sub: `${unreadMessages} unread`, highlight: unreadMessages > 0 },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner Greeting */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-semibold text-amber-600 uppercase tracking-wider">
            Live Central Operations
          </span>
          <h1 className="text-2xl font-display font-extrabold text-slate-900 mt-1">
            {settings.company_name} Management Control
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-mono">
            Website Domain: <span className="font-bold text-slate-800">{settings.domain}</span> · All changes take immediate effect on the live website.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTab('products')}
            className="btn-industrial-primary text-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Product</span>
          </button>

          <button
            onClick={() => setTab('banners')}
            className="btn-industrial-outline text-xs"
          >
            <span>Manage Banners</span>
          </button>
        </div>
      </div>

      {/* Numerical Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => (
          <div
            key={idx}
            onClick={() => setTab(stat.tab)}
            className={`bg-white rounded-lg border p-5 shadow-xs transition-all cursor-pointer hover:shadow-md hover:border-slate-300 ${
              stat.highlight ? 'border-amber-400 bg-amber-50/20' : 'border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-600 uppercase font-mono tracking-wider">
                {stat.label}
              </span>
              <div className="p-2 rounded bg-slate-50 border border-slate-100">
                {stat.icon}
              </div>
            </div>

            <div className="text-3xl font-display font-extrabold text-slate-900 tabular-nums">
              {stat.value}
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500 font-mono">
              <span>{stat.sub}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Section: Recent RFQs & Recent Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent RFQs */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Inbox className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  Recent Quotation Requests (RFQs)
                </h3>
              </div>
              <button
                onClick={() => setTab('rfqs')}
                className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1 font-mono"
              >
                <span>View All ({rfqs.length})</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {rfqs.slice(0, 5).map((rfq) => (
                <div key={rfq.id} className="p-4 hover:bg-slate-50/70 transition-colors flex items-center justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-900">
                        {rfq.reference_no}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs font-semibold text-slate-700 truncate">
                        {rfq.company_name}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 truncate">
                      {rfq.product_name} ({rfq.quantity})
                    </div>
                    <div className="text-[11px] font-mono text-slate-400">
                      {rfq.created_at} · By: {rfq.customer_name}
                    </div>
                  </div>

                  <div className="shrink-0 flex flex-col items-end gap-1.5">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                      rfq.status === 'New'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : rfq.status === 'Quotation Sent'
                        ? 'bg-sky-100 text-sky-800'
                        : rfq.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {rfq.status}
                    </span>

                    <button
                      onClick={() => setTab('rfqs')}
                      className="text-[11px] text-slate-500 hover:text-slate-900 underline"
                    >
                      Inspect Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Contact Inquiries */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-500" />
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  Recent Contact Messages
                </h3>
              </div>
              <button
                onClick={() => setTab('messages')}
                className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1 font-mono"
              >
                <span>View All ({contactMessages.length})</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {contactMessages.slice(0, 4).map((msg) => (
                <div key={msg.id} className="p-4 hover:bg-slate-50/70 transition-colors space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">
                      {msg.name}
                    </span>
                    {!msg.is_read ? (
                      <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
                        NEW UNREAD
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-400">Read</span>
                    )}
                  </div>

                  <div className="text-xs text-slate-500 font-mono">
                    {msg.company} · {msg.phone}
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 pt-1">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
            <button
              onClick={() => setTab('messages')}
              className="text-xs font-semibold text-slate-700 hover:text-slate-900"
            >
              Open Message Manager →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
