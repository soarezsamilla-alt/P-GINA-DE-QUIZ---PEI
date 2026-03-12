
"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface QuizOption {
  label: string
  icon?: string
}

interface QuizStepProps {
  question: string
  options: QuizOption[]
  onSelect: (answer: string) => void
  className?: string
}

export const QuizStep: React.FC<QuizStepProps> = ({ question, options, onSelect, className }) => {
  return (
    <Card className={cn("w-full max-w-md mx-auto shadow-xl border-none animate-in fade-in slide-in-from-bottom-4 duration-500", className)}>
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-xl font-headline text-primary leading-tight">
          {question}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        {options.map((option, index) => (
          <Button
            key={index}
            variant="outline"
            size="lg"
            className="w-full h-auto py-4 px-6 justify-start text-left text-base whitespace-normal hover:bg-secondary hover:text-secondary-foreground transition-all border-2"
            onClick={() => onSelect(option.label)}
          >
            <span className="mr-3 text-xl">{option.icon}</span>
            <span className="font-medium">{option.label}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
