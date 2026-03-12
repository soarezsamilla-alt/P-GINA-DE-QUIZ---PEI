"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, FileText, Settings, Users } from 'lucide-react'

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
          <div className="prose prose-blue max-w-none text-muted-foreground leading-relaxed mb-8">
            <p className="text-lg font-medium text-foreground whitespace-pre-line">
              {description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FeatureItem 
              icon={<FileText className="text-accent" />}
              title="Mais de 200 Modelos"
              description="Planejados por profissionais da educação"
            />
            <FeatureItem 
              icon={<Settings className="text-accent" />}
              title="Totalmente Editáveis"
              description="Adaptáveis para qualquer turma ou necessidade"
            />
            <FeatureItem 
              icon={<Users className="text-accent" />}
              title="Fundamental I e II"
              description="Estrutura completa para os dois segmentos"
            />
            <FeatureItem 
              icon={<CheckCircle2 className="text-accent" />}
              title="Acesso Imediato"
              description="Material 100% editável para facilitar sua rotina"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const FeatureItem = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="flex items-start p-4 rounded-xl bg-secondary/30 gap-3">
    <div className="mt-1">{icon}</div>
    <div>
      <h4 className="font-bold text-primary text-sm">{title}</h4>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  </div>
)
