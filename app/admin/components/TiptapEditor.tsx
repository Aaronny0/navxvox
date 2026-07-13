"use client";

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'

export function TiptapEditor({ content, onChange }: { content: string, onChange: (html: string) => void }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'nv-input',
        style: 'min-height: 400px; outline: none; padding: 1rem;'
      }
    }
  })

  if (!editor) {
    return null
  }

  return (
    <div style={{ border: "1px solid var(--nv-border-light)", borderRadius: "0.5rem", overflow: "hidden" }}>
      <div style={{ display: "flex", gap: "0.5rem", padding: "0.5rem", background: "rgba(255,255,255,0.02)", borderBottom: "1px solid var(--nv-border-light)", flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="nv-btn"
          style={{ padding: "0.25rem 0.5rem", background: editor.isActive('bold') ? "rgba(255,255,255,0.1)" : "transparent" }}
        >
          Gras
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="nv-btn"
          style={{ padding: "0.25rem 0.5rem", background: editor.isActive('italic') ? "rgba(255,255,255,0.1)" : "transparent" }}
        >
          Italique
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className="nv-btn"
          style={{ padding: "0.25rem 0.5rem", background: editor.isActive('heading', { level: 2 }) ? "rgba(255,255,255,0.1)" : "transparent" }}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className="nv-btn"
          style={{ padding: "0.25rem 0.5rem", background: editor.isActive('heading', { level: 3 }) ? "rgba(255,255,255,0.1)" : "transparent" }}
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="nv-btn"
          style={{ padding: "0.25rem 0.5rem", background: editor.isActive('bulletList') ? "rgba(255,255,255,0.1)" : "transparent" }}
        >
          Puces
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="nv-btn"
          style={{ padding: "0.25rem 0.5rem", background: editor.isActive('orderedList') ? "rgba(255,255,255,0.1)" : "transparent" }}
        >
          Numéros
        </button>
        <button
          type="button"
          onClick={() => {
            const url = window.prompt('URL de l\'image')
            if (url) {
              editor.chain().focus().setImage({ src: url }).run()
            }
          }}
          className="nv-btn"
          style={{ padding: "0.25rem 0.5rem", background: "transparent" }}
        >
          Image
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
