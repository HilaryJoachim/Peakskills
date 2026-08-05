'use client'

import React, { useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { UploadCloud, Loader2, X, Image as ImageIcon } from 'lucide-react'

interface MediaUploaderProps {
  onUploadSuccess: (url: string) => void;
  folder?: string;
}

export default function MediaUploader({ onUploadSuccess, folder = 'general' }: MediaUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!supabase) {
      setError('Supabase client is not configured.')
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
      const filePath = `${folder}/${fileName}`

      const { data, error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath)

      onUploadSuccess(publicUrl)
    } catch (err: any) {
      console.error('Upload error:', err)
      setError(err.message || 'An error occurred during upload.')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <div className="media-uploader w-full">
      <div 
        className="border-2 border-dashed border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center text-center bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        {isUploading ? (
          <Loader2 className="animate-spin text-amber-500 mb-2" size={32} />
        ) : (
          <UploadCloud className="text-slate-400 mb-2" size={32} />
        )}
        <p className="text-sm text-slate-300 font-medium">
          {isUploading ? 'Uploading...' : 'Click to upload or drag and drop'}
        </p>
        <p className="text-xs text-slate-500 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
        
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleUpload}
          accept="image/*"
          className="hidden"
        />
      </div>
      
      {error && (
        <div className="mt-2 text-sm text-red-500 flex items-center gap-1">
          <X size={14} />
          {error}
        </div>
      )}
    </div>
  )
}
