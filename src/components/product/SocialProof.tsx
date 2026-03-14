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

export const SocialProof: React.FC = () => {
  const testimonials = PlaceHolderImages.filter(img => img.id.startsWith('testimonial-'))

  return (
    <div className="py-6 px-4 bg-accent/5 rounded-3xl">
      <div className="space-y-3 mb-6">
        <h3 className="text-[21px] font-headline text-center text-primary font-bold">
          Quem adquire nossos materiais, RECOMENDA!
        </h3>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto text-sm">
          Veja o que as professoras que já utilizam nossos modelos de PEI estão dizendo sobre os resultados.
        </p>
      </div>

      <div className="max-w-xl mx-auto relative px-10 sm:px-14">
        <Carousel className="w-full">
          <CarouselContent>
            {testimonials.map((test) => (
              <CarouselItem key={test.id}>
                <div className="relative group overflow-hidden rounded-3xl shadow-xl bg-white border-4 border-white">
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <Image 
                      src={test.imageUrl} 
                      alt={test.description}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint={test.imageHint}
                    />
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
