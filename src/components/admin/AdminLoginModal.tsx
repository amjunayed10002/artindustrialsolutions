import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Lock, Shield, ArrowRight, X, AlertCircle } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { store } = useData();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      const res = store.loginAdmin(username, password);
      setLoading(false);
      if (res.success) {
        onSuccess();
      } else {
        setError(res.error || 'Authentication failed. Please verify credentials.');
      }
    }, 300);
  };


  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full border border-slate-300 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-amber-500 text-slate-950 font-display font-extrabold flex items-center justify-center text-sm shadow-xs">
              ART
            </div>
            <div>
              <h3 className="font-display font-bold text-sm tracking-tight text-white">
                Admin Panel Authentication
              </h3>
              <div className="text-[10px] text-amber-400 font-mono">
                ART Industrial Solutions CMS
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Admin Username or Email *
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500 font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Admin Password *
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500 font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-industrial-primary w-full justify-center py-2.5 text-xs font-bold"
            >
              {loading ? (
                <span>Verifying credentials...</span>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Sign In to Admin Panel</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
