'use client'

import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill-new/dist/quill.snow.css'

// Dynamic import with SSR disabled
const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false,
  loading: () => <div className="h-40 w-full animate-pulse bg-slate-800 rounded-md"></div>
})

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder = 'Write something...' }: RichTextEditorProps) {
  // Memoize modules so ReactQuill doesn't re-render and lose focus
  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  }), [])

  return (
    <div className="rich-text-editor">
      <style dangerouslySetInnerHTML={{__html: `
        .rich-text-editor .ql-toolbar {
          background-color: #1E293B;
          border-color: #334155;
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
        }
        .rich-text-editor .ql-container {
          background-color: #0F172A;
          border-color: #334155;
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
          min-height: 200px;
          color: #F8FAFC;
          font-family: 'Source Sans 3', sans-serif;
          font-size: 16px;
        }
        .rich-text-editor .ql-stroke {
          stroke: #94A3B8;
        }
        .rich-text-editor .ql-fill {
          fill: #94A3B8;
        }
        .rich-text-editor .ql-picker {
          color: #94A3B8;
        }
        .rich-text-editor .ql-editor.ql-blank::before {
          color: #64748B;
        }
      `}} />
      <ReactQuill 
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder={placeholder}
      />
    </div>
  )
}
