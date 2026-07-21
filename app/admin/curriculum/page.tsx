'use client'

import { useEffect, useState } from 'react'
import { getProgramsForDropdown, getCurriculum, createModule, deleteModule, createMaterial, deleteMaterial, createAssignment, deleteAssignment } from './actions'
import { Plus, Link as LinkIcon, FileText, Trash2, X, ChevronDown, ChevronUp } from 'lucide-react'

export default function CurriculumPage() {
  const [programs, setPrograms] = useState<any[]>([])
  const [selectedProgram, setSelectedProgram] = useState<string>('')
  const [modules, setModules] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  
  // Modal states
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false)
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null)
  
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false)
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false)
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Forms
  const [moduleForm, setModuleForm] = useState({ title: '', description: '' })
  const [materialForm, setMaterialForm] = useState({ title: '', url: '', type: 'Link' })
  const [assignmentForm, setAssignmentForm] = useState({ title: '', description: '' })

  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({})

  useEffect(() => {
    getProgramsForDropdown().then(setPrograms)
  }, [])

  useEffect(() => {
    if (selectedProgram) {
      loadCurriculum()
    } else {
      setModules([])
    }
  }, [selectedProgram])

  async function loadCurriculum() {
    setIsLoading(true)
    const data = await getCurriculum(selectedProgram)
    setModules(data)
    
    // Auto expand all on load
    const expandState: Record<string, boolean> = {}
    data.forEach((m: any) => expandState[m.id] = true)
    setExpandedModules(expandState)
    
    setIsLoading(false)
  }

  const toggleModule = (id: string) => {
    setExpandedModules(prev => ({ ...prev, [id]: !prev[id] }))
  }

  // Submit Handlers
  const handleCreateModule = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await createModule(selectedProgram, moduleForm.title, moduleForm.description)
      setIsModuleModalOpen(false)
      setModuleForm({ title: '', description: '' })
      await loadCurriculum()
    } finally { setIsSubmitting(false) }
  }

  const handleCreateMaterial = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!activeModuleId) return
    setIsSubmitting(true)
    try {
      await createMaterial(activeModuleId, materialForm.title, materialForm.url, materialForm.type)
      setIsMaterialModalOpen(false)
      setMaterialForm({ title: '', url: '', type: 'Link' })
      await loadCurriculum()
    } finally { setIsSubmitting(false) }
  }

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!activeModuleId) return
    setIsSubmitting(true)
    try {
      await createAssignment(activeModuleId, assignmentForm.title, assignmentForm.description)
      setIsAssignmentModalOpen(false)
      setAssignmentForm({ title: '', description: '' })
      await loadCurriculum()
    } finally { setIsSubmitting(false) }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1000px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '24px', color: '#F8FAFC', margin: '0 0 8px' }}>
            Curriculum Builder
          </h2>
          <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '15px', color: '#94A3B8', margin: 0 }}>
            Create modules, upload Google links for materials, and assign tasks.
          </p>
        </div>
      </div>

      {/* Program Selector */}
      <div style={{ background: 'rgba(255, 255, 255, 0.04)', backdropFilter: 'blur(12px)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#F8FAFC', marginBottom: '8px' }}>Select Program to Edit</label>
        <select 
          value={selectedProgram} 
          onChange={e => setSelectedProgram(e.target.value)}
          style={{ width: '100%', maxWidth: '400px', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '14px', outline: 'none', background: 'rgba(0,0,0,0.2)', color: '#F8FAFC' }}
        >
          <option value="">-- Choose Program --</option>
          {programs.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
        </select>
      </div>

      {/* Modules List */}
      {selectedProgram && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#F8FAFC', margin: 0 }}>Modules</h3>
            <button 
              onClick={() => setIsModuleModalOpen(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '8px', background: 'linear-gradient(135deg, #0FAFAF, #0C8C8C)', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 600, color: '#fff', boxShadow: '0 4px 12px rgba(15, 175, 175, 0.2)' }}
            >
              <Plus size={16} /> Add Module
            </button>
          </div>

          {isLoading ? (
            <div style={{ textAlign: 'center', color: '#94A3B8', padding: '40px' }}>Loading curriculum...</div>
          ) : modules.length === 0 ? (
            <div style={{ background: 'rgba(255, 255, 255, 0.015)', borderRadius: '24px', border: '1px dashed rgba(255,255,255,0.1)', padding: '40px', textAlign: 'center', color: '#64748B' }}>
              <p style={{ margin: 0 }}>Select a program to view its modules, or create a new program.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {modules.map((module, index) => (
                <div key={module.id} style={{ background: 'rgba(255, 255, 255, 0.04)', backdropFilter: 'blur(12px)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                  
                  {/* Module Header */}
                  <div 
                    onClick={() => toggleModule(module.id)}
                    style={{ padding: '20px 24px', background: 'rgba(0,0,0,0.2)', borderBottom: expandedModules[module.id] ? '1px solid rgba(255,255,255,0.05)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #0FAFAF, #0C8C8C)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '14px' }}>
                        {index + 1}
                      </div>
                      <div>
                        <h4 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 600, color: '#F8FAFC' }}>{module.title}</h4>
                        {module.description && <p style={{ margin: 0, fontSize: '13px', color: '#94A3B8' }}>{module.description}</p>}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <button 
                        onClick={(e) => { e.stopPropagation(); if (confirm('Delete this module?')) { deleteModule(module.id); loadCurriculum(); } }}
                        style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}
                      >
                        <Trash2 size={16} />
                      </button>
                      {expandedModules[module.id] ? <ChevronUp size={20} color="#94A3B8" /> : <ChevronDown size={20} color="#94A3B8" />}
                    </div>
                  </div>

                  {/* Module Content */}
                  {expandedModules[module.id] && (
                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                      
                      {/* Materials Section */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <h5 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <LinkIcon size={14} /> Course Materials
                          </h5>
                          <button 
                            onClick={() => { setActiveModuleId(module.id); setIsMaterialModalOpen(true); }}
                            style={{ background: 'none', border: 'none', color: '#60A5FA', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                          >
                            + Add Material
                          </button>
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {module.course_materials?.length === 0 && <span style={{ fontSize: '13px', color: '#64748B' }}>No materials added.</span>}
                          {module.course_materials?.map((mat: any) => (
                            <div key={mat.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                              <div>
                                <div style={{ fontSize: '14px', fontWeight: 500, color: '#F8FAFC' }}>{mat.title} <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px', marginLeft: '8px' }}>{mat.type}</span></div>
                                <a href={mat.url} target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: '#60A5FA', textDecoration: 'none', wordBreak: 'break-all' }}>{mat.url}</a>
                              </div>
                              <button onClick={() => { if (confirm('Delete material?')) { deleteMaterial(mat.id); loadCurriculum(); } }} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}><Trash2 size={14} /></button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }} />

                      {/* Assignments Section */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <h5 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FileText size={14} /> Assignments & Tasks
                          </h5>
                          <button 
                            onClick={() => { setActiveModuleId(module.id); setIsAssignmentModalOpen(true); }}
                            style={{ background: 'none', border: 'none', color: '#60A5FA', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                          >
                            + Add Assignment
                          </button>
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {module.assignments?.length === 0 && <span style={{ fontSize: '13px', color: '#64748B' }}>No assignments added.</span>}
                          {module.assignments?.map((ass: any) => (
                            <div key={ass.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                              <div>
                                <div style={{ fontSize: '14px', fontWeight: 500, color: '#F8FAFC' }}>{ass.title}</div>
                                <div style={{ fontSize: '13px', color: '#94A3B8', marginTop: '4px' }}>{ass.description}</div>
                              </div>
                              <button onClick={() => { if (confirm('Delete assignment?')) { deleteAssignment(ass.id); loadCurriculum(); } }} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}><Trash2 size={14} /></button>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* --- MODALS --- */}

      {/* Create Module Modal */}
      {isModuleModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '400px', background: '#0F172A', borderRadius: '16px', padding: '24px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#F8FAFC' }}>New Module</h3>
              <button onClick={() => setIsModuleModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleCreateModule} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#94A3B8', marginBottom: '6px', display: 'block' }}>Module Title</label>
                <input required type="text" value={moduleForm.title} onChange={e => setModuleForm({...moduleForm, title: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#F8FAFC', outline: 'none' }} placeholder="e.g. Week 1: Basics" />
              </div>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#94A3B8', marginBottom: '6px', display: 'block' }}>Description (Optional)</label>
                <textarea value={moduleForm.description} onChange={e => setModuleForm({...moduleForm, description: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#F8FAFC', outline: 'none', minHeight: '80px' }} placeholder="What will they learn?" />
              </div>
              <button type="submit" disabled={isSubmitting} style={{ padding: '12px', borderRadius: '8px', background: 'linear-gradient(135deg, #0FAFAF, #0C8C8C)', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer', marginTop: '8px' }}>
                {isSubmitting ? 'Saving...' : 'Create Module'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Create Material Modal */}
      {isMaterialModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '400px', background: '#0F172A', borderRadius: '16px', padding: '24px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#F8FAFC' }}>Add Course Material</h3>
              <button onClick={() => setIsMaterialModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleCreateMaterial} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#94A3B8', marginBottom: '6px', display: 'block' }}>Title</label>
                <input required type="text" value={materialForm.title} onChange={e => setMaterialForm({...materialForm, title: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#F8FAFC', outline: 'none' }} placeholder="e.g. Slides: Intro to Leadership" />
              </div>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#94A3B8', marginBottom: '6px', display: 'block' }}>URL (Google Drive, YouTube, etc)</label>
                <input required type="url" value={materialForm.url} onChange={e => setMaterialForm({...materialForm, url: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#F8FAFC', outline: 'none' }} placeholder="https://..." />
              </div>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#94A3B8', marginBottom: '6px', display: 'block' }}>Type</label>
                <select value={materialForm.type} onChange={e => setMaterialForm({...materialForm, type: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#F8FAFC', outline: 'none' }}>
                  <option value="Link">Link</option>
                  <option value="PDF">PDF</option>
                  <option value="Video">Video</option>
                  <option value="Document">Document</option>
                </select>
              </div>
              <button type="submit" disabled={isSubmitting} style={{ padding: '12px', borderRadius: '8px', background: 'linear-gradient(135deg, #0FAFAF, #0C8C8C)', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer', marginTop: '8px' }}>
                {isSubmitting ? 'Saving...' : 'Add Material'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Create Assignment Modal */}
      {isAssignmentModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '400px', background: '#0F172A', borderRadius: '16px', padding: '24px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#F8FAFC' }}>Add Assignment / Task</h3>
              <button onClick={() => setIsAssignmentModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleCreateAssignment} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#94A3B8', marginBottom: '6px', display: 'block' }}>Task Title</label>
                <input required type="text" value={assignmentForm.title} onChange={e => setAssignmentForm({...assignmentForm, title: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#F8FAFC', outline: 'none' }} placeholder="e.g. Draft your Resume" />
              </div>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#94A3B8', marginBottom: '6px', display: 'block' }}>Instructions / Description</label>
                <textarea required value={assignmentForm.description} onChange={e => setAssignmentForm({...assignmentForm, description: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#F8FAFC', outline: 'none', minHeight: '100px' }} placeholder="Provide detailed instructions..." />
              </div>
              <button type="submit" disabled={isSubmitting} style={{ padding: '12px', borderRadius: '8px', background: 'linear-gradient(135deg, #0FAFAF, #0C8C8C)', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer', marginTop: '8px' }}>
                {isSubmitting ? 'Saving...' : 'Add Assignment'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
