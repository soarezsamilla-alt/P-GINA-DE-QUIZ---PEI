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
  // Utilizamos as 12 imagens de amostra configuradas
  const samples = PlaceHolderImages.filter(img => img.id.startsWith('pei-sample-')).slice(0, 12)

  return (
    <div className="py-8 px-4 bg-secondary/30 rounded-3xl overflow-hidden">
      <div className="space-y-3 mb-8">
        <h3 className="text-2xl font-headline text-center text-primary font-bold">
          Veja abaixo algumas amostras:
        </h3>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto text-[14px]">
          Nossos modelos de PEI são feitos para tornar o ensino mais divertido e interativo!
        </p>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <Carousel 
          opts={{
            align: "start",
            loop: true,
            watchDrag: false, // Desabilita o arraste manual para que o usuário não consiga parar a rolagem
          }}
          plugins={[
            AutoScroll({
              speed: 1,
              stopOnInteraction: false, // Garante que não pare ao clicar/tocar
              stopOnMouseEnter: false,  // Garante que não pare ao passar o mouse
              stopOnFocusIn: false      // Garante que não pare ao ganhar foco
            }),
          ]}
          className="w-full pointer-events-none sm:pointer-events-auto"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {samples.map((sample) => (
              <CarouselItem key={sample.id} className="pl-4 md:pl-6 basis-[70%] md:basis-1/3 lg:basis-1/4">
                <div className="relative group overflow-hidden rounded-2xl shadow-xl bg-white border-2 border-white transition-all duration-300">
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <Image 
                      src={sample.imageUrl} 
                      alt={sample.description}
                      fill
                      className="object-cover"
                      data-ai-hint={sample.imageHint}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="bg-destructive/80 text-white px-4 py-1.5 rounded-full font-bold text-sm uppercase tracking-widest -rotate-12 shadow-lg border-2 border-white">
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
