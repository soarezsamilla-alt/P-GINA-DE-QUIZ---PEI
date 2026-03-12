
"use client"

import React from 'react'
import Image from 'next/image'
import { PlaceHolderImages } from '@/lib/placeholder-images'

export const SampleGallery: React.FC = () => {
  const samples = PlaceHolderImages.filter(img => img.id.startsWith('pei-sample-'))

  return (
    <div className="py-12">
      <h3 className="text-2xl font-headline text-center text-primary mb-2">Veja abaixo algumas amostras!</h3>
      <p className="text-center text-muted-foreground mb-8">Nossos modelos de PEI são feitos para tornar o ensino mais divertido e interativo!</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {samples.map((sample) => (
          <div key={sample.id} className="relative group overflow-hidden rounded-2xl shadow-md bg-white">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image 
                src={sample.imageUrl} 
                alt={sample.description}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                data-ai-hint={sample.imageHint}
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="bg-destructive/80 text-white px-4 py-2 rounded-full font-bold text-lg uppercase tracking-widest -rotate-12 shadow-lg border-2 border-white">
                  Amostra
                </span>
              </div>
            </div>
            <div className="p-4 bg-white border-t">
              <p className="text-sm font-medium text-center text-muted-foreground">{sample.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
