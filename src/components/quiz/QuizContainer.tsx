"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { QuizStep } from './QuizStep'
import { PersonalizedDescription } from '@/components/product/PersonalizedDescription'
import { SampleGallery } from '@/components/product/SampleGallery'
import { SocialProof } from '@/components/product/SocialProof'
import { OfferSection } from '@/components/product/OfferSection'
import { PurchaseNotification } from '@/components/product/PurchaseNotification'
import { LiveVisitors } from '@/components/product/LiveVisitors'
import { generatePersonalizedProductDescription } from '@/ai/flows/personalized-product-description-flow'
import { Progress } from '@/components/ui/progress'
import { Loader2, ArrowRight, Zap, ShieldCheck, Lock, FileText, Sparkles, Clock, Printer, Users, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { PlaceHolderImages } from '@/lib/placeholder-images'

type QuizState = 'QUIZ' | 'LOADING' | 'PRESENTATION'

export const QuizContainer: React.FC = () => {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [state, setState] = useState<QuizState>('QUIZ')
  const [personalizedDesc, setPersonalizedDesc] = useState('')

  const bnccImage = PlaceHolderImages.find(img => img.id === 'bncc-seal')

  const quizSteps = [
    {
      question: "Qual é o seu papel na escola?",
      description: "Por favor escolha uma das opções abaixo!",
      options: [
        { label: "Professora de Educação Especial", icon: "👩‍🏫" },
        { label: "Professora de Ensino Regular", icon: "📚" },
        { label: "Orientadora ou Coordenadora Educacional", icon: "🗂️" }
      ]
    },
    {
      question: "Quando você pensa em elaborar um PEI, o que passa pela sua cabeça?",
      options: [
        { label: "Não sei se estou fazendo certo", icon: "😰" },
        { label: "Sei o que precisa, mas perco tempo demais", icon: "😤" },
        { label: "Entrego, mas sei que poderia ser melhor", icon: "😓" }
      ]
    },
    {
      question: "Quando você precisa entregar um PEI, como costuma resolver?",
      options: [
        { label: "Copio um modelo antigo e adapto", icon: "📋" },
        { label: "Procuro no Google mas nunca acho o que precisa", icon: "🔍" },
        { label: "Peço para uma colega e uso sem muita certeza", icon: "💬" }
      ]
    },
    {
      question: "Quanto tempo você costuma gastar para elaborar UM PEI?",
      options: [
        { label: "Entre 1 e 3 horas", icon: "🕐" },
        { label: "Entre 3 e 6 horas", icon: "😩" },
        { label: "Mais de 6 horas, ou simplesmente não faço", icon: "💀" }
      ]
    },
    {
      question: "Qual é o perfil dos seus alunos que precisam de PEI?",
      options: [
        { label: "TEA, TDAH ou Deficiência Intelectual", icon: "🧩" },
        { label: "Deficiências múltiplas ou outros diagnósticos", icon: "🔀" },
        { label: "Educação Infantil 4 e 5 anos", icon: "🌱" }
      ]
    },
    {
      question: "Você tem algum PEI para entregar nos próximos dias?",
      options: [
        { label: "Sim preciso resolver isso agora", icon: "🔥" },
        { label: "Tenho prazo chegando em breve", icon: "📅" },
        { label: "Não agora, mas quero estar preparada", icon: "🗓️" }
      ]
    },
    {
      question: "Ter um PEI pronto nas mãos significaria:",
      options: [
        { label: "Dormir tranquila sabendo que fiz o meu melhor", icon: "😌" },
        { label: "Ser reconhecida como professora preparada", icon: "🏆" },
        { label: "Ter meu tempo de volta, sem trabalho em casa", icon: "⏳" }
      ]
    }
  ]

  const bonuses = [
    {
      title: "Plano Educacional PEI",
      description: "Um guia completo com apoio individualizado e estratégias de atividades adaptadas.",
      image: "https://image2url.com/r2/default/images/1773351312705-04ec6820-800f-4144-8bd9-5694237c8b28.webp",
      bgColor: "#FDF2F2"
    },
    {
      title: "Plano de Desenvolvimento PDI e PEI",
      description: "Um guia focado na aprendizagen e na inclusão de alunos PDI e PEI.",
      image: "https://image2url.com/r2/default/images/1773351395354-2a5033b1-313f-4462-97c1-54229810db19.webp",
      bgColor: "#F2F6FD"
    },
    {
      title: "Plano Educacional PEI 4 e 5 Anos",
      description: "Um guia educacional para alunos de 4 e 5 anos na educação Infantil, histórico escolar, saúde e desenvolvimento do aluno.",
      image: "https://image2url.com/r2/default/images/1773351423137-18ea825c-b9b8-4d7d-a701-cf860462aba4.webp",
      bgColor: "#F2FDF4"
    },
    {
      title: "Plano de Desenvolvimento Psicoeducacional (PDPI)",
      description: "Um guia desenvolvido com estratégias, acompanhamento e planejamento psicoeducacional.",
      image: "https://image2url.com/r2/default/images/1773351465518-52681892-c99b-4902-8e3c-9a08778d5c53.webp",
      bgColor: "#FDFCF2"
    },
    {
      title: "Planejamento AEE 2026",
      description: "Um guia planejado para o Atendimento Educacional Especializado (AEE) na Sala de Recurso Multifuncional para o ano de 2026.",
      image: "https://image2url.com/r2/default/images/1773351499103-d61ae935-e459-475a-8cb5-88f110b88e3f.webp",
      bgColor: "#F6F2FD"
    },
    {
      title: "Ficha Individual PEI",
      description: "Ficha de acompanhamento para alunos com necessidades educacionais especiais. A ficha coleta dados sobre o aluno e avalia suas habilidades em áreas como psicomotostricidade.",
      image: "https://image2url.com/r2/default/images/1773351519083-42be1ab9-67d9-4a04-9330-9d9a4baaadcf.webp",
      bgColor: "#FDF2F9"
    }
  ]

  const handleNextStep = async (answer: string) => {
    const updatedAnswers = [...answers, answer]
    setAnswers(updatedAnswers)
    
    if (step < quizSteps.length - 1) {
      setStep(step + 1)
    } else {
      setState('LOADING')
      try {
        const result = await generatePersonalizedProductDescription({
          q1Answer: updatedAnswers[1],
          q2Answer: updatedAnswers[2],
          q3Answer: updatedAnswers[3],
          q4Answer: updatedAnswers[0],
          q5Answer: updatedAnswers[4],
          q6Answer: updatedAnswers[5],
          q7Answer: updatedAnswers[6],
        })
        
        setPersonalizedDesc(result.description)
        setState('PRESENTATION')
      } catch (error) {
        console.error("Error generating personalized description:", error)
        setPersonalizedDesc("Pare de entregar PEI pela metade e torcer para que NINGUÉM PERCEBA! Receba + 200 modelos PRONTOS E EDITÁVEIS! Planejados por profissionais da educação inclusiva. Servem do 1º ao 9º ano. Além de ser editáveis você consegue adaptar para qualquer faixa etária e qualquer formato exigido pela sua escola.")
        setState('PRESENTATION')
      }
    }
  }

  const scrollToOffer = () => {
    const element = document.getElementById('offer-section')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const progress = ((step + 1) / quizSteps.length) * 100

  const getProgressColorClass = () => {
    if (progress < 40) return 'from-primary via-primary/80 to-primary/60';
    if (progress < 75) return 'from-primary via-accent to-accent/80';
    return 'from-accent via-destructive/80 to-destructive animate-pulse';
  }

  const CTAButton = () => (
    <div className="flex justify-center px-4">
      <Button 
        onClick={scrollToOffer}
        size="lg" 
        className="w-full max-md:h-16 h-14 text-xl font-bold rounded-2xl bg-accent hover:bg-accent/90 shadow-xl transition-all hover:scale-105 active:scale-95 group animate-pulse-border"
        style={{
          '--accent-rgb': '88, 56, 236'
        } as React.CSSProperties}
      >
        Quero receber os modelos!
        <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen py-10 px-0">
      {state === 'QUIZ' && (
        <div className="max-w-md mx-auto space-y-8 px-4">
          <div className="space-y-3">
            <div className="flex justify-between items-end mb-1">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest font-black text-primary/40 leading-none mb-1">Progresso</span>
                <span className="text-sm font-bold text-primary">Etapa {step + 1} de {quizSteps.length}</span>
              </div>
              <div className="bg-primary/10 px-2 py-0.5 rounded-full">
                <span className="text-xs font-black text-primary tracking-tighter">{Math.round(progress)}%</span>
              </div>
            </div>
            <div className="relative h-3 w-full bg-primary/5 rounded-full overflow-hidden shadow-inner border border-primary/10">
               <div 
                className={`absolute top-0 left-0 h-full bg-gradient-to-r ${getProgressColorClass()} bg-[length:200%_100%] transition-all duration-700 ease-in-out shadow-[0_0_15px_rgba(255,255,255,0.4)]`} 
                style={{ width: `${progress}%` }}
               >
                 <div className="absolute inset-0 bg-white/20 animate-shimmer pointer-events-none" />
               </div>
            </div>
          </div>
          <QuizStep 
            question={quizSteps[step].question}
            description={step === 0 ? "Por favor escolha uma das opções abaixo!" : undefined}
            options={quizSteps[step].options}
            onSelect={handleNextStep}
          />
        </div>
      )}

      {state === 'LOADING' && (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center px-4">
          <div className="relative">
            <Loader2 className="w-16 h-16 animate-spin text-accent" />
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-headline font-bold text-primary">Preparando seus modelos...</h2>
            <p className="text-muted-foreground">Analisando suas respostas para criar a oferta perfeita.</p>
          </div>
        </div>
      )}

      {state === 'PRESENTATION' && (
        <div className="w-full pb-8 pt-12">
          <LiveVisitors />
          <PurchaseNotification />
          
          <section className="bg-white pt-6 pb-6 px-4">
            <div className="max-w-5xl mx-auto">
              <div className="mb-6">
                <PersonalizedDescription description={personalizedDesc} />
              </div>
              <div className="mb-2">
                <CTAButton />
              </div>
            </div>
          </section>

          <Separator className="opacity-10" />

          <section className="bg-blue-50/50 py-10 px-4">
            <div className="max-w-5xl mx-auto">
              <SampleGallery />
            </div>
          </section>

          <Separator className="opacity-10" />

          <section className="bg-purple-50/50 py-10 px-4">
            <div className="max-w-5xl mx-auto">
              <SocialProof />
            </div>
          </section>

          <Separator className="opacity-10" />

          <section className="bg-slate-50 py-12 px-4">
            <div className="max-w-6xl mx-auto text-center space-y-10">
              <div className="space-y-3">
                <h3 className="text-[21px] font-headline font-bold text-primary">
                  O que você vai receber hoje:
                </h3>
                <p className="text-muted-foreground text-[14px] max-w-xl mx-auto leading-relaxed">
                  Todo o suporte necessário para otimizar seu tempo e garantir um ensino de qualidade com materiais 100% editáveis.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 justify-items-center">
                <div className="bg-white p-3 md:p-4 rounded-2xl border border-border/50 shadow-md flex flex-col items-center gap-2 transition-all duration-300 active:scale-[0.98] md:hover:scale-105 group relative overflow-hidden max-w-[380px] w-full">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/60 to-primary/20" />
                  <div className="bg-primary/10 p-3 rounded-full transition-colors group-active:bg-primary/20">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-primary text-base leading-tight">+ de 200 Modelos PEI e muito mais</h4>
                    <p className="text-[13px] text-muted-foreground leading-tight">Material completo, planejado por profissionais e 100% editáveis no Word.</p>
                  </div>
                </div>
                
                <div className="bg-white p-3 md:p-4 rounded-2xl border border-border/50 shadow-md flex flex-col items-center gap-2 transition-all duration-300 active:scale-[0.98] md:hover:scale-105 group relative overflow-hidden max-w-[380px] w-full">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/60 to-accent/20" />
                  <div className="bg-accent/10 p-3 rounded-full transition-colors group-active:bg-accent/20">
                    <Zap className="w-6 h-6 text-accent" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-primary text-base leading-tight">Acesso Digital</h4>
                    <p className="text-[13px] text-muted-foreground leading-tight">Receba o material instantaneamente via E-mail ou WhatsApp logo após a compra.</p>
                  </div>
                </div>
                
                <div className="bg-white p-3 md:p-4 rounded-2xl border border-border/50 shadow-md flex flex-col items-center gap-2 transition-all duration-300 active:scale-[0.98] md:hover:scale-105 group relative overflow-hidden max-w-[380px] w-full">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-600/60 to-green-600/20" />
                  <div className="bg-green-100 p-3 rounded-full transition-colors group-active:bg-green-200">
                    <Printer className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-primary text-base leading-tight">Prontos para Imprimir</h4>
                    <p className="text-[13px] text-muted-foreground leading-tight">Modelos já formatados e organizados, prontos para preencher e imprimir.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Separator className="opacity-10" />

          <section className="bg-amber-50/50 py-10 px-4">
            <div className="max-w-5xl mx-auto text-center space-y-4">
              <h3 className="text-[21px] font-headline font-bold text-primary">
                Você Merece Bônus <span className="text-accent">EXCLUSIVOS!</span>
              </h3>
              <p className="text-muted-foreground max-w-3xl mx-auto text-[14px] leading-relaxed">
                Ao adquirir, você recebe acesso imediato a 6 bônus incríveis que transformarão sua forma de trabalhar, garantindo mais tempo para trabalhar e mais respeito da coordenação.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-10 justify-items-center">
                {bonuses.map((bonus, idx) => (
                  <div 
                    key={idx} 
                    className="group p-[3px] rounded-[2.1rem] bg-gradient-to-br from-primary/40 via-accent/40 to-primary/40 hover:from-primary hover:via-accent hover:to-primary transition-all duration-500 shadow-md hover:shadow-2xl max-w-[340px] w-full border-2 border-transparent hover:border-accent/30"
                  >
                    <div 
                      className="relative rounded-[2rem] p-4 pt-10 flex flex-col items-center text-center h-full transition-colors duration-300"
                      style={{ backgroundColor: bonus.bgColor }}
                    >
                      <div className="absolute top-4 left-4 bg-accent px-3 py-1 rounded-full text-white text-[10px] font-bold shadow-sm z-10">
                        Bônus {idx + 1}º
                      </div>
                      
                      <div className="relative w-[70%] aspect-square mb-6 rounded-lg overflow-hidden shadow-md transform group-hover:scale-110 transition-transform duration-500">
                        <Image 
                          src={bonus.image} 
                          alt={bonus.title}
                          fill
                          className="object-cover"
                          data-ai-hint="bonus digital product cover"
                        />
                      </div>

                      <div className="space-y-2 mb-4 flex-grow">
                        <h4 className="text-[16px] font-bold text-primary leading-tight">{bonus.title}</h4>
                        <p className="text-muted-foreground text-[14px] leading-relaxed px-1">
                          {bonus.description}
                        </p>
                      </div>

                      <div className="mt-auto pt-2 flex flex-col items-center gap-0.5">
                        <span className="text-muted-foreground line-through text-[13px] font-medium">R$ 37,90</span>
                        <span className="text-green-500 font-extrabold text-xl tracking-tighter">GRÁTIS</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* BNCC Section - Integrated here as requested */}
          <section className="bg-white py-12 px-4">
            <div className="max-w-4xl mx-auto text-center space-y-2">
              {bnccImage && (
                <div className="relative w-32 h-32 mx-auto animate-in zoom-in duration-700">
                  <Image 
                    src={bnccImage.imageUrl} 
                    alt={bnccImage.description}
                    fill
                    className="object-contain"
                    data-ai-hint={bnccImage.imageHint}
                  />
                </div>
              )}
              <div className="space-y-4">
                <h3 className="text-[22px] font-headline font-black text-primary uppercase tracking-tight">
                  Compatível com BNCC
                </h3>
                <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10 shadow-sm">
                  <p className="text-[16px] md:text-[18px] text-foreground font-medium leading-relaxed max-w-2xl mx-auto">
                    <span className="text-primary font-bold">Planejamento de inclusão seguro e oficial!</span> Leve +200 modelos de PEI também alinhados à BNCC, prontos para você editar no Word e usar na sala de aula amanhã mesmo.
                  </p>
                </div>
                <div className="flex justify-center gap-4 pt-2">
                  <div className="flex items-center gap-2 text-[11px] font-black uppercase text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                    <CheckCircle className="w-3.5 h-3.5" />
                    100% Atualizado
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-black uppercase text-primary bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
                    <Zap className="w-3.5 h-3.5" />
                    Edição Rápida
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white py-2 px-4">
            <div className="max-w-5xl mx-auto">
              < OfferSection />
            </div>
          </section>

          <Separator className="opacity-10" />

          <section className="bg-slate-50/50 py-10 px-4">
            <div className="max-w-5xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h3 className="text-[23px] font-headline font-bold text-primary">
                  Como vou receber meu material?
                </h3>
                <p className="text-foreground text-[15px] leading-relaxed max-w-2xl mx-auto bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-accent/10 font-medium shadow-sm">
                  Clicando no botão, você será redirecionado para a página de pagamento, e após confirmação receberá acesso imediato no seu <span className="text-accent font-bold">E-mail</span> or <span className="text-accent font-bold">Whatsapp</span>.
                </p>
              </div>
            </div>
          </section>

          <Separator className="opacity-10" />

          <section className="bg-green-50/30 py-10 px-4">
            <div className="max-w-5xl mx-auto text-center space-y-6">
              <h3 className="text-[23px] font-headline font-bold text-primary">
                É seguro?
              </h3>
              <p className="text-foreground text-[15px] leading-relaxed max-w-2xl mx-auto bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-green-200 font-medium shadow-sm">
                Sim! Seus dados estão <span className="text-green-600 font-bold">100% seguros</span>. Utilizamos <span className="text-primary font-bold">criptografia de ponta a ponta</span> e as plataformas de pagamento mais confiáveis do mercado para garantir uma transação tranquila e protegida.
              </p>
              <div className="flex justify-center items-center gap-8 pt-4 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
                 <div className="flex flex-col items-center gap-1.5">
                   <ShieldCheck className="w-8 h-8 text-green-600" />
                   <span className="text-accent font-bold uppercase tracking-tighter">Pagamento Seguro</span>
                 </div>
                 <div className="flex flex-col items-center gap-1.5">
                   <Lock className="w-8 h-8 text-primary" />
                   <span className="text-accent font-bold uppercase tracking-tighter">SSL Criptografado</span>
                 </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}