
"use client"

import React from 'react'
import Image from 'next/image'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import AutoScroll from 'embla-carousel-auto-scroll'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

export const SampleGallery: React.FC = () => {
  // Aumentado o slice para 11 para incluir a nova imagem
  const samples = PlaceHolderImages.filter(img => img.id.startsWith('pei-sample-')).slice(0, 11)

  return (
    <div className="py-6 px-4 bg-secondary/30 rounded-3xl overflow-hidden">
      <div className="space-y-3 mb-6">
        <h3 className="text-2xl font-headline text-center text-primary font-bold">
          Veja abaixo algumas amostras:
        </h3>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto text-[14px]">
          Nossos modelos de PEI são feitos para tornar o ensino mais divertido e interativo!
        </p>
      </div>

      <div className="max-w-6xl mx-auto relative">
        <Carousel 
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
          }}
          plugins={[
            AutoScroll({
              speed: 1,
              stopOnInteraction: false,
              stopOnMouseEnter: false,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {samples.map((sample) => (
              <CarouselItem key={sample.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/4">
                <div className="relative group overflow-hidden rounded-2xl shadow-lg bg-white border-2 border-white transition-all duration-300">
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <Image 
                      src={sample.imageUrl} 
                      alt={sample.description}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint={sample.imageHint}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="bg-destructive/80 text-white px-3 py-1 rounded-full font-bold text-xs uppercase tracking-widest -rotate-12 shadow-lg border border-white">
                        Amostra
                      </span>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  )
}
