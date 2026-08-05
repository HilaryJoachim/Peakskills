'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import MediaUploader from '@/components/admin/MediaUploader'
import { Trash2, Copy, Check } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function MediaLibrary({ initialItems }: { initialItems: any[] }) {
  const router = useRouter()
  const [items, setItems] = useState(initialItems)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (url: string, name: string) => {
    navigator.clipboard.writeText(url)
    setCopiedId(name)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDelete = async (name: string) => {
    if (!confirm('Are you sure you want to delete this file? This may break images if they are used in programs or gallery.')) return
    
    if (supabase) {
      const { error } = await supabase.storage.from('media').remove([name])
      if (error) {
        alert(error.message)
      } else {
        setItems(items.filter(item => item.name !== name))
        router.refresh()
      }
    }
  }

  const handleUploadSuccess = () => {
    // Refresh the page to show new images
    router.refresh()
  }

  return (
    <div>
      <div className="mb-8">
        <MediaUploader folder="general" onUploadSuccess={handleUploadSuccess} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.map(item => (
          <div key={item.name} className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 group relative">
            <div className="aspect-square bg-slate-900 flex items-center justify-center p-2">
              {item.url.match(/\.(jpeg|jpg|gif|png|svg|webp)$/i) ? (
                <img src={item.url} alt={item.name} className="max-w-full max-h-full object-contain" />
              ) : (
                <div className="text-slate-500 break-all text-xs text-center p-2">{item.name}</div>
              )}
            </div>
            
            <div className="p-2 border-t border-slate-700 bg-slate-800/80">
              <div className="text-xs text-slate-400 truncate" title={item.name}>{item.name.split('/').pop()}</div>
            </div>

            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => handleCopy(item.url, item.name)} 
                className="p-2 bg-slate-900/80 text-white rounded hover:bg-amber-500 hover:text-slate-900 transition-colors"
                title="Copy URL"
              >
                {copiedId === item.name ? <Check size={16} /> : <Copy size={16} />}
              </button>
              <button 
                onClick={() => handleDelete(item.name)} 
                className="p-2 bg-slate-900/80 text-white rounded hover:bg-red-500 transition-colors"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500">
            No media files found.
          </div>
        )}
      </div>
    </div>
  )
}
