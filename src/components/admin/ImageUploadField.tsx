import React, { useRef, useState } from 'react';
import { Upload, Link2, X, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  helperText?: string;
  required?: boolean;
  aspectRatio?: 'video' | 'square' | 'wide' | 'auto';
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  helperText,
  required = false,
  aspectRatio = 'auto',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'link'>(value?.startsWith('data:') ? 'upload' : 'upload');
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<string>('');
  const [error, setError] = useState<string>('');

  const processFile = (file: File) => {
    setError('');
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, WEBP, SVG).');
      return;
    }

    // Limit to 5MB
    if (file.size > 5 * 1024 * 1024) {
      setError('Image file size should be less than 5MB.');
      return;
    }

    setFileName(file.name);
    setFileSize((file.size / 1024).toFixed(1) + ' KB');

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onChange(e.target.result as string);
      }
    };
    reader.onerror = () => {
      setError('Failed to read image file from device.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleClear = () => {
    onChange('');
    setFileName('');
    setFileSize('');
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'video':
        return 'aspect-video';
      case 'square':
        return 'aspect-square max-w-[160px]';
      case 'wide':
        return 'aspect-[21/9]';
      default:
        return 'h-32';
    }
  };

  const isDeviceUpload = value?.startsWith('data:image/');

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono font-semibold text-slate-700 block">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
        
        {/* Toggle options between Upload Photo & Paste Link */}
        <div className="flex items-center rounded bg-slate-100 p-0.5 border border-slate-200 text-[11px] font-mono">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-2 py-0.5 rounded transition-all cursor-pointer flex items-center gap-1 ${
              activeTab === 'upload'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Upload className="w-3 h-3" />
            <span>Upload Photo</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('link')}
            className={`px-2 py-0.5 rounded transition-all cursor-pointer flex items-center gap-1 ${
              activeTab === 'link'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Link2 className="w-3 h-3" />
            <span>Paste Link</span>
          </button>
        </div>
      </div>

      {/* Main Input Area */}
      <div className="space-y-3">
        {activeTab === 'upload' ? (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
              dragActive
                ? 'border-amber-500 bg-amber-50/50'
                : 'border-slate-200 hover:border-slate-300 bg-slate-50/60'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            
            <div className="flex flex-col items-center justify-center gap-1.5 py-1">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                <Upload className="w-4 h-4" />
              </div>
              <div className="text-xs font-semibold text-slate-800">
                Click to choose photo from computer, or drag and drop
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Supports PNG, JPG, WEBP, SVG (Max 5MB)
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-1.5">
            <div className="relative">
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="https://example.com/image.jpg or /src/assets/..."
                className="w-full px-3 py-2 text-xs rounded border border-slate-200 font-mono pr-8 focus:outline-hidden focus:border-amber-500"
              />
              {value && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-1.5 text-rose-600 text-xs font-mono">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Live Preview Bar */}
        {value ? (
          <div className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-lg border border-slate-200">
            <div className={`w-16 h-14 rounded overflow-hidden bg-slate-200 border border-slate-300 shrink-0 relative flex items-center justify-center`}>
              <img
                src={value}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-800 truncate">
                  {fileName || (isDeviceUpload ? 'Uploaded from Device' : 'Photo Linked')}
                </span>
              </div>
              <div className="text-[11px] font-mono text-slate-500 truncate mt-0.5">
                {fileSize ? `File size: ${fileSize}` : (value.length > 50 ? value.substring(0, 48) + '...' : value)}
              </div>
            </div>

            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors text-xs font-mono flex items-center gap-1"
              title="Remove photo"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline text-[11px]">Remove</span>
            </button>
          </div>
        ) : null}

        {helperText && (
          <p className="text-[11px] text-slate-500 font-mono">{helperText}</p>
        )}
      </div>
    </div>
  );
};
