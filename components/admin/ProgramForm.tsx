'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { upsertProgram, deleteProgram } from '@/app/admin/cms/actions'
import RichTextEditor from './RichTextEditor'
import MediaUploader from './MediaUploader'
import { Program, Category } from '@/lib/supabase'

interface ProgramFormProps {
  program?: Program | null;
  categories: Category[];
}

export default function ProgramForm({ program, categories }: ProgramFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [title, setTitle] = useState(program?.title || '')
  const [slug, setSlug] = useState(program?.slug || '')
  const [categoryId, setCategoryId] = useState(program?.category_id || '')
  const [shortDesc, setShortDesc] = useState(program?.short_description || '')
  const [overview, setOverview] = useState(program?.overview || '')
  const [audience, setAudience] = useState(program?.target_audience || '')
  const [duration, setDuration] = useState(program?.duration_days?.toString() || '3')
  const [format, setFormat] = useState(program?.format || 'in-person')
  const [priceType, setPriceType] = useState(program?.price_type || 'paid')
  const [price, setPrice] = useState(program?.price_per_person?.toString() || '')
  const [heroImage, setHeroImage] = useState(program?.hero_image_url || '')
  const [cardImage, setCardImage] = useState(program?.card_image_url || '')
  const [isFeatured, setIsFeatured] = useState(program?.is_featured || false)
  const [outcomes, setOutcomes] = useState(program?.learning_outcomes?.join('\n') || '')

  const generateSlug = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    if (!program) setSlug(generateSlug(e.target.value))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData()
    if (program?.id) formData.append('id', program.id)
    formData.append('title', title)
    formData.append('slug', slug)
    formData.append('category_id', categoryId)
    formData.append('short_description', shortDesc)
    formData.append('overview', overview)
    formData.append('target_audience', audience)
    formData.append('duration_days', duration)
    formData.append('format', format)
    formData.append('price_type', priceType)
    if (price) formData.append('price_per_person', price)
    formData.append('hero_image_url', heroImage)
    formData.append('card_image_url', cardImage)
    formData.append('is_featured', isFeatured ? 'true' : 'false')
    
    const outcomesArray = outcomes.split('\n').filter(o => o.trim() !== '')
    formData.append('learning_outcomes', JSON.stringify(outcomesArray))

    const res = await upsertProgram(formData)
    setIsSubmitting(false)

    if (res.error) {
      setError(res.error)
    } else {
      router.push('/admin/cms/programs')
      router.refresh()
    }
  }

  const handleDelete = async () => {
    if (!program || !confirm('Are you sure you want to delete this program?')) return
    setIsSubmitting(true)
    const res = await deleteProgram(program.id)
    if (res.error) {
      setError(res.error)
      setIsSubmitting(false)
    } else {
      router.push('/admin/cms/programs')
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {error && <div className="p-4 bg-red-900/50 text-red-200 border border-red-800 rounded-lg">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
          <input 
            type="text" 
            required 
            value={title} 
            onChange={handleTitleChange}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Slug</label>
          <input 
            type="text" 
            required 
            value={slug} 
            onChange={(e) => setSlug(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
          <select 
            value={categoryId} 
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center mt-8">
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-amber-500 focus:ring-amber-500"
            />
            <span className="text-slate-300 font-medium">Featured Program</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Short Description</label>
        <textarea 
          value={shortDesc} 
          onChange={(e) => setShortDesc(e.target.value)}
          rows={3}
          className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Full Overview (Rich Text)</label>
        <RichTextEditor value={overview} onChange={setOverview} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Target Audience</label>
          <input 
            type="text" 
            value={audience} 
            onChange={(e) => setAudience(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Duration (Days)</label>
          <input 
            type="number" 
            value={duration} 
            onChange={(e) => setDuration(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Format</label>
          <select 
            value={format} 
            onChange={(e) => setFormat(e.target.value as 'in-person' | 'online' | 'hybrid')}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
          >
            <option value="in-person">In Person</option>
            <option value="online">Online</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-300 mb-2">Price Type</label>
            <select 
              value={priceType} 
              onChange={(e) => setPriceType(e.target.value as 'paid' | 'free')}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="paid">Paid</option>
              <option value="free">Free</option>
            </select>
          </div>
          {priceType === 'paid' && (
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-300 mb-2">Price (TZS)</label>
              <input 
                type="number" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Learning Outcomes (One per line)</label>
        <textarea 
          value={outcomes} 
          onChange={(e) => setOutcomes(e.target.value)}
          rows={5}
          placeholder="Understand concept A&#10;Apply skill B&#10;Analyze scenario C"
          className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-800/30 rounded-xl border border-slate-700">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Hero Image URL</label>
          <div className="flex flex-col gap-2">
            <input 
              type="text" 
              value={heroImage} 
              onChange={(e) => setHeroImage(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
              placeholder="https://..."
            />
            <div className="text-xs text-slate-400 my-1">OR UPLOAD NEW</div>
            <MediaUploader folder="programs" onUploadSuccess={(url) => setHeroImage(url)} />
          </div>
          {heroImage && (
            <div className="mt-4">
              <img src={heroImage} alt="Hero preview" className="w-full h-32 object-cover rounded border border-slate-700" />
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Card Image URL</label>
          <div className="flex flex-col gap-2">
            <input 
              type="text" 
              value={cardImage} 
              onChange={(e) => setCardImage(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
              placeholder="https://..."
            />
            <div className="text-xs text-slate-400 my-1">OR UPLOAD NEW</div>
            <MediaUploader folder="programs" onUploadSuccess={(url) => setCardImage(url)} />
          </div>
          {cardImage && (
            <div className="mt-4">
              <img src={cardImage} alt="Card preview" className="w-full h-32 object-cover rounded border border-slate-700" />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t border-slate-700">
        {program ? (
          <button 
            type="button" 
            onClick={handleDelete}
            disabled={isSubmitting}
            className="px-6 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            Delete Program
          </button>
        ) : <div />}
        
        <div className="flex gap-4">
          <button 
            type="button" 
            onClick={() => router.push('/admin/cms/programs')}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-lg font-semibold transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : (program ? 'Update Program' : 'Create Program')}
          </button>
        </div>
      </div>
    </form>
  )
}
