"use client"

import React from 'react'
import Image from 'next/image'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export const SampleGallery: React.FC = () => {
  const samples = PlaceHolderImages.filter(img => img.id.startsWith('pei-sample-')).slice(0, 5)

  return (
    <div className="py-6 px-4 bg-secondary/30 rounded-3xl">
      <div className="space-y-3 mb-6">
        <h3 className="text-2xl font-headline text-center text-primary font-bold">
          Veja abaixo algumas amostras:
        </h3>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto text-[14px]">
          Nossos modelos de PEI são feitos para tornar o ensino mais divertido e interativo!
        </p>
      </div>

      <div className="max-w-xl mx-auto relative px-10 sm:px-14">
        <Carousel className="w-full">
          <CarouselContent>
            {samples.map((sample) => (
              <CarouselItem key={sample.id}>
                <div className="relative group overflow-hidden rounded-3xl shadow-xl bg-white border-4 border-white">
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <Image 
                      src={sample.imageUrl} 
                      alt={sample.description}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint={sample.imageHint}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="bg-destructive/80 text-white px-6 py-2 rounded-full font-bold text-xl uppercase tracking-widest -rotate-12 shadow-lg border-2 border-white">
                        Amostra
                      </span>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <CarouselPrevious className="-left-6 sm:-left-14 h-10 w-10 sm:h-12 sm:w-12 bg-primary text-white hover:bg-primary/90 hover:text-white border-none shadow-lg" />
          <CarouselNext className="-right-6 sm:-right-14 h-10 w-10 sm:h-12 sm:w-12 bg-primary text-white hover:bg-primary/90 hover:text-white border-none shadow-lg" />
        </Carousel>
      </div>
    </div>
  )
}
