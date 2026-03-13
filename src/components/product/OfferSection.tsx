"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Check, Timer } from 'lucide-react'

export const OfferSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 24, minutes: 0, seconds: 0 })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          return { hours: 23, minutes: 59, seconds: 59 }
        }
        let h = prev.hours
        let m = prev.minutes
        let s = prev.seconds - 1

        if (s < 0) {
          s = 59
          m -= 1
        }
        if (m < 0) {
          m = 59
          h -= 1
        }
        return { hours: h, minutes: m, seconds: s }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handlePurchase = () => {
    window.location.href = "https://pay.example.com/checkout/pei-models"
  }

  const formatNumber = (num: number) => num.toString().padStart(2, '0')

  const benefits = [
    "Mais de 200 Modelos de PEI prontos e editáveis",
    "Combo Ed. Especial com materiais extras",
    "Acesso aos modelos fundamentais",
    "Todos os 6 Bônus",
    "Incluindo PEI para deficiências múltiplas",
    "PEI Autismo Ed. Infantil",
    "Relatórios AEE",
    "Acesso a futuras atualizações"
  ]

  return (
    <div id="offer-section" className="pb-12 pt-4 text-center max-w-2xl mx-auto space-y-6">
      <div className="space-y-3 px-4">
        <h2 className="text-[21px] font-headline text-primary font-bold">
          Garanta agora os melhores modelos de PEI e otimize seu tempo!
        </h2>
        <p className="text-[14px] text-[#5c6570] font-medium max-w-lg mx-auto leading-relaxed">
          Aproveite agora tenha acesso a PEIs prontos e editáveis para otimizar seu tempo, melhorar sua performance e impressionar sua coordenação.
        </p>
      </div>

      <div className="bg-white rounded-[2rem] shadow-2xl border-2 border-primary/10 mx-auto max-w-[400px] overflow-hidden">
        {/* Compact & High Impact Timer */}
        <div className="bg-destructive py-2.5 px-4 flex items-center justify-center gap-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/5 animate-pulse" />
          
          <div className="relative flex items-center gap-1.5">
            <Timer className="w-3.5 h-3.5 text-white animate-bounce shrink-0" />
            <span className="text-[10px] font-black text-white uppercase tracking-wider whitespace-nowrap">
              Expira em:
            </span>
          </div>
          
          <div className="relative flex items-center gap-1.5">
            <TimeUnit value={isMounted ? formatNumber(timeLeft.hours) : "24"} label="H" />
            <span className="text-white font-bold text-sm mb-0.5">:</span>
            <TimeUnit value={isMounted ? formatNumber(timeLeft.minutes) : "00"} label="M" />
            <span className="text-white font-bold text-sm mb-0.5">:</span>
            <TimeUnit value={isMounted ? formatNumber(timeLeft.seconds) : "00"} label="S" />
          </div>
        </div>

        <div className="p-6 pt-5">
          <div className="space-y-1 mb-3 text-center">
            <p className="text-muted-foreground line-through text-sm">De R$ 97,90</p>
            <div className="flex items-baseline justify-center">
              <span className="text-5xl font-bold text-primary mr-1">R$</span>
              <span className="text-7xl font-bold text-primary tracking-tighter">16</span>
              <span className="text-2xl font-bold text-primary">,90</span>
            </div>
            <p className="text-[11px] font-bold text-[#5c6570] uppercase tracking-widest">Pagamento único</p>
            
            <div className="mt-4 relative w-full h-48">
              <Image 
                src="https://image2url.com/r2/default/images/1773359501312-a55c79a5-0b66-4551-955d-14a5787c7bb4.webp"
                alt="Garantia"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="mt-4 space-y-2 text-left border-t pt-5 mb-5">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 text-[13px] text-[#5c6570] font-medium">
                <div className="bg-green-100 p-0.5 rounded-full">
                  <Check className="w-3.5 h-3.5 text-green-600 shrink-0" />
                </div>
                <span>
                  {benefit === "Todos os 6 Bônus" ? (
                    <span className="text-[#2c293d] font-bold">Todos os 6 Bônus</span>
                  ) : benefit === "Acesso a futuras atualizações" ? (
                    <>
                      Acesso a <span className="text-[#2c293d] font-bold">futuras atualizações</span>
                    </>
                  ) : benefit === "Mais de 200 Modelos de PEI prontos e editáveis" ? (
                    <>
                      Mais de <span className="text-[#2c293d] font-bold">200 Modelos</span> de PEI prontos e editáveis
                    </>
                  ) : (
                    benefit
                  )}
                </span>
              </div>
            ))}
          </div>

          <Button 
            onClick={handlePurchase}
            size="lg" 
            className="w-full h-14 text-lg font-bold rounded-xl bg-accent hover:bg-accent/90 shadow-xl hover:shadow-accent/40 transition-all group animate-pulse-border hover:scale-105"
            style={{ '--accent-rgb': '88, 56, 236' } as React.CSSProperties}
          >
            LIBERAR ACESSO!
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <div className="mt-5 text-[11px] text-muted-foreground leading-tight px-2">
            <p>
              VOCÊ <span className="text-destructive font-black underline">NÃO</span> vai encontrar esse preço depois.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const TimeUnit = ({ value, label }: { value: string, label: string }) => (
  <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md rounded-md px-1.5 py-0.5 border border-white/20 shadow-sm">
    <span className="text-white font-mono font-bold text-base leading-none">
      {value}
    </span>
    <span className="text-[6px] font-black text-white/70 uppercase">
      {label}
    </span>
  </div>
)
