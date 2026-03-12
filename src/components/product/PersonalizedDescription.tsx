
"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface PersonalizedDescriptionProps {
  description: string
}

export const PersonalizedDescription: React.FC<PersonalizedDescriptionProps> = ({ description }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground p-6">
          <CardTitle className="text-2xl font-headline text-center">
            Tudo pronto, material preparado!
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="prose prose-blue max-w-none text-muted-foreground leading-relaxed">
            <p className="text-lg font-medium text-foreground whitespace-pre-line text-center">
              {description}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
