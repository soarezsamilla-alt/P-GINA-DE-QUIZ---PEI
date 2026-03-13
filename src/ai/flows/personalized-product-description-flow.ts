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
  q1Answer: z.string().describe("User's answer to 'O que passa pela sua cabeça ao elaborar um PEI?'"),
  q2Answer: z.string().describe("User's answer to 'Como costuma resolver a entrega do PEI?'"),
  q3Answer: z.string().describe("User's answer to 'Quanto tempo gasta para elaborar um PEI?'"),
  q4Answer: z.string().describe("User's answer to 'Qual seu papel na escola?'"),
  q5Answer: z.string().describe("User's answer to 'Qual o perfil dos alunos?'"),
  q6Answer: z.string().describe("User's answer to 'Tem algum PEI para entregar nos próximos dias?'"),
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

Your goal is to highlight the benefits and features of this product in a way that directly addresses the user's expressed needs and challenges, as gathered from their quiz responses below. Emphasize how the product solves their specific problems and speaks to their urgency.

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

---

Based on these answers, generate a personalized, enthusiastic, and problem-solving product description. Focus on the pain points and desires revealed by the user.

For example:
- If the user has an urgent deadline (Q6: "Sim preciso resolver isso agora"), emphasize the IMMEDIATE download and the "plug-and-play" nature of the 200+ models.
- If the user feels insecurity (Q1), highlight the professional foundation and confidence.
- Mention that they are 100% editable and adaptable for any grade.
- Keep it concise, engaging, and directly responsive.`,
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
