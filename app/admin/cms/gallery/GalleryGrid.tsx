'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { upsertGalleryItem, deleteGalleryItem } from '@/app/admin/cms/actions'
import MediaUploader from '@/components/admin/MediaUploader'
import { Trash2, Edit, Plus, X } from 'lucide-react'

export default function GalleryGrid({ initialItems }: { initialItems: any[] }) {
  const router = useRouter()
  const [items, setItems] = useState(initialItems)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)

  const [eventTitle, setEventTitle] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [location, setLocation] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [tag, setTag] = useState('EVENT')
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  const openModal = (item?: any) => {
    if (item) {
      setEditingItem(item)
      setEventTitle(item.event_title)
      setEventDate(item.event_date || '')
      setLocation(item.location || '')
      setImageUrl(item.image_url)
      setTag(item.tag || 'EVENT')
    } else {
      setEditingItem(null)
      setEventTitle('')
      setEventDate('')
      setLocation('')
      setImageUrl('')
      setTag('EVENT')
    }
    setIsModalOpen(true)
  }

  const closeModal = () => setIsModalOpen(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData()
    if (editingItem?.id) formData.append('id', editingItem.id)
    formData.append('event_title', eventTitle)
    formData.append('event_date', eventDate)
    formData.append('location', location)
    formData.append('image_url', imageUrl)
    formData.append('tag', tag)

    const res = await upsertGalleryItem(formData)
    setIsSubmitting(false)

    if (!res.error) {
      closeModal()
      router.refresh()
    } else {
      alert(res.error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) return
    const res = await deleteGalleryItem(id)
    if (!res.error) {
      setItems(items.filter(item => item.id !== id))
      router.refresh()
    } else {
      alert(res.error)
    }
  }

  return (
    <div>
      <div className="flex justify-end mb-6">
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          <Plus size={18} />
          Add Image
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map(item => (
          <div key={item.id} className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 group relative">
            <img src={item.image_url} alt={item.event_title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-slate-200 font-semibold truncate" title={item.event_title}>{item.event_title}</h3>
              <p className="text-slate-400 text-xs mt-1">{item.event_date || 'No date'} • {item.location || 'No location'}</p>
            </div>
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => openModal(item)} className="p-2 bg-slate-900/80 text-white rounded hover:bg-amber-500 hover:text-slate-900 transition-colors">
                <Edit size={16} />
              </button>
              <button onClick={() => handleDelete(item.id)} className="p-2 bg-slate-900/80 text-white rounded hover:bg-red-500 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500">
            No gallery items found.
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-slate-700">
              <h3 className="text-lg font-semibold text-slate-100">
                {editingItem ? 'Edit Gallery Item' : 'Add Gallery Item'}
              </h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Event Title</label>
                <input required type="text" value={eventTitle} onChange={e => setEventTitle(e.target.value)} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Event Date</label>
                  <input type="date" value={eventDate} onChange={e => setEventDate(e.target.value)} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Location</label>
                  <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Tag</label>
                <input required type="text" value={tag} onChange={e => setTag(e.target.value)} placeholder="e.g. EVENT, GRADUATION, WORKSHOP" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Image URL</label>
                <input required type="url" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500" />
                <div className="my-3 text-center text-xs text-slate-500">OR UPLOAD NEW</div>
                <MediaUploader folder="gallery" onUploadSuccess={(url) => setImageUrl(url)} />
              </div>

              {imageUrl && (
                <img src={imageUrl} alt="Preview" className="w-full h-32 object-cover rounded-lg mt-2 border border-slate-700" />
              )}

              <div className="flex justify-end pt-4 gap-3">
                <button type="button" onClick={closeModal} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold rounded-lg transition-colors disabled:opacity-50">
                  {isSubmitting ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
