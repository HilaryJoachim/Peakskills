'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateCompanySettings } from '@/app/admin/cms/actions'

export default function CompanySettingsForm({ initialData }: { initialData: any }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [companyName, setCompanyName] = useState(initialData.company_name || '')
  const [description, setDescription] = useState(initialData.description || '')
  const [phones, setPhones] = useState((initialData.phone_numbers || []).join('\n'))
  const [emails, setEmails] = useState((initialData.email_addresses || []).join('\n'))
  const [address, setAddress] = useState(initialData.office_address || '')
  const [whatsapp, setWhatsapp] = useState(initialData.whatsapp_number || '')
  const [mapsLocation, setMapsLocation] = useState(initialData.google_maps_location || '')
  
  // Socials
  const [facebook, setFacebook] = useState(initialData.social_media_links?.facebook || '')
  const [twitter, setTwitter] = useState(initialData.social_media_links?.twitter || '')
  const [linkedin, setLinkedin] = useState(initialData.social_media_links?.linkedin || '')
  const [instagram, setInstagram] = useState(initialData.social_media_links?.instagram || '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(false)

    const formData = new FormData()
    if (initialData.id) formData.append('id', initialData.id)
    
    formData.append('company_name', companyName)
    formData.append('description', description)
    formData.append('phone_numbers', JSON.stringify(phones.split('\n').filter((p: string) => p.trim() !== '')))
    formData.append('email_addresses', JSON.stringify(emails.split('\n').filter((p: string) => p.trim() !== '')))
    formData.append('office_address', address)
    formData.append('whatsapp_number', whatsapp)
    formData.append('google_maps_location', mapsLocation)
    formData.append('social_media_links', JSON.stringify({ facebook, twitter, linkedin, instagram }))

    const res = await updateCompanySettings(formData)
    setIsSubmitting(false)

    if (res.error) {
      setError(res.error)
    } else {
      setSuccess(true)
      router.refresh()
      setTimeout(() => setSuccess(false), 3000)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="p-4 bg-red-900/50 text-red-200 border border-red-800 rounded-lg">{error}</div>}
      {success && <div className="p-4 bg-emerald-900/50 text-emerald-200 border border-emerald-800 rounded-lg">Settings saved successfully.</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Company Name</label>
          <input 
            type="text" 
            value={companyName} 
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">WhatsApp Number</label>
          <input 
            type="text" 
            value={whatsapp} 
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="+255..."
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Company Description</label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Phone Numbers (One per line)</label>
          <textarea 
            value={phones} 
            onChange={(e) => setPhones(e.target.value)}
            rows={3}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Email Addresses (One per line)</label>
          <textarea 
            value={emails} 
            onChange={(e) => setEmails(e.target.value)}
            rows={3}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Office Address</label>
        <input 
          type="text" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)}
          className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
        />
      </div>

      <div className="pt-6 border-t border-slate-700">
        <h3 className="text-lg font-semibold text-slate-200 mb-4">Social Media Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">LinkedIn</label>
            <input type="url" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-amber-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Twitter (X)</label>
            <input type="url" value={twitter} onChange={(e) => setTwitter(e.target.value)} className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-amber-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Facebook</label>
            <input type="url" value={facebook} onChange={(e) => setFacebook(e.target.value)} className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-amber-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Instagram</label>
            <input type="url" value={instagram} onChange={(e) => setInstagram(e.target.value)} className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-amber-500" />
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-700">
        <label className="block text-sm font-medium text-slate-300 mb-2">Google Maps Embed iframe URL</label>
        <textarea 
          value={mapsLocation} 
          onChange={(e) => setMapsLocation(e.target.value)}
          rows={3}
          placeholder="<iframe src='...' />"
          className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
        />
      </div>

      <div className="flex justify-end pt-4">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-lg font-semibold transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </form>
  )
}
