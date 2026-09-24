import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Database, Download, UploadCloud, RefreshCw, CheckCircle2, AlertTriangle } from 'lucide-react';

export const AdminBackup: React.FC = () => {
  const { store } = useData();
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleExport = () => {
    const jsonStr = store.exportJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `art_industrial_db_backup_${new Date().toISOString().substring(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const success = store.importJSON(content);
          if (success) {
            setImportStatus('Database successfully restored from backup file!');
            setTimeout(() => setImportStatus(null), 4000);
          } else {
            alert('Invalid backup file structure.');
          }
        } catch {
          alert('Failed to parse backup JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleReset = () => {
    const confirmed = confirm(
      'WARNING: This will reset all banners, categories, products, documents, settings, and inquiries back to original factory seed data. Are you sure you want to proceed?'
    );
    if (confirmed) {
      store.resetToDefaults();
      alert('Database has been reset to factory seed data.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-lg border border-slate-200 shadow-xs">
        <div>
          <span className="text-xs font-mono font-semibold text-amber-600 uppercase tracking-wider">
            Data Preservation & Portability
          </span>
          <h1 className="text-2xl font-display font-extrabold text-slate-900 mt-1">
            Database Backup & Migration
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Export complete SQLite/JSON dumps, restore backups, or reset to initial commercial seed catalog.
          </p>
        </div>
      </div>

      {importStatus && (
        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{importStatus}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Export */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded bg-slate-100 text-slate-900 flex items-center justify-center">
              <Download className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 font-display">
              Export Database Snapshot
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Downloads a full JSON backup including all site settings, 13 categories, products with specifications, services, documents, and customer RFQs.
            </p>
          </div>

          <button
            onClick={handleExport}
            className="btn-industrial-primary text-xs justify-center py-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Backup (.json)</span>
          </button>
        </div>

        {/* Card 2: Import */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded bg-slate-100 text-slate-900 flex items-center justify-center">
              <UploadCloud className="w-5 h-5 text-sky-600" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 font-display">
              Restore from Backup
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Upload a previously exported database file to restore categories, products, and configuration instantly.
            </p>
          </div>

          <div>
            <input
              type="file"
              id="import-db-file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />
            <label
              htmlFor="import-db-file"
              className="btn-industrial-outline text-xs justify-center py-2 w-full cursor-pointer flex items-center gap-1.5"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Choose Backup File</span>
            </label>
          </div>
        </div>

        {/* Card 3: Reset */}
        <div className="bg-white p-6 rounded-lg border border-rose-200 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded bg-rose-50 text-rose-600 flex items-center justify-center">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-rose-900 font-display">
              Factory Seed Reset
            </h3>
            <p className="text-xs text-rose-700/80 leading-relaxed">
              Re-populates the database with default industrial data: 13 categories, verified Bearings, Valves, Electrodes, 7 services, and legal docs.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="btn-industrial-outline text-xs text-rose-700 border-rose-300 hover:bg-rose-50 justify-center py-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset to Factory Defaults</span>
          </button>
        </div>
      </div>
    </div>
  );
};
