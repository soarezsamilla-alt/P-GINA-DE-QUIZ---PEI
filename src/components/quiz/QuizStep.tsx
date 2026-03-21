"use client"

import React, { useState } from 'react'
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
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null)

  const handleSelect = (label: string) => {
    setSelectedLabel(label)
    // Pequeno delay para o usuário ver o efeito visual de seleção
    setTimeout(() => {
      onSelect(label)
      setSelectedLabel(null)
    }, 400)
  }

  return (
    <div className={cn(
      "p-[3px] rounded-[1.6rem] transition-all duration-500 shadow-2xl",
      selectedLabel 
        ? "bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 scale-[1.02] shadow-emerald-200/50 animate-pulse-border" 
        : "bg-gradient-to-br from-primary/30 via-accent/30 to-primary/30 animate-in fade-in slide-in-from-bottom-4"
    )}
    style={{ 
      '--accent-rgb': selectedLabel ? '16, 185, 129' : '88, 56, 236' 
    } as React.CSSProperties}>
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
              className={cn(
                "w-full h-auto py-5 px-6 justify-start text-left text-base whitespace-normal transition-all border-2 rounded-2xl group active:scale-95",
                selectedLabel === option.label 
                  ? "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-inner" 
                  : "hover:bg-secondary/50 hover:text-primary border-primary/5"
              )}
              onClick={() => handleSelect(option.label)}
              disabled={!!selectedLabel}
            >
              <div className={cn(
                "mr-4 text-2xl bg-white p-2 rounded-xl shadow-sm border transition-transform",
                selectedLabel === option.label ? "scale-110 border-emerald-200" : "border-border/40 group-hover:scale-110"
              )}>
                {option.icon}
              </div>
              <span className={cn(
                "font-bold transition-colors",
                selectedLabel === option.label ? "text-emerald-700" : "text-foreground/80 group-hover:text-primary"
              )}>
                {option.label}
              </span>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
