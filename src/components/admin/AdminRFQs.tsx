import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { RFQ, RFQStatus } from '../../types';
import { 
  Inbox, 
  Search, 
  Filter, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Send, 
  X, 
  Building, 
  User, 
  Mail, 
  Phone, 
  Paperclip,
  FileText
} from 'lucide-react';

export const AdminRFQs: React.FC = () => {
  const { rfqs, store } = useData();
  const [selectedRFQ, setSelectedRFQ] = useState<RFQ | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [adminNotes, setAdminNotes] = useState('');

  const handleOpenDetail = (rfq: RFQ) => {
    setSelectedRFQ(rfq);
    setAdminNotes(rfq.admin_notes || '');
  };

  const handleUpdateStatus = (rfqId: number, newStatus: RFQStatus) => {
    store.updateRFQStatus(rfqId, newStatus, adminNotes);
    if (selectedRFQ && selectedRFQ.id === rfqId) {
      setSelectedRFQ({
        ...selectedRFQ,
        status: newStatus,
        admin_notes: adminNotes,
      });
    }
  };

  const handleDelete = (rfq: RFQ) => {
    if (confirm(`Are you sure you want to delete quotation record ${rfq.reference_no}?`)) {
      store.deleteRFQ(rfq.id);
      if (selectedRFQ?.id === rfq.id) setSelectedRFQ(null);
    }
  };

  // Filter & Search
  const filteredRFQs = useMemo(() => {
    return rfqs.filter((r) => {
      if (statusFilter !== 'all' && r.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          r.reference_no.toLowerCase().includes(q) ||
          r.customer_name.toLowerCase().includes(q) ||
          r.company_name.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.product_name.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [rfqs, statusFilter, searchQuery]);

  const statuses: RFQStatus[] = ['New', 'Contacted', 'Quotation Sent', 'Completed', 'Cancelled'];

  const getStatusBadge = (status: RFQStatus) => {
    switch (status) {
      case 'New':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Contacted':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Quotation Sent':
        return 'bg-sky-100 text-sky-800 border-sky-300';
      case 'Completed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-lg border border-slate-200 shadow-xs">
        <div>
          <span className="text-xs font-mono font-semibold text-amber-600 uppercase tracking-wider">
            Commercial Requisitions
          </span>
          <h1 className="text-2xl font-display font-extrabold text-slate-900 mt-1">
            Request for Quotation (RFQ) Desk
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Track inquiries, update commercial statuses, inspect technical specifications, and manage client quotes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-xs font-mono bg-amber-50 text-amber-900 px-3 py-1.5 rounded border border-amber-200">
            Pending: <span className="font-bold">{rfqs.filter((r) => r.status === 'New').length}</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-[280px]">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reference #, client name, company, or part..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-xs rounded border border-slate-200 bg-white"
          >
            <option value="all">All Statuses ({rfqs.length})</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s} ({rfqs.filter((r) => r.status === s).length})
              </option>
            ))}
          </select>
        </div>

        <div className="text-xs font-mono text-slate-500">
          Showing <span className="font-bold text-slate-900">{filteredRFQs.length}</span> requisitions
        </div>
      </div>

      {/* RFQ List Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-mono uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Ref & Date</th>
                <th className="py-3 px-4">Client & Factory</th>
                <th className="py-3 px-4">Required Item & Qty</th>
                <th className="py-3 px-4">Requirement / Specs</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRFQs.map((rfq) => (
                <tr key={rfq.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-mono font-bold text-slate-900">
                      {rfq.reference_no}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      {rfq.created_at}
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900">{rfq.customer_name}</div>
                    <div className="text-[11px] text-slate-500">{rfq.company_name}</div>
                    <div className="text-[10px] font-mono text-slate-400">{rfq.phone}</div>
                  </td>

                  <td className="py-3 px-4 max-w-[200px]">
                    <div className="font-medium text-slate-900 truncate">
                      {rfq.product_name}
                    </div>
                    <div className="text-[11px] font-mono text-amber-700">
                      Qty: {rfq.quantity}
                    </div>
                  </td>

                  <td className="py-3 px-4 max-w-[180px]">
                    <div className="text-xs text-slate-600 line-clamp-2">
                      {rfq.requirement}
                    </div>
                    {rfq.attachment_name && (
                      <div className="text-[10px] font-mono text-emerald-700 flex items-center gap-1 mt-0.5">
                        <Paperclip className="w-3 h-3" />
                        <span className="truncate">{rfq.attachment_name}</span>
                      </div>
                    )}
                  </td>

                  <td className="py-3 px-4">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-bold uppercase ${getStatusBadge(rfq.status)}`}>
                      {rfq.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenDetail(rfq)}
                        className="btn-industrial-outline text-[11px] py-1 px-2.5"
                      >
                        Inspect
                      </button>
                      <button
                        onClick={() => handleDelete(rfq)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded"
                        title="Delete RFQ"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RFQ Detail Modal */}
      {selectedRFQ && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full border border-slate-300 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Inbox className="w-5 h-5 text-amber-500" />
                <span className="font-display font-bold text-sm tracking-tight">
                  RFQ Dossier: {selectedRFQ.reference_no}
                </span>
              </div>
              <button
                onClick={() => setSelectedRFQ(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Buyer Info */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block">Contact Person:</span>
                  <span className="font-bold text-slate-900">{selectedRFQ.customer_name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Company / Factory:</span>
                  <span className="font-bold text-slate-900">{selectedRFQ.company_name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Email Address:</span>
                  <a href={`mailto:${selectedRFQ.email}`} className="font-bold text-amber-600 hover:underline">
                    {selectedRFQ.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block">Phone Number:</span>
                  <a href={`tel:${selectedRFQ.phone}`} className="font-bold text-slate-900">
                    {selectedRFQ.phone}
                  </a>
                </div>
              </div>

              {/* Requirement Details */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
                  Requisition Scope
                </h4>
                <div className="p-4 rounded-lg border border-slate-200 space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 font-mono">Item Name:</span>{' '}
                    <span className="font-bold text-slate-900">{selectedRFQ.product_name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-mono">Quantity & Units:</span>{' '}
                    <span className="font-bold text-slate-900">{selectedRFQ.quantity}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-mono">Technical Requirement:</span>{' '}
                    <span className="font-semibold text-slate-800">{selectedRFQ.requirement}</span>
                  </div>
                  {selectedRFQ.message && (
                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-slate-400 font-mono block">Delivery & Destination Notes:</span>
                      <p className="text-slate-700 mt-0.5 leading-relaxed">{selectedRFQ.message}</p>
                    </div>
                  )}
                  {selectedRFQ.attachment_name && (
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                        <Paperclip className="w-3.5 h-3.5" />
                        <span>Attached BOM: {selectedRFQ.attachment_name}</span>
                      </div>
                      <span className="text-slate-400">Available in dispatch folder</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Changer & Admin Notes */}
              <div className="space-y-3 p-4 bg-amber-50/50 rounded-lg border border-amber-200">
                <h4 className="text-xs font-bold text-amber-900 uppercase font-mono tracking-wider">
                  RFQ Status & Commercial Routing
                </h4>

                <div className="flex flex-wrap items-center gap-2">
                  {statuses.map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleUpdateStatus(selectedRFQ.id, st)}
                      className={`px-3 py-1.5 text-xs font-mono font-bold rounded border transition-colors cursor-pointer ${
                        selectedRFQ.status === st
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <label className="text-xs font-mono text-slate-600 block mb-1">
                    Internal Sales Engineer Notes:
                  </label>
                  <textarea
                    rows={2}
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="e.g. Quoted $4,200 CIF delivery to Mongla port, valid until end of month..."
                    className="w-full px-3 py-1.5 text-xs rounded border border-slate-200 bg-white"
                  />
                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      onClick={() => store.updateRFQStatus(selectedRFQ.id, selectedRFQ.status, adminNotes)}
                      className="text-xs font-mono font-bold text-amber-800 hover:underline"
                    >
                      Save Internal Note
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="bg-white px-6 py-4 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedRFQ(null)}
                className="btn-industrial-outline text-xs"
              >
                Close
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedRFQ.email}?subject=Quotation for RFQ ${selectedRFQ.reference_no} - ART Industrial Solutions`}
                  className="btn-industrial-primary text-xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply by Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
