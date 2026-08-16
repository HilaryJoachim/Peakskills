'use client'

import { useState } from 'react'
import { PartnershipService } from '@/lib/supabase'
import { addPartnershipService, updatePartnershipService, deletePartnershipService } from './actions'
import { Plus, Edit2, Trash2, X, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function PartnershipServiceManager({ initialServices }: { initialServices: PartnershipService[] }) {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    contact_name: '',
    whatsapp_number: '',
    category: '',
    key_features: ['']
  })

  const handleOpenModal = (service?: PartnershipService) => {
    if (service) {
      setFormData({
        title: service.title,
        description: service.description,
        image_url: service.image_url,
        contact_name: service.contact_name,
        whatsapp_number: service.whatsapp_number,
        category: service.category || '',
        key_features: service.key_features && service.key_features.length > 0 ? service.key_features : ['']
      })
      setEditingId(service.id)
    } else {
      setFormData({
        title: '',
        description: '',
        image_url: '',
        contact_name: '',
        whatsapp_number: '',
        category: '',
        key_features: ['']
      })
      setEditingId(null)
    }
    setError('')
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const cleanData = {
        ...formData,
        key_features: formData.key_features.filter(f => f.trim() !== '')
      }

      if (editingId) {
        await updatePartnershipService(editingId, cleanData)
      } else {
        await addPartnershipService(cleanData)
      }
      setIsModalOpen(false)
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return
    try {
      await deletePartnershipService(id)
      router.refresh()
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: '24px', fontWeight: 600, color: '#f8fafc', margin: 0 }}>
          Partnership Services
        </h1>
        <button
          onClick={() => handleOpenModal()}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: '#F59E0B', color: '#fff', border: 'none',
            padding: '10px 16px', borderRadius: '8px',
            fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600,
            cursor: 'pointer', transition: 'background 0.2s'
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#D97706' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#F59E0B' }}
        >
          <Plus size={18} />
          Add Service
        </button>
      </div>

      <div style={{
        background: '#1E293B',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.05)',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <th style={{ padding: '16px', color: '#94A3B8', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase' }}>Service</th>
              <th style={{ padding: '16px', color: '#94A3B8', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase' }}>Contact</th>
              <th style={{ padding: '16px', color: '#94A3B8', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase' }}>Date Added</th>
              <th style={{ padding: '16px', color: '#94A3B8', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {initialServices.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: '32px', textAlign: 'center', color: '#94A3B8' }}>
                  No services found. Click "Add Service" to create one.
                </td>
              </tr>
            ) : (
              initialServices.map(service => (
                <tr key={service.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '16px', color: '#F1F5F9', fontWeight: 500 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={service.image_url} alt="" style={{ width: '48px', height: '48px', borderRadius: '6px', objectFit: 'cover' }} />
                      <div>
                        {service.title}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px', color: '#CBD5E1' }}>
                    <div>{service.contact_name}</div>
                    <div style={{ fontSize: '12px', color: '#94A3B8' }}>{service.whatsapp_number}</div>
                  </td>
                  <td style={{ padding: '16px', color: '#94A3B8' }}>
                    {new Date(service.created_at).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    <button
                      onClick={() => handleOpenModal(service)}
                      style={{ background: 'transparent', border: 'none', color: '#60A5FA', cursor: 'pointer', padding: '6px' }}
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      style={{ background: 'transparent', border: 'none', color: '#F87171', cursor: 'pointer', padding: '6px' }}
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, padding: '24px'
        }}>
          <div style={{
            background: '#1E293B', width: '100%', maxWidth: '600px',
            borderRadius: '12px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
            maxHeight: '90vh', display: 'flex', flexDirection: 'column'
          }}>
            <div style={{
              padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <h2 style={{ margin: 0, color: '#fff', fontSize: '20px' }}>
                {editingId ? 'Edit Service' : 'Add New Service'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>
            </div>

            <div style={{ padding: '24px', overflowY: 'auto' }}>
              {error && (
                <div style={{
                  background: 'rgba(239, 68, 68, 0.1)', color: '#FCA5A5',
                  padding: '12px', borderRadius: '8px', marginBottom: '20px',
                  display: 'flex', gap: '8px', alignItems: 'center'
                }}>
                  <AlertCircle size={18} />
                  {error}
                </div>
              )}

              <form id="serviceForm" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', color: '#CBD5E1', marginBottom: '8px', fontSize: '14px' }}>Title</label>
                  <input
                    required
                    type="text"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: '6px',
                      background: '#0F172A', border: '1px solid rgba(255,255,255,0.1)',
                      color: '#fff', outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: '#CBD5E1', marginBottom: '8px', fontSize: '14px' }}>Description</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: '6px',
                      background: '#0F172A', border: '1px solid rgba(255,255,255,0.1)',
                      color: '#fff', outline: 'none', resize: 'vertical'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: '#CBD5E1', marginBottom: '8px', fontSize: '14px' }}>Image URL</label>
                  <input
                    required
                    type="url"
                    value={formData.image_url}
                    onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: '6px',
                      background: '#0F172A', border: '1px solid rgba(255,255,255,0.1)',
                      color: '#fff', outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: '#CBD5E1', marginBottom: '8px', fontSize: '14px' }}>Category (e.g. Hardware, Software)</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: '6px',
                      background: '#0F172A', border: '1px solid rgba(255,255,255,0.1)',
                      color: '#fff', outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: '#CBD5E1', marginBottom: '8px', fontSize: '14px' }}>Key Features (max 3)</label>
                  {formData.key_features.map((feature, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <input
                        type="text"
                        value={feature}
                        placeholder={`Feature ${idx + 1}`}
                        onChange={e => {
                          const newFeatures = [...formData.key_features]
                          newFeatures[idx] = e.target.value
                          setFormData({ ...formData, key_features: newFeatures })
                        }}
                        style={{
                          flex: 1, padding: '10px 12px', borderRadius: '6px',
                          background: '#0F172A', border: '1px solid rgba(255,255,255,0.1)',
                          color: '#fff', outline: 'none'
                        }}
                      />
                      {formData.key_features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newFeatures = formData.key_features.filter((_, i) => i !== idx)
                            setFormData({ ...formData, key_features: newFeatures })
                          }}
                          style={{
                            background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444',
                            border: 'none', padding: '0 12px', borderRadius: '6px', cursor: 'pointer'
                          }}
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  {formData.key_features.length < 3 && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, key_features: [...formData.key_features, ''] })}
                      style={{
                        background: 'transparent', color: '#60A5FA', border: 'none', cursor: 'pointer',
                        fontSize: '13px', marginTop: '4px'
                      }}
                    >
                      + Add Feature
                    </button>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: '#CBD5E1', marginBottom: '8px', fontSize: '14px' }}>Contact Name</label>
                    <input
                      required
                      type="text"
                      value={formData.contact_name}
                      onChange={e => setFormData({ ...formData, contact_name: e.target.value })}
                      style={{
                        width: '100%', padding: '10px 12px', borderRadius: '6px',
                        background: '#0F172A', border: '1px solid rgba(255,255,255,0.1)',
                        color: '#fff', outline: 'none'
                      }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', color: '#CBD5E1', marginBottom: '8px', fontSize: '14px' }}>WhatsApp Number</label>
                    <input
                      required
                      type="text"
                      value={formData.whatsapp_number}
                      onChange={e => setFormData({ ...formData, whatsapp_number: e.target.value })}
                      placeholder="+250..."
                      style={{
                        width: '100%', padding: '10px 12px', borderRadius: '6px',
                        background: '#0F172A', border: '1px solid rgba(255,255,255,0.1)',
                        color: '#fff', outline: 'none'
                      }}
                    />
                  </div>
                </div>
              </form>
            </div>

            <div style={{
              padding: '24px', borderTop: '1px solid rgba(255,255,255,0.1)',
              display: 'flex', justifyContent: 'flex-end', gap: '12px',
              background: '#0F172A', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px'
            }}>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{
                  padding: '10px 16px', borderRadius: '8px', background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)', color: '#CBD5E1', cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                form="serviceForm"
                disabled={isSubmitting}
                style={{
                  padding: '10px 24px', borderRadius: '8px', background: '#F59E0B',
                  border: 'none', color: '#fff', fontWeight: 600, cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1
                }}
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
