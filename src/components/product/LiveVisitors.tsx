"use client"

import React, { useState, useEffect } from 'react'
import { Users } from 'lucide-react'
import { cn } from '@/lib/utils'

export const LiveVisitors: React.FC = () => {
  const [visitors, setVisitors] = useState<number | null>(null)

  useEffect(() => {
    // Evita erro de hidratação definindo o número apenas no cliente
    const randomInitial = Math.floor(Math.random() * (8 - 5 + 1)) + 5
    setVisitors(randomInitial)

    const interval = setInterval(() => {
      setVisitors(prev => {
        if (prev === null) return 6
        const change = Math.random() > 0.5 ? 1 : -1
        const next = prev + change
        // Mantém entre 4 e 9 para parecer real e próximo do pedido (5-6)
        return next >= 4 && next <= 9 ? next : prev
      })
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  if (visitors === null) return null

  return (
    <div className="fixed top-0 left-0 w-full z-[110] animate-in slide-in-from-top duration-500">
      <div className="bg-white/95 backdrop-blur-md border-b border-primary/10 shadow-md py-2.5 px-4 flex justify-center items-center gap-2.5">
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </div>
        <div className="flex items-center gap-1.5 text-[13px] font-bold text-muted-foreground">
          <Users className="w-4 h-4 text-primary/70" />
          <span className="tracking-tight">
            <strong className="text-primary font-black">{visitors} pessoas</strong> estão vendo este material agora
          </span>
        </div>
      </div>
    </div>
  )
}
