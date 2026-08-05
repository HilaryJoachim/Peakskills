import { supabaseAdmin } from '@/lib/supabaseAdmin'
import MediaLibrary from './MediaLibrary'

export const metadata = {
  title: 'Media Library | PeakSkills Admin',
}

export default async function MediaCMSPage() {
  // Fetch lists of files from our media bucket
  // Note: in a real app you might do this via client-side or server actions dynamically 
  // if it gets very large. Here we'll do an initial load server-side for simplicity.
  async function listAllFiles(path: string = ''): Promise<any[]> {
    const { data, error } = await supabaseAdmin
      .storage
      .from('media')
      .list(path, { limit: 100 })

    if (error || !data) return []
    
    let allFiles: any[] = []
    for (const item of data) {
      if (item.name === '.emptyFolderPlaceholder') continue
      
      // If id is null, it's a folder
      if (item.id === null) {
        const subFiles = await listAllFiles(path ? `${path}/${item.name}` : item.name)
        allFiles = [...allFiles, ...subFiles]
      } else {
        const fullPath = path ? `${path}/${item.name}` : item.name
        const { data: urlData } = supabaseAdmin.storage.from('media').getPublicUrl(fullPath)
        allFiles.push({
          name: fullPath,
          url: urlData.publicUrl,
          created_at: item.created_at,
          metadata: item.metadata
        })
      }
    }
    return allFiles
  }

  const items = await listAllFiles('')
  items.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  return (
    <div className="cms-media">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-100">Media Library</h1>
        <p className="text-slate-400 mt-1">Browse and manage images uploaded to the website.</p>
      </div>

      <div className="bg-slate-800/40 rounded-xl border border-slate-700 p-8">
        <MediaLibrary initialItems={items} />
      </div>
    </div>
  )
}
