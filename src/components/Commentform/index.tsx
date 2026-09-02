'use client'
import React, { useState, useRef, useEffect } from 'react'

export const CommentForm: React.FC<{postId:string}> = ({postId}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [height, setHeight] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    comment: '',
    name: '',
    email: '',
    website: '',
    saveInfo: false,
  })

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight)
    }
  }, [isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  try {
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        postId: postId,
        comment: formData.comment,
        name: formData.name,
        email: formData.email,
        website: formData.website,
      }),
    })

    if (res.ok) {
      setFormData({ comment: '', name: '', email: '', website: '', saveInfo: false })
      setIsOpen(false)
      alert('Comment submitted for moderation.')
    } else {
      alert('Failed to submit comment.')
    }
  } catch {
    alert('Failed to submit comment.')
  }
}
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-600 hover:underline text-sm cursor-pointer"
      >
        Show comments / Leave a comment
      </button>

      <div
        className="transition-all duration-500 ease-in-out"
        style={{ maxHeight: isOpen ? `${height}px` : '0px', opacity: isOpen ? 1 : 0 }}
      >
        <div ref={contentRef} className="mt-8 text-left">
          <h3 className="text-xl font-bold mb-1 text-black">Leave a Reply</h3>
          <p className="text-sm text-gray-500 mb-6">
            Your email address will not be published. Required fields are marked <span className="text-red-500">*</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Comment <span className="text-red-500">*</span>
              </label>
              <textarea
                name="comment"
                rows={6}
                required
                value={formData.comment}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black bg-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="saveInfo"
                checked={formData.saveInfo}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <label className="text-sm text-gray-600">
                Save my name, email, and website in this browser for the next time I comment.
              </label>
            </div>

            <button
              type="submit"
              className="bg-[#dbac2b] text-black px-6 py-2 rounded-md font-semibold text-sm hover:bg-black hover:text-white transition-colors"
            >
              Post Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}