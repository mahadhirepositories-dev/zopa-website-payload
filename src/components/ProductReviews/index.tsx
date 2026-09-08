'use client'

import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import  RichText  from '@/components/RichText'


type Review = {
  id: number
  rating: number
  text: string
  name: string
  date: string
}

type Props = {
  reviewDescription?: string | null
  productTitle: string
  productId: number
}

function StarRating({
  rating,
  onRate,
  interactive = false,
}: {
  rating: number
  onRate?: (r: number) => void
  interactive?: boolean
}) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          className={`text-2xl leading-none transition-colors ${
            interactive ? 'cursor-pointer hover:text-yellow-500' : 'cursor-default'
          } ${
            star <= (interactive ? hovered || rating : rating)
              ? 'text-yellow-500'
              : 'text-gray-300'
          }`}
          onMouseEnter={() => interactive && setHovered(star)}
          onMouseLeave={() => interactive && setHovered(0)}
          onClick={() => interactive && onRate?.(star)}
        >
          ★
        </button>
      ))}
    </div>
  )
}

export const ProductReviews = ({ reviewDescription, productTitle, productId }: Props) => {
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description')
  const [reviews, setReviews] = useState<Review[]>([])
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`/api/reviews?where[product][equals]=${productId}&where[status][equals]=approved&limit=100&sort=-createdAt`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(
          (data.docs || []).map((r: any) => ({
            id: r.id,
            rating: r.rating,
            text: r.text,
            name: r.name,
            date: new Date(r.createdAt).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
          })),
        )
      })
      .catch(console.error)
  }, [productId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!rating || !reviewText.trim() || !name.trim() || !email.trim()) return

    setLoading(true)
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: productId,
          rating,
          text: reviewText,
          name,
          email,
          status: 'pending',
        }),
      })

      if (res.ok) {
        setRating(0)
        setReviewText('')
        setName('')
        setEmail('')
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 3000)
      }
    } catch (error) {
      console.error('Failed to submit review:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="container py-12">
      <div className="flex border-b border-border mb-8">
        <button
          onClick={() => setActiveTab('description')}
          className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
            activeTab === 'description'
              ? 'border-primary text-foreground bg-[#DCDCDC] rounded-[5px]'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
            activeTab === 'reviews'
              ? 'border-primary text-foreground bg-[#DCDCDC] rounded-[5px]'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Reviews ({reviews.length})
        </button>
      </div>

      {activeTab === 'description' && (
        <div className="max-w-7xl">
          <h2 className="text-[35px] font-[500] mb-6 font-sans">Description</h2>
          {reviewDescription ? (
            <p className="text-gray-800 text-[15px] font-sans">{reviewDescription}</p>
          ) : (
            <p className="text-muted-foreground">No description available for this product.</p>
          )}
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="max-w-3xl">
          <h2 className="text-[35px] font-[500] mb-4 font-sans tracking-[1px]">Reviews</h2>

          {reviews.length === 0 && (
            <p className="text-gray-700 mb-3 font-sans text-[15px]">There are no reviews yet.</p>
          )}

          <p className="text-gray-700 font-sans text-[15px]">
            Be the first to review &ldquo;{productTitle}&rdquo;
          </p>
          <p className="text-gray-700 font-sans mb-6 text-[15px]">
            Your email address will not be published. Required fields are marked *
          </p>

          {submitted && (
            <div className="mb-6 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
              Thank you! Your review has been submitted and is awaiting approval.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 mb-12">
            <div>
              <label className="block text-[15px] font-sans text-gray-700 mb-1">
                Your rating <span className="text-destructive">*</span>
              </label>
              <StarRating rating={rating} onRate={setRating} interactive />
            </div>

            <div>
              <label className="block text-[15px] font-sans text-gray-700 mb-1">
                Your review <span className="text-destructive">*</span>
              </label>
              <Textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={5}
                required
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-[15px] font-sans text-gray-700 mb-1">
                Name <span className="text-destructive">*</span>
              </label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="max-w-sm"
              />
            </div>

            <div>
              <label className="block text-[15px] font-sans text-gray-700 mb-1">
                Email <span className="text-destructive">*</span>
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="max-w-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !rating || !reviewText.trim() || !name.trim() || !email.trim()}
              className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>

          {reviews.length > 0 && (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <StarRating rating={review.rating} />
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  <p className="text-foreground mb-2">{review.text}</p>
                  <p className="text-sm text-muted-foreground">
                    by <span className="font-medium">{review.name}</span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}