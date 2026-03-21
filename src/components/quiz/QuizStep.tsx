"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface QuizOption {
  label: string
  icon?: string
}

interface QuizStepProps {
  question: string
  description?: string
  options: QuizOption[]
  onSelect: (answer: string) => void
  className?: string
}

export const QuizStep: React.FC<QuizStepProps> = ({ question, description, options, onSelect, className }) => {
  return (
    <div className="p-[3px] rounded-[1.6rem] bg-gradient-to-br from-primary/30 via-accent/30 to-primary/30 animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-2xl">
      <Card className={cn("w-full max-w-md mx-auto border-none bg-white rounded-[1.5rem] overflow-hidden", className)}>
        <CardHeader className="text-center pb-2 pt-8">
          <CardTitle className="text-xl font-headline text-primary leading-tight font-black">
            {question}
          </CardTitle>
          {description && (
            <CardDescription className="text-muted-foreground mt-2 font-medium">
              {description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-3 pt-4 pb-8">
          {options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              size="lg"
              className="w-full h-auto py-5 px-6 justify-start text-left text-base whitespace-normal hover:bg-secondary/50 hover:text-primary transition-all border-2 border-primary/5 rounded-2xl group active:scale-95"
              onClick={() => onSelect(option.label)}
            >
              <div className="mr-4 text-2xl bg-white p-2 rounded-xl shadow-sm border border-border/40 group-hover:scale-110 transition-transform">
                {option.icon}
              </div>
              <span className="font-bold text-foreground/80 group-hover:text-primary transition-colors">{option.label}</span>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
