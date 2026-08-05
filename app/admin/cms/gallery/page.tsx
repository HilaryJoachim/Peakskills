import { supabaseAdmin } from '@/lib/supabaseAdmin'
import GalleryGrid from './GalleryGrid'

export const metadata = {
  title: 'Gallery CMS | PeakSkills Admin',
}

export default async function GalleryCMSPage() {
  const { data: galleryItems, error } = await supabaseAdmin
    .from('gallery_items')
    .select('*')
    .order('event_date', { ascending: false })

  return (
    <div className="cms-gallery">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-100">Gallery & Events</h1>
        <p className="text-slate-400 mt-1">Manage images from past events and training sessions.</p>
      </div>

      <div className="bg-slate-800/40 rounded-xl border border-slate-700 p-8">
        <GalleryGrid initialItems={galleryItems || []} />
      </div>
    </div>
  )
}
