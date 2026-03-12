"use client"

import React, { useState, useEffect } from 'react'
import { QuizStep } from './QuizStep'
import { PersonalizedDescription } from '@/components/product/PersonalizedDescription'
import { SampleGallery } from '@/components/product/SampleGallery'
import { SocialProof } from '@/components/product/SocialProof'
import { generatePersonalizedProductDescription } from '@/ai/flows/personalized-product-description-flow'
import { Progress } from '@/components/ui/progress'
import { Loader2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

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
        { label: "Sim, nunca sei se está correto ou completo", icon: "👍" },
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
        className="w-full max-md h-16 text-xl font-bold rounded-2xl bg-accent hover:bg-accent/90 shadow-xl transition-all hover:scale-105 active:scale-95 group animate-pulse-border"
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

          <div className="mt-16 mb-8 text-center space-y-4 px-4">
            <h2 className="text-[21px] font-headline font-bold text-primary">
              Você Merece Bônus EXCLUSIVOS!
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-sm leading-relaxed">
              Ao adquirir, você recebe acesso imediato a 6 bônus incríveis que transformarão sua forma de trabalhar, garantindo mais tempo para ensinar e mais respeito da coordenação.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
