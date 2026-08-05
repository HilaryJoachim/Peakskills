import { supabaseAdmin } from '@/lib/supabaseAdmin'
import CompanySettingsForm from './CompanySettingsForm'

export const metadata = {
  title: 'Company Info | PeakSkills Admin',
}

export default async function CompanyCMSPage() {
  // Fetch settings using admin client to bypass RLS if needed, or if public read is on, we just get it.
  const { data, error } = await supabaseAdmin
    .from('company_settings')
    .select('*')
    .limit(1)
    .single()

  // Default empty object if no row exists yet (though migration inserts one)
  const settings = data || {
    company_name: 'PeakSkills',
    description: '',
    phone_numbers: [],
    email_addresses: [],
    office_address: '',
    whatsapp_number: '',
    social_media_links: {},
    google_maps_location: ''
  }

  return (
    <div className="cms-company-info max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-100">Company Information</h1>
        <p className="text-slate-400 mt-1">Manage global contact details, addresses, and social links.</p>
      </div>

      <div className="bg-slate-800/40 rounded-xl border border-slate-700 p-8">
        <CompanySettingsForm initialData={settings} />
      </div>
    </div>
  )
}
