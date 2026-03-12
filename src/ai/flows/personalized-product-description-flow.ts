
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
  q1Answer: z.string().describe("User's answer to 'Você sente insegurança ou dificuldade em elaborar o PEI?'"),
  q2Answer: z.string().describe("User's answer to 'Você já procurou por modelos de PEI prontos?'"),
  q3Answer: z.string().describe("User's answer to 'Você tem dificuldades em elaborar o PEI?'"),
  q4Answer: z.string().describe("User's answer to 'Você é:'"),
  q5Answer: z.string().describe("User's answer to 'Se pudesse investir em modelos prontos e editáveis por um valor acessível, você...'"),
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

The product is a collection of 47 ready-to-use and editable PEI models, planned by education professionals. They are suitable for Fundamental I and II, but are editable to adapt for other grades and needs. The package includes PDF and editable Word formats, totaling 48 pages.

Your goal is to highlight the benefits and features of this product in a way that directly addresses the user's expressed needs and challenges, as gathered from their quiz responses below. Emphasize how the product solves their specific problems.

--- User's Quiz Responses ---

Question 1: "Você sente insegurança ou dificuldade em elaborar o PEI?"
Answer 1: "{{{q1Answer}}}"

Question 2: "Você já procurou por modelos de PEI prontos?"
Answer 2: "{{{q2Answer}}}"

Question 3: "Você tem dificuldades em elaborar o PEI?"
Answer 3: "{{{q3Answer}}}"

Question 4: "Você é:"
Answer 4: "{{{q4Answer}}}"

Question 5: "Se pudesse investir em modelos prontos e editáveis por um valor acessível, você..."
Answer 5: "{{{q5Answer}}}"

---

Based on these answers, generate a personalized, enthusiastic, and problem-solving product description. Focus on the pain points and desires revealed by the user.

For example:
- If the user feels insecurity or difficulty (Q1), strongly emphasize how our ready-made models provide a safe and professional foundation to build upon.
- If the user has tried other models but didn't find what they needed (Q2), highlight the high quality, professionalism, and "exactly what's needed" nature of our specific collection of 47 models.
- If the user wants organization and time-saving, stress the structured content and efficiency.
- If the user has difficulties (Q3), position the product as the solution to ease their burden and increase their confidence.
- Reinforce the immediate value if the user is keen to buy now (Q5).

Start directly with the compelling description. Keep it concise, engaging, and directly responsive to their answers.`,
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
