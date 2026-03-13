'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating personalized product descriptions.
 *
 * - generatePersonalizedProductDescription - A function that takes quiz responses and generates a tailored product description.
 * - PersonalizedProductDescriptionInput - The input type for the generatePersonalizedProductDescription function.
 * - PersonalizedProductDescriptionOutput - The return type for the generatePersonalizedProductDescription function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PersonalizedProductDescriptionInputSchema = z.object({
  q1Answer: z.string().describe("User's answer to 'Quando você pensa em elaborar um PEI, o que passa pela sua cabeça?'"),
  q2Answer: z.string().describe("User's answer to 'Quando você precisa entregar um PEI, como costuma resolver?'"),
  q3Answer: z.string().describe("User's answer to 'Quanto tempo gasta para elaborar um PEI?'"),
  q4Answer: z.string().describe("User's answer to 'Qual seu papel na escola?'"),
  q5Answer: z.string().describe("User's answer to 'Qual o perfil dos alunos?'"),
  q6Answer: z.string().describe("User's answer to 'Tem algum PEI para entregar nos próximos dias?'"),
  q7Answer: z.string().describe("User's answer to 'Ter um PEI pronto nas mãos significaria:'"),
});
export type PersonalizedProductDescriptionInput = z.infer<typeof PersonalizedProductDescriptionInputSchema>;

const PersonalizedProductDescriptionOutputSchema = z.object({
  description: z.string().describe('A personalized product description based on user quiz responses.'),
});
export type PersonalizedProductDescriptionOutput = z.infer<typeof PersonalizedProductDescriptionOutputSchema>;

export async function generatePersonalizedProductDescription(input: PersonalizedProductDescriptionInput): Promise<PersonalizedProductDescriptionOutput> {
  return personalizedProductDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedProductDescriptionPrompt',
  input: { schema: PersonalizedProductDescriptionInputSchema },
  output: { schema: PersonalizedProductDescriptionOutputSchema },
  prompt: `You are an AI assistant tasked with generating a compelling and personalized product description for PEI (Individualized Educational Plan) models.

The product is a collection of more than 200 ready-to-use and 100% editable PEI models, planned by education professionals. They are suitable for Fundamental I and II, but are editable to adapt for ANY grade and special needs. The models are designed to save time, ensure professional results, and impress coordinators and parents.

Your goal is to highlight the benefits and features of this product in a way that directly addresses the user's expressed needs and challenges, as gathered from their quiz responses below. Emphasize how the product solves their specific problems and speaks to their urgency and emotional goals.

--- User's Quiz Responses ---

Question 1: "Quando você pensa em elaborar um PEI, o que passa pela sua cabeça?"
Answer 1: "{{{q1Answer}}}"

Question 2: "Quando você precisa entregar um PEI, como costuma resolver?"
Answer 2: "{{{q2Answer}}}"

Question 3: "Quanto tempo você costuma gastar para elaborar UM PEI?"
Answer 3: "{{{q3Answer}}}"

Question 4: "Qual é o seu papel na escola?"
Answer 4: "{{{q4Answer}}}"

Question 5: "Qual é o perfil dos seus alunos que precisam de PEI?"
Answer 5: "{{{q5Answer}}}"

Question 6: "Você tem algum PEI para entregar nos próximos dias?"
Answer 6: "{{{q6Answer}}}"

Question 7: "Ter um PEI pronto nas mãos significaria:"
Answer 7: "{{{q7Answer}}}"

---

Based on these answers, generate a personalized, enthusiastic, and problem-solving product description. Focus on the pain points, urgency, and the emotional benefit (Answer 7) revealed by the user.

For example:
- If Answer 7 is about "Dormir tranquila", emphasize how the models provide peace of mind and confidence in the work done.
- If Answer 7 is about "Reconhecimento", highlight how the professional quality of the models will impress coordinators.
- If Answer 7 is about "Ter meu tempo de volta", focus on the hours saved and the elimination of work at home.
- Keep it concise, engaging, and directly responsive to their specific situation.`,
});

const personalizedProductDescriptionFlow = ai.defineFlow(
  {
    name: 'personalizedProductDescriptionFlow',
    inputSchema: PersonalizedProductDescriptionInputSchema,
    outputSchema: PersonalizedProductDescriptionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
