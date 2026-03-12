"use client"

import React, { useState, useEffect } from 'react'
import { QuizStep } from './QuizStep'
import { PersonalizedDescription } from '@/components/product/PersonalizedDescription'
import { SampleGallery } from '@/components/product/SampleGallery'
import { SocialProof } from '@/components/product/SocialProof'
import { OfferSection } from '@/components/product/OfferSection'
import { generatePersonalizedProductDescription } from '@/ai/flows/personalized-product-description-flow'
import { Progress } from '@/components/ui/progress'
import { Loader2 } from 'lucide-react'

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
      question: "O que você busca em um bom material de apoio para elaborar um PEI?",
      options: [
        { label: "Praticidade e exemplos prontos.", icon: "😉" },
        { label: "Organização e economia de tempo.", icon: "😟" }
      ]
    },
    {
      question: "Você tem dificuldades em elaborar o PEI?",
      options: [
        { label: "Sim", icon: "👍" },
        { label: "Um pouco.", icon: "😊" }
      ]
    },
    {
      question: "Se pudesse investir em modelos prontos e editáveis por um valor acessível, você...",
      options: [
        { label: "Compraria agora para aplicar já!", icon: "👍" },
        { label: "Queria ter conhecido antes!", icon: "😆" }
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
        setPersonalizedDesc("Dê adeus à dificuldade em elaborar seu PEI! Aqui temos modelos PRONTOS E EDITÁVEIS! No arquivo contém 47 modelos, planejados por profissionais da educação. Servem para fundamental I e II. Mas como são editáveis você consegue Adaptar para OUTRAS TURMAS também. Recebe em PDF e EDITÁVEL NO WORD – 48 páginas no total.")
        setState('PRESENTATION')
      }
    }
  }

  const progress = ((step + 1) / quizSteps.length) * 100

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
            description={quizSteps[step].description}
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
        <div className="max-w-5xl mx-auto space-y-16 pb-20">
          <PersonalizedDescription description={personalizedDesc} />
          <SampleGallery />
          <SocialProof />
          <OfferSection />
        </div>
      )}
    </div>
  )
}
