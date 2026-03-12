
"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { ShieldCheck, Mail, Zap, ArrowRight } from 'lucide-react'

export const OfferSection: React.FC = () => {
  const handlePurchase = () => {
    window.location.href = "https://pay.example.com/checkout/pei-models"
  }

  return (
    <div id="offer-section" className="py-16 text-center max-w-2xl mx-auto space-y-8">
      <div className="space-y-4">
        <h2 className="text-[21px] font-headline text-primary font-bold">
          Garanta agora os melhores modelos de PEI e otimize seu tempo!
        </h2>
        <div className="inline-block bg-accent text-white px-6 py-2 rounded-full font-bold animate-pulse">
          50% OFF - POR TEMPO LIMITADO
        </div>
      </div>

      <div className="bg-white rounded-3xl p-10 shadow-2xl border-2 border-primary/10">
        <div className="space-y-2 mb-8 text-center">
          <p className="text-muted-foreground line-through text-lg">De R$ 37,80</p>
          <div className="flex items-baseline justify-center">
            <span className="text-6xl font-bold text-primary mr-1">R$</span>
            <span className="text-6xl font-bold text-primary tracking-tighter">16</span>
            <span className="text-2xl font-bold text-primary">,90</span>
          </div>
          <p className="text-[9px] font-bold text-[#5c6570] uppercase tracking-widest">Pagamento único</p>
        </div>

        <Button 
          onClick={handlePurchase}
          size="lg" 
          className="w-full h-16 text-xl font-bold rounded-2xl bg-accent hover:bg-accent/90 shadow-xl hover:shadow-accent/40 transition-all group"
        >
          ACESSAR AGORA!
          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>

        <div className="mt-8 space-y-4 text-sm text-muted-foreground text-left">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-accent shrink-0" />
            <p>Clicando no botão, você será redirecionado para a página de pagamento, e após confirmação receberá acesso imediato no seu e-mail.</p>
          </div>
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-accent shrink-0" />
            <p><strong>É seguro? Sim.</strong> Utilizamos a maior plataforma de pagamentos da América Latina. Seus dados estarão completamente seguros.</p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-6 pt-4">
        <TrustBadge icon={<Zap size={16} />} text="Acesso Vitalício" />
        <TrustBadge icon={<Zap size={16} />} text="Download Imediato" />
        <TrustBadge icon={<Zap size={16} />} text="Suporte Premium" />
      </div>
    </div>
  )
}

const TrustBadge = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
  <div className="flex items-center gap-2 text-xs font-bold text-primary/60 uppercase tracking-wider">
    <div className="bg-primary/10 p-1 rounded-full text-primary">
      {icon}
    </div>
    {text}
  </div>
)
