
"use client"

import React from 'react'
import Image from 'next/image'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import { MessageSquareQuote } from 'lucide-react'

export const SocialProof: React.FC = () => {
  const testimonials = PlaceHolderImages.filter(img => img.id.startsWith('testimonial-'))

  return (
    <div className="py-12 bg-primary/5 rounded-3xl px-6">
      <div className="flex items-center justify-center gap-2 mb-4">
        <MessageSquareQuote className="text-accent" size={32} />
        <h3 className="text-2xl font-headline text-primary text-center">Quem adquire nossos materiais, RECOMENDA!</h3>
      </div>
      
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {testimonials.map((test) => (
          <div key={test.id} className="bg-white p-2 rounded-2xl shadow-sm border-4 border-secondary overflow-hidden">
             <Image 
                src={test.imageUrl} 
                alt={test.description}
                width={400}
                height={200}
                className="w-full h-auto rounded-lg"
                data-ai-hint={test.imageHint}
              />
          </div>
        ))}
      </div>
    </div>
  )
}
