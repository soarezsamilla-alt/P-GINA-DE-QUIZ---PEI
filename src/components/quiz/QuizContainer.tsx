
"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { QuizStep } from './QuizStep'
import { PersonalizedDescription } from '@/components/product/PersonalizedDescription'
import { SampleGallery } from '@/components/product/SampleGallery'
import { SocialProof } from '@/components/product/SocialProof'
import { OfferSection } from '@/components/product/OfferSection'
import { generatePersonalizedProductDescription } from '@/ai/flows/personalized-product-description-flow'
import { Progress } from '@/components/ui/progress'
import { Loader2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PlaceHolderImages } from '@/lib/placeholder-images'

type QuizState = 'QUIZ' | 'LOADING' | 'PRESENTATION'

export const QuizContainer: React.FC = () => {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [state, setState] = useState<QuizState>('QUIZ')
  const [personalizedDesc, setPersonalizedDesc] = useState('')

  const quizSteps = [
    {
      question: "Você é:",
      description: "Por favor escolha uma das opções abaixo!",
      options: [
        { label: "Professora Ed. Especial", icon: "👩‍🏫" },
        { label: "Professora Ensino Regular", icon: "👩‍🏫" },
        { label: "Orientador Educacional", icon: "👩‍🏫" }
      ]
    },
    {
      question: "Você sente insegurança ou dificuldade em elaborar o PEI?",
      options: [
        { label: "Sim, nunca sei se está correto or completo", icon: "👍" },
        { label: "Um pouco, mas consigo me virar", icon: "😥" }
      ]
    },
    {
      question: "Você já procurou por modelos de PEI prontos?",
      options: [
        { label: "Sim, mas nunca encontrei exatamente o que precisava", icon: "👍" },
        { label: "Não, mas quero uma base confiável e prática", icon: "🙂" }
      ]
    },
    {
      question: "O que você espera de um material que ajude a elaborar um PEI?",
      options: [
        { label: "Praticidade e modelos prontos para usar", icon: "😉" },
        { label: "Organização e economia de tempo", icon: "😟" }
      ]
    },
    {
      question: "Se tivesse acesso a modelos prontos e editáveis por um preço acessível, você…",
      options: [
        { label: "Adoraria comprar agora e usar já", icon: "👍" },
        { label: "Gostaria de ter encontrado isso antes", icon: "😆" }
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
      description: "Ficha de acompanhamento para alunos com necessidades educacionais especiais. A ficha coleta dados sobre o aluno e avalia suas habilidades em áreas como psicomotricidade.",
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
        })
        setPersonalizedDesc(result.description)
        setState('PRESENTATION')
      } catch (error) {
        console.error("Error generating personalized description:", error)
        setPersonalizedDesc("Dê adeus à dificuldade em elaborar seu PEI! Aqui temos modelos PRONTOS E EDITÁVEIS! Com nossos mais de 200 modelos de PEI 100% editáveis, planejados por profissionais da educação. Você entrega resultados perfeitos, ganha tempo e impressiona coordenadores e pais. Além de serem 100% editáveis você consegue Adaptar para QUALQUER TURMA.")
        setState('PRESENTATION')
      }
    }
  }

  const handlePurchase = () => {
    window.location.href = "https://pay.example.com/checkout/pei-models"
  }

  const progress = ((step + 1) / quizSteps.length) * 100

  const CTAButton = () => (
    <div className="flex justify-center px-4">
      <Button 
        onClick={handlePurchase}
        size="lg" 
        className="w-full max-w-md h-16 text-xl font-bold rounded-2xl bg-accent hover:bg-accent/90 shadow-xl transition-all hover:scale-105 active:scale-95 group animate-pulse-border"
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
    <div className="min-h-screen py-10 px-4">
      {state === 'QUIZ' && (
        <div className="max-w-md mx-auto space-y-8">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground text-sm uppercase tracking-widest font-semibold">Descubra o modelo ideal para você</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-primary/60 px-1">
              <span>Etapa {step + 1} de {quizSteps.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
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
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
          <Loader2 className="w-16 h-16 animate-spin text-accent" />
          <div className="space-y-2">
            <h2 className="text-2xl font-headline font-bold text-primary">Preparando seus modelos...</h2>
            <p className="text-muted-foreground">Analisando suas respostas para criar a oferta perfeita.</p>
          </div>
        </div>
      )}

      {state === 'PRESENTATION' && (
        <div className="max-w-5xl mx-auto pb-20">
          <div className="mb-8">
            <PersonalizedDescription description={personalizedDesc} />
          </div>
          
          <div className="mb-10">
            <CTAButton />
          </div>

          <div className="mb-2">
            <SampleGallery />
          </div>
          
          <div className="mb-2">
            <SocialProof />
          </div>

          <div className="mt-16 mb-12 text-center space-y-4 px-4">
            <h3 className="text-[21px] font-headline font-bold text-primary">
              Você Merece Bônus <span className="text-accent">EXCLUSIVOS!</span>
            </h3>
            <p className="text-muted-foreground max-w-3xl mx-auto text-[14px] leading-relaxed">
              Ao adquirir, você recebe acesso imediato a 6 bônus incríveis que transformarão sua forma de trabalhar, garantindo mais tempo para ensinar e mais respeito da coordenação.
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
                      <p className="text-muted-foreground text-[12px] leading-relaxed px-1">
                        {bonus.description}
                      </p>
                    </div>

                    <div className="mt-auto pt-2 flex flex-col items-center gap-0.5">
                      <span className="text-muted-foreground line-through text-[13px] font-medium">R$ 47,00</span>
                      <span className="text-green-500 font-extrabold text-xl tracking-tighter">GRÁTIS</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20">
            <OfferSection />
          </div>
        </div>
      )}
    </div>
  )
}
