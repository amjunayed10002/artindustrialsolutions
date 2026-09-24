import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { AdminUser, AdminRole, AdminModule } from '../../types';
import { 
  Users, 
  Shield, 
  KeyRound, 
  CheckCircle2, 
  Save, 
  Plus, 
  Trash2, 
  X, 
  UserCheck, 
  Lock, 
  CheckSquare, 
  Square,
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface ModuleOption {
  id: AdminModule;
  label: string;
  category: string;
  description: string;
}

const AVAILABLE_MODULES: ModuleOption[] = [
  { id: 'banners', label: 'Hero Banners & Sliders', category: 'Content', description: 'Create and edit homepage dynamic slides' },
  { id: 'about', label: 'About Us & Proprietor', category: 'Content', description: 'Mission, vision, core values, proprietor message' },
  { id: 'company-docs', label: 'Company Profile & Legal', category: 'Content', description: 'Trade License, TIN, BIN, and compliance files' },
  { id: 'vendor-docs', label: 'Vendor Enlistment Docs', category: 'Content', description: 'Registration forms and commercial checklists' },
  
  { id: 'categories', label: 'Product Categories', category: 'Catalog', description: 'Create and organize product classification' },
  { id: 'products', label: 'Product Catalog', category: 'Catalog', description: 'Add products, engineering specs, upload photos' },
  { id: 'services', label: 'Engineering Services', category: 'Catalog', description: 'Turnkey maintenance and shutdown services' },
  { id: 'industries', label: 'Industries We Serve', category: 'Catalog', description: 'Sectors, equipment supplied, and sector RFQs' },
  
  { id: 'rfqs', label: 'RFQs & Quotations', category: 'Inquiries', description: 'Commercial RFQ tracking, notes, and status' },
  { id: 'messages', label: 'Contact Messages', category: 'Inquiries', description: 'General customer inquiries and message archive' },
  
  { id: 'settings', label: 'Website Settings & Branding', category: 'System', description: 'Logo, favicon, phone, email, WhatsApp, map' },
  { id: 'users', label: 'Admin Users & Access Control', category: 'System', description: 'Manage administrators and grant access' },
  { id: 'backup', label: 'Database Backup & Reset', category: 'System', description: 'Export JSON snapshots and database restore' },
];

export const AdminUsers: React.FC = () => {
  const { adminUsers, currentAdmin, store } = useData();
  const isSuperAdmin = currentAdmin?.role === 'Super Admin';

  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(adminUsers[0] || null);
  const [isCreating, setIsCreating] = useState(false);
  const [editingPermissionsUser, setEditingPermissionsUser] = useState<AdminUser | null>(null);

  // New User Form State
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    role: 'Custom Admin' as AdminRole,
    password: '',
    confirmPassword: '',
    permissions: ['products', 'services', 'rfqs'] as AdminModule[],
  });

  // Password Update State
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingPermissionsUser(null);
    setFormData({
      name: '',
      username: '',
      email: '',
      role: 'Custom Admin',
      password: '',
      confirmPassword: '',
      permissions: ['products', 'services', 'rfqs'],
    });
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleStartEditPermissions = (user: AdminUser) => {
    setEditingPermissionsUser(user);
    setIsCreating(false);
    setFormData({
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      password: '',
      confirmPassword: '',
      permissions: user.permissions || (user.role === 'Super Admin' 
        ? AVAILABLE_MODULES.map(m => m.id)
        : user.role === 'Content Manager'
        ? ['banners', 'about', 'company-docs', 'vendor-docs', 'categories', 'products', 'services', 'industries']
        : ['rfqs', 'messages']),
    });
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleRolePresetChange = (role: AdminRole) => {
    let perms: AdminModule[] = [];
    if (role === 'Super Admin') {
      perms = AVAILABLE_MODULES.map(m => m.id);
    } else if (role === 'Content Manager') {
      perms = ['banners', 'about', 'company-docs', 'vendor-docs', 'categories', 'products', 'services', 'industries'];
    } else if (role === 'Inquiry Manager') {
      perms = ['rfqs', 'messages'];
    } else {
      perms = formData.permissions.length > 0 ? formData.permissions : ['products', 'services', 'rfqs'];
    }
    setFormData({ ...formData, role, permissions: perms });
  };

  const togglePermission = (modId: AdminModule) => {
    const exists = formData.permissions.includes(modId);
    let next: AdminModule[];
    if (exists) {
      next = formData.permissions.filter(id => id !== modId);
    } else {
      next = [...formData.permissions, modId];
    }
    setFormData({ 
      ...formData, 
      permissions: next,
      role: next.length === AVAILABLE_MODULES.length ? 'Super Admin' : 'Custom Admin'
    });
  };

  const handleSelectAllPermissions = () => {
    setFormData({ 
      ...formData, 
      permissions: AVAILABLE_MODULES.map(m => m.id),
      role: 'Super Admin'
    });
  };

  const handleClearPermissions = () => {
    setFormData({ ...formData, permissions: [], role: 'Custom Admin' });
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!formData.name.trim() || !formData.username.trim() || !formData.email.trim()) {
      setErrorMsg('Please fill out all required fields.');
      return;
    }

    if (adminUsers.some(u => u.username.toLowerCase() === formData.username.trim().toLowerCase())) {
      setErrorMsg(`Username "${formData.username}" is already taken.`);
      return;
    }

    if (!formData.password || formData.password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    if (formData.permissions.length === 0) {
      setErrorMsg('Please select at least one permission module for this admin.');
      return;
    }

    const created = store.addAdminUser({
      name: formData.name.trim(),
      username: formData.username.trim().toLowerCase(),
      email: formData.email.trim(),
      role: formData.role,
      permissions: formData.permissions,
      password: formData.password,
    });

    setIsCreating(false);
    setSelectedUser(created);
    setSuccessMsg(`Administrator account "${created.name}" created with custom access.`);
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  const handleSavePermissions = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPermissionsUser) return;

    if (formData.permissions.length === 0) {
      setErrorMsg('Please select at least one module access permission.');
      return;
    }

    store.updateAdminUser(editingPermissionsUser.id, {
      name: formData.name.trim(),
      email: formData.email.trim(),
      role: formData.role,
      permissions: formData.permissions,
    });

    setEditingPermissionsUser(null);
    setSuccessMsg(`Permissions successfully updated for ${formData.name}.`);
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  const handleDeleteUser = (user: AdminUser) => {
    if (user.id === currentAdmin?.id) {
      alert('You cannot delete your own currently logged-in administrator account.');
      return;
    }
    if (user.id === 1) {
      alert('The primary founding Super Administrator account cannot be removed.');
      return;
    }
    if (confirm(`Are you sure you want to revoke access and delete administrator "${user.name}"?`)) {
      store.deleteAdminUser(user.id);
      setSelectedUser(adminUsers.find(u => u.id !== user.id) || null);
      setSuccessMsg(`Administrator account "${user.name}" has been deleted.`);
      setTimeout(() => setSuccessMsg(''), 4000);
    }
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!newPassword || newPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    if (selectedUser) {
      store.updateAdminUser(selectedUser.id, { password: newPassword });
      setSuccessMsg(`Password successfully updated for ${selectedUser.name}.`);
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setSuccessMsg(''), 4000);
    }
  };

  const getRoleBadge = (role: AdminRole) => {
    switch (role) {
      case 'Super Admin':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Content Manager':
        return 'bg-sky-100 text-sky-900 border-sky-300';
      case 'Inquiry Manager':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Custom Admin':
        return 'bg-purple-100 text-purple-900 border-purple-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-lg border border-slate-200 shadow-xs">
        <div>
          <span className="text-xs font-mono font-semibold text-amber-600 uppercase tracking-wider">
            Role-Based Access Control (RBAC)
          </span>
          <h1 className="text-2xl font-display font-extrabold text-slate-900 mt-1">
            Admin User Management & Permissions
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Super Admin can create new administrators and grant custom, granular module access.
          </p>
        </div>

        {isSuperAdmin && (
          <button
            onClick={handleStartCreate}
            className="btn-industrial-primary text-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Admin</span>
          </button>
        )}
      </div>

      {/* Alerts */}
      {successMsg && (
        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}
      {errorMsg && (
        <div className="p-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Add New Admin Modal / Section */}
      {isCreating && (
        <form onSubmit={handleCreateUser} className="bg-white p-6 sm:p-8 rounded-lg border-2 border-amber-400 shadow-md space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-sm">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  Create New Administrator Account
                </h3>
                <p className="text-[11px] text-slate-500 font-mono">
                  Specify user credentials and assign custom module permissions.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="p-1 text-slate-400 hover:text-slate-700 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Engr. Kamal Hossain"
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Username *
              </label>
              <input
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value.toLowerCase().replace(/\s+/g, '') })}
                placeholder="e.g. kamal_hossain"
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 font-mono focus:outline-hidden focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="kamal@artindustrialsolutions.com"
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 focus:outline-hidden focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Role Template
              </label>
              <select
                value={formData.role}
                onChange={(e) => handleRolePresetChange(e.target.value as AdminRole)}
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 bg-white"
              >
                <option value="Custom Admin">Custom Admin (Specific Access)</option>
                <option value="Content Manager">Content Manager Preset</option>
                <option value="Inquiry Manager">Inquiry Manager Preset</option>
                <option value="Super Admin">Super Admin (Full Access)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Initial Password *
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="At least 6 characters"
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Confirm Password *
              </label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Re-enter password"
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 font-mono"
              />
            </div>
          </div>

          {/* Granular Permission Checkboxes */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider block">
                  Specific Module Access Permissions ({formData.permissions.length} Selected)
                </span>
                <p className="text-[11px] text-slate-500 font-mono">
                  Select specifically which administrative areas this admin can view and modify.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono">
                <button
                  type="button"
                  onClick={handleSelectAllPermissions}
                  className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                >
                  Select All
                </button>
                <button
                  type="button"
                  onClick={handleClearPermissions}
                  className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                >
                  Clear All
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {AVAILABLE_MODULES.map((mod) => {
                const checked = formData.permissions.includes(mod.id);
                return (
                  <div
                    key={mod.id}
                    onClick={() => togglePermission(mod.id)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-2.5 ${
                      checked
                        ? 'bg-amber-50/60 border-amber-300 shadow-2xs'
                        : 'bg-slate-50/50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="mt-0.5 text-amber-600 shrink-0">
                      {checked ? (
                        <CheckSquare className="w-4 h-4 text-amber-600" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-300" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{mod.label}</span>
                        <span className="text-[9px] font-mono uppercase px-1 rounded bg-slate-200 text-slate-600">
                          {mod.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                        {mod.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="btn-industrial-outline text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-industrial-primary text-xs"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Save & Grant Access</span>
            </button>
          </div>
        </form>
      )}

      {/* Edit Permissions Modal */}
      {editingPermissionsUser && (
        <form onSubmit={handleSavePermissions} className="bg-white p-6 sm:p-8 rounded-lg border-2 border-sky-400 shadow-md space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-sky-500 text-white font-bold flex items-center justify-center text-sm">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  Edit Admin Access: {editingPermissionsUser.name}
                </h3>
                <p className="text-[11px] text-slate-500 font-mono">
                  Modify role tier and granular module permissions.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setEditingPermissionsUser(null)}
              className="p-1 text-slate-400 hover:text-slate-700 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded border border-slate-200"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded border border-slate-200"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-semibold text-slate-700 block mb-1">
                Role Classification
              </label>
              <select
                value={formData.role}
                onChange={(e) => handleRolePresetChange(e.target.value as AdminRole)}
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 bg-white"
              >
                <option value="Custom Admin">Custom Admin (Specific Access)</option>
                <option value="Content Manager">Content Manager Preset</option>
                <option value="Inquiry Manager">Inquiry Manager Preset</option>
                <option value="Super Admin">Super Admin (Full Access)</option>
              </select>
            </div>
          </div>

          {/* Granular Permission Checkboxes */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider block">
                  Granted Module Access ({formData.permissions.length} Selected)
                </span>
                <p className="text-[11px] text-slate-500 font-mono">
                  Toggle permissions individually or use presets above.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono">
                <button
                  type="button"
                  onClick={handleSelectAllPermissions}
                  className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                >
                  Select All
                </button>
                <button
                  type="button"
                  onClick={handleClearPermissions}
                  className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                >
                  Clear All
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {AVAILABLE_MODULES.map((mod) => {
                const checked = formData.permissions.includes(mod.id);
                return (
                  <div
                    key={mod.id}
                    onClick={() => togglePermission(mod.id)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-2.5 ${
                      checked
                        ? 'bg-amber-50/60 border-amber-300 shadow-2xs'
                        : 'bg-slate-50/50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="mt-0.5 text-amber-600 shrink-0">
                      {checked ? (
                        <CheckSquare className="w-4 h-4 text-amber-600" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-300" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{mod.label}</span>
                        <span className="text-[9px] font-mono uppercase px-1 rounded bg-slate-200 text-slate-600">
                          {mod.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                        {mod.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setEditingPermissionsUser(null)}
              className="btn-industrial-outline text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-industrial-primary text-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Update Access Permissions</span>
            </button>
          </div>
        </form>
      )}

      {/* Main Admin Users Listing */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* User Accounts List */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 text-xs font-mono font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
            <span>Registered Administrators ({adminUsers.length})</span>
            <span className="text-[11px] text-slate-500 font-normal">
              Click user to manage credentials & permissions
            </span>
          </div>

          {adminUsers.map((user) => {
            const isSelf = currentAdmin?.id === user.id;
            const permsCount = user.permissions?.length || (user.role === 'Super Admin' ? AVAILABLE_MODULES.length : 0);

            return (
              <div
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors ${
                  selectedUser?.id === user.id ? 'bg-amber-50/40 border-l-4 border-amber-500' : ''
                }`}
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-slate-900">{user.name}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-bold uppercase ${getRoleBadge(user.role)}`}>
                      {user.role}
                    </span>
                    {isSelf && (
                      <span className="text-[10px] font-mono bg-slate-900 text-white px-1.5 py-0.2 rounded font-semibold">
                        Logged In
                      </span>
                    )}
                  </div>

                  <div className="text-xs font-mono text-slate-500">
                    Username: <span className="text-slate-800 font-semibold">{user.username}</span> · {user.email}
                  </div>

                  <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                    <span>Specific Access: <strong className="text-amber-700">{permsCount} modules</strong></span>
                    <span>·</span>
                    <span>Last Login: {user.last_login || 'Active Session'}</span>
                  </div>

                  {user.permissions && user.permissions.length > 0 && user.role !== 'Super Admin' && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {user.permissions.map((p) => (
                        <span key={p} className="text-[9px] font-mono bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200">
                          {p}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {isSuperAdmin && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartEditPermissions(user);
                      }}
                      className="btn-industrial-outline text-xs py-1 px-2.5"
                      title="Configure Specific Module Permissions"
                    >
                      Permissions
                    </button>
                  )}

                  {isSuperAdmin && !isSelf && user.id !== 1 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteUser(user);
                      }}
                      className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                      title="Delete admin account"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected User Details & Password Form */}
        <div className="lg:col-span-5 space-y-6">
          {selectedUser && (
            <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-6 space-y-6">
              <div>
                <span className="text-xs font-mono font-semibold text-amber-600 uppercase tracking-wider">
                  Admin Account Details
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-display mt-0.5">
                  {selectedUser.name}
                </h3>
                <div className="text-xs font-mono text-slate-500">
                  Username: <strong className="text-slate-700">{selectedUser.username}</strong> ({selectedUser.email})
                </div>
              </div>

              {/* Role & Specific Access Summary */}
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between font-mono font-bold text-slate-800">
                  <span>Assigned Tier:</span>
                  <span className="text-amber-700">{selectedUser.role}</span>
                </div>
                
                <div className="pt-2 border-t border-slate-200/60">
                  <span className="text-[11px] font-mono text-slate-500 block mb-1 font-semibold">
                    Authorized Module Access:
                  </span>
                  {selectedUser.role === 'Super Admin' ? (
                    <p className="text-[11px] text-emerald-700 font-mono">
                      ✓ Complete unrestricted administrative privilege across all 13 modules.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {(selectedUser.permissions || []).map((perm) => (
                        <span key={perm} className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                          ✓ {perm}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {isSuperAdmin && (
                  <button
                    type="button"
                    onClick={() => handleStartEditPermissions(selectedUser)}
                    className="w-full mt-2 text-xs font-mono text-amber-700 hover:text-amber-800 font-semibold text-center block pt-1 hover:underline"
                  >
                    Edit Specific Permissions for this Admin →
                  </button>
                )}
              </div>

              {/* Change Password Form */}
              <form onSubmit={handleUpdatePassword} className="space-y-4 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                  <span>Update Credentials for {selectedUser.name}</span>
                </h4>

                <div>
                  <label className="text-xs font-mono text-slate-600 block mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password (min 6 chars)"
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-600 block mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-industrial-primary text-xs w-full justify-center py-2"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Update Password</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
