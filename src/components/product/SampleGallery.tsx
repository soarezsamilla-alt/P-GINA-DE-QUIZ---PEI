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
  // Filtramos as amostras e pegamos as 5 primeiras conforme solicitado (1 original + 4 novas)
  const samples = PlaceHolderImages.filter(img => img.id.startsWith('pei-sample-')).slice(0, 5)

  return (
    <div className="pt-2 pb-12 px-4">
      <div className="space-y-4 mb-10">
        <h3 className="text-2xl font-headline text-center text-primary font-bold">
          Veja abaixo algumas amostras:
        </h3>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Nossos modelos de PEI são feitos para tornar o ensino mais divertido e interativo!
        </p>
      </div>

      <div className="max-w-md mx-auto relative px-12">
        <Carousel className="w-full">
          <CarouselContent>
            {samples.map((sample) => (
              <CarouselItem key={sample.id}>
                <div className="relative group overflow-hidden rounded-3xl shadow-xl bg-white border-4 border-white">
                  <div className="relative aspect-[3/4] overflow-hidden">
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
                  <div className="p-6 bg-white">
                    <p className="text-sm font-bold text-center text-primary uppercase tracking-tight">
                      {sample.description}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden sm:block">
            <CarouselPrevious className="-left-14 h-12 w-12 bg-primary text-white hover:bg-primary/90 hover:text-white border-none shadow-lg" />
            <CarouselNext className="-right-14 h-12 w-12 bg-primary text-white hover:bg-primary/90 hover:text-white border-none shadow-lg" />
          </div>
          <div className="flex sm:hidden justify-center gap-4 mt-6">
            <CarouselPrevious className="static h-12 w-12 bg-primary text-white border-none translate-y-0" />
            <CarouselNext className="static h-12 w-12 bg-primary text-white border-none translate-y-0" />
          </div>
        </Carousel>
      </div>
    </div>
  )
}
