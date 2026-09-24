import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { ContactMessage } from '../../types';
import { 
  MessageSquare, 
  Search, 
  Trash2, 
  Mail, 
  Phone, 
  CheckCircle2, 
  X, 
  Eye, 
  Save 
} from 'lucide-react';

export const AdminMessages: React.FC = () => {
  const { contactMessages, store } = useData();
  const [selectedMsg, setSelectedMsg] = useState<ContactMessage | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [replyNotes, setReplyNotes] = useState('');

  const handleOpen = (msg: ContactMessage) => {
    setSelectedMsg(msg);
    setReplyNotes(msg.admin_notes || '');
    if (!msg.is_read) {
      store.markContactMessageRead(msg.id, true);
    }
  };

  const handleToggleRead = (msg: ContactMessage, e: React.MouseEvent) => {
    e.stopPropagation();
    store.markContactMessageRead(msg.id, !msg.is_read);
  };

  const handleDelete = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (confirm('Are you sure you want to delete this contact message?')) {
      store.deleteContactMessage(id);
      if (selectedMsg?.id === id) setSelectedMsg(null);
    }
  };

  const handleSaveNotes = () => {
    if (selectedMsg) {
      store.markContactMessageRead(selectedMsg.id, selectedMsg.is_read, replyNotes);
      setSelectedMsg({ ...selectedMsg, admin_notes: replyNotes });
    }
  };

  const filtered = useMemo(() => {
    return contactMessages.filter((m) => {
      if (filter === 'unread' && m.is_read) return false;
      if (filter === 'read' && !m.is_read) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          m.name.toLowerCase().includes(q) ||
          m.company.toLowerCase().includes(q) ||
          m.subject.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [contactMessages, filter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-lg border border-slate-200 shadow-xs">
        <div>
          <span className="text-xs font-mono font-semibold text-amber-600 uppercase tracking-wider">
            Inbound Inquiries
          </span>
          <h1 className="text-2xl font-display font-extrabold text-slate-900 mt-1">
            Contact Messages Desk
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-1">
            General messages submitted through the public Contact Us form.
          </p>
        </div>

        <div className="text-xs font-mono bg-emerald-50 text-emerald-900 px-3 py-1.5 rounded border border-emerald-200">
          Unread: <span className="font-bold">{contactMessages.filter((m) => !m.is_read).length}</span>
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
              placeholder="Search sender, company, subject..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-md text-xs font-mono">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded transition-colors ${
                filter === 'all' ? 'bg-white font-bold text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              All ({contactMessages.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-2.5 py-1 rounded transition-colors ${
                filter === 'unread' ? 'bg-white font-bold text-emerald-800 shadow-xs' : 'text-slate-600'
              }`}
            >
              Unread ({contactMessages.filter((m) => !m.is_read).length})
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-2.5 py-1 rounded transition-colors ${
                filter === 'read' ? 'bg-white font-bold text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Read
            </button>
          </div>
        </div>

        <div className="text-xs font-mono text-slate-500">
          Showing <span className="font-bold text-slate-900">{filtered.length}</span> messages
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {filtered.map((msg) => (
          <div
            key={msg.id}
            onClick={() => handleOpen(msg)}
            className={`p-4 hover:bg-slate-50/80 transition-colors cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
              !msg.is_read ? 'bg-amber-50/20' : ''
            }`}
          >
            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">{msg.name}</span>
                <span className="text-slate-400">·</span>
                <span className="text-xs text-slate-600 font-medium">{msg.company}</span>
                {!msg.is_read && (
                  <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold uppercase">
                    New
                  </span>
                )}
              </div>

              <div className="text-xs font-semibold text-slate-800">
                {msg.subject}
              </div>

              <p className="text-xs text-slate-500 line-clamp-1">
                {msg.message}
              </p>

              <div className="text-[10px] font-mono text-slate-400">
                {msg.created_at} · Email: {msg.email} · Phone: {msg.phone}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
              <button
                onClick={(e) => handleToggleRead(msg, e)}
                className={`text-[11px] font-mono px-2 py-1 rounded border ${
                  msg.is_read ? 'text-slate-500 border-slate-200' : 'text-emerald-700 bg-emerald-50 border-emerald-200 font-bold'
                }`}
              >
                {msg.is_read ? 'Mark Unread' : 'Mark Read'}
              </button>

              <button
                onClick={(e) => handleDelete(msg.id, e)}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded"
                title="Delete Message"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Message Detail Modal */}
      {selectedMsg && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-xl w-full border border-slate-300 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-amber-500" />
                <span className="font-display font-bold text-sm tracking-tight">
                  Inquiry Details
                </span>
              </div>
              <button onClick={() => setSelectedMsg(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="p-3 bg-slate-50 rounded border border-slate-200 grid grid-cols-2 gap-3 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block">Sender Name:</span>
                  <span className="font-bold text-slate-900">{selectedMsg.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Company:</span>
                  <span className="font-bold text-slate-900">{selectedMsg.company}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Email:</span>
                  <a href={`mailto:${selectedMsg.email}`} className="font-bold text-amber-600">
                    {selectedMsg.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block">Phone:</span>
                  <a href={`tel:${selectedMsg.phone}`} className="font-bold text-slate-900">
                    {selectedMsg.phone}
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider mb-1">
                  Subject:
                </h4>
                <div className="text-sm font-bold text-slate-900">
                  {selectedMsg.subject}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                {selectedMsg.message}
              </div>

              {/* Internal Reply Note */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-xs font-mono font-semibold text-slate-700 block">
                  Internal Response Note:
                </label>
                <textarea
                  rows={2}
                  value={replyNotes}
                  onChange={(e) => setReplyNotes(e.target.value)}
                  placeholder="Record call summary or action taken..."
                  className="w-full px-3 py-1.5 text-xs rounded border border-slate-200"
                />
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  className="text-xs font-mono font-bold text-amber-600 hover:underline flex items-center gap-1"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Internal Note</span>
                </button>
              </div>
            </div>

            <div className="bg-white px-6 py-4 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedMsg(null)}
                className="btn-industrial-outline text-xs"
              >
                Close
              </button>

              <a
                href={`mailto:${selectedMsg.email}?subject=RE: ${selectedMsg.subject}`}
                className="btn-industrial-primary text-xs"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Reply by Email</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
