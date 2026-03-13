
"use client"

import React, { useState, useEffect } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Purchase {
  name: string
  location: string
  time: string
}

const purchases: Purchase[] = [
  { name: "Maria Silva", location: "São Paulo, SP", time: "há 2 minutos" },
  { name: "Ana Paula", location: "Rio de Janeiro, RJ", time: "há 5 minutos" },
  { name: "Fernanda Costa", location: "Curitiba, PR", time: "há 1 minuto" },
  { name: "Juliana Souza", location: "Belo Horizonte, MG", time: "há 3 minutos" },
  { name: "Camila Oliveira", location: "Porto Alegre, RS", time: "há 7 minutos" },
  { name: "Beatriz Santos", location: "Salvador, BA", time: "há 4 minutos" },
  { name: "Patrícia Lima", location: "Brasília, DF", time: "há 6 minutos" },
  { name: "Letícia Rodrigues", location: "Recife, PE", time: "há 2 minutos" }
]

export const PurchaseNotification: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentPurchase, setCurrentPurchase] = useState<Purchase>(purchases[0])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const cycleNotification = () => {
      // Show notification
      setIsVisible(true)
      
      // Hide after 4 seconds
      setTimeout(() => {
        setIsVisible(false)
      }, 4000)
    }

    // Initial delay
    const initialTimeout = setTimeout(cycleNotification, 2000)

    // Interval every 8 seconds
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % purchases.length)
      cycleNotification()
    }, 8000)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    setCurrentPurchase(purchases[index])
  }, [index])

  return (
    <div 
      className={cn(
        "fixed bottom-4 left-4 z-[100] transition-all duration-500 transform",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
      )}
    >
      <div className="bg-white/95 backdrop-blur-md border border-border/50 shadow-2xl rounded-2xl p-3 flex items-center gap-3 max-w-[280px]">
        <div className="bg-green-100 p-2 rounded-full shrink-0">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
        </div>
        <div className="flex flex-col min-w-0">
          <p className="text-[13px] font-bold text-primary truncate">
            {currentPurchase.name} <span className="font-normal text-muted-foreground">acabou de comprar</span>
          </p>
          <p className="text-[11px] text-muted-foreground truncate">
            {currentPurchase.location} • {currentPurchase.time}
          </p>
        </div>
      </div>
    </div>
  )
}
