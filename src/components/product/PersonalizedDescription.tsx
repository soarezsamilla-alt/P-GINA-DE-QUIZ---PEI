
"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface PersonalizedDescriptionProps {
  description: string
}

export const PersonalizedDescription: React.FC<PersonalizedDescriptionProps> = ({ description }) => {
  // Função para destacar termos específicos no texto
  const highlightText = (text: string) => {
    const highlights = [
      { term: "PEI!", class: "text-primary font-bold" },
      { term: "PRONTOS E EDITÁVEIS!", class: "text-accent font-extrabold" },
      { term: "QUALQUER ALUNO.", class: "text-accent font-extrabold" },
      { term: "NINGUÉM PERCEBA!", class: "font-bold" }
    ]

    let result: (string | JSX.Element)[] = [text]

    highlights.forEach(({ term, class: className }) => {
      const newResult: (string | JSX.Element)[] = []
      result.forEach((part) => {
        if (typeof part === 'string') {
          const splitParts = part.split(term)
          splitParts.forEach((splitPart, index) => {
            newResult.push(splitPart)
            if (index < splitParts.length - 1) {
              newResult.push(<span key={`${term}-${index}`} className={className}>{term}</span>)
            }
          })
        } else {
          newResult.push(part)
        }
      })
      result = newResult
    })

    return result
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground p-6">
          <CardTitle className="text-2xl font-headline text-center">
            Tudo pronto, material preparado!
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 flex justify-center">
          <div className="max-w-3xl w-full">
            <p className="text-[18px] font-medium text-foreground whitespace-pre-line text-center leading-relaxed">
              {highlightText(description)}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
