import React, { useState } from 'react';
import { Upload, X, Eye, Video, Image as ImageIcon } from 'lucide-react';
import { api } from '../services/api';


interface CMSMediaUploaderProps {
  label: string;
  field: string;
  value: string;
  setter: React.Dispatch<React.SetStateAction<any>>;
  accept?: string;
  onUploadStart: () => void;
  onUploadEnd: () => void;
}

export const CMSMediaUploader: React.FC<CMSMediaUploaderProps> = ({
  label,
  field,
  value,
  setter,
  accept = "image/*,video/*",
  onUploadStart,
  onUploadEnd
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    onUploadStart();
    try {
      const res = await api.uploadMedia(file);
      setter((prev: any) => ({ ...prev, [field]: res.url }));
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setIsUploading(false);
      onUploadEnd();
    }
  };

  const handleRemove = () => {
    setter((prev: any) => ({ ...prev, [field]: '' }));
  };

  return (
    <div className="space-y-1">
      <label className="block text-slate-300 font-semibold text-xs mb-1">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="file"
          accept={accept}
          onChange={handleUpload}
          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-cyan-500 file:text-slate-950 file:font-bold file:text-[10px]"
          disabled={isUploading}
        />
        {value && (
            <button onClick={handleRemove} className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-rose-400 hover:bg-rose-950">
                <X className="w-4 h-4"/>
            </button>
        )}
      </div>
      {value && (
        <div className="mt-2 p-2 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span className="text-[10px] text-slate-400 truncate max-w-[200px]">{value}</span>
            <a href={value} target="_blank" rel="noopener noreferrer" className="text-cyan-400">
                <Eye className="w-4 h-4"/>
            </a>
        </div>
      )}
    </div>
  );
};
