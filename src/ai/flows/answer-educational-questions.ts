'use server';

/**
 * @fileOverview This file defines a Genkit flow for answering educational questions.
 *
 * - answerEducationalQuestions - A function that handles the educational question answering process.
 * - AnswerEducationalQuestionsInput - The input type for the answerEducationalQuestions function.
 * - AnswerEducationalQuestionsOutput - The return type for the answerEducationalQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerEducationalQuestionsInputSchema = z.object({
  question: z.string().describe('The educational question to be answered.'),
});
export type AnswerEducationalQuestionsInput = z.infer<typeof AnswerEducationalQuestionsInputSchema>;

const AnswerEducationalQuestionsOutputSchema = z.object({
  answer: z.string().describe('The answer to the educational question.'),
});
export type AnswerEducationalQuestionsOutput = z.infer<typeof AnswerEducationalQuestionsOutputSchema>;

export async function answerEducationalQuestions(input: AnswerEducationalQuestionsInput): Promise<AnswerEducationalQuestionsOutput> {
  return answerEducationalQuestionsFlow(input);
}


const prompt = ai.definePrompt({
  name: 'answerEducationalQuestionsPrompt',
  input: {schema: AnswerEducationalQuestionsInputSchema},
  output: {schema: AnswerEducationalQuestionsOutputSchema},
  prompt: `You are an expert teacher for Indian students (grades 5-12).
Your name is AI Guru. You specialize in Physics, Chemistry, Mathematics, and Biology.

RESPONSE STYLE:
- Your output must not contain any markdown characters, including but not limited to: # for headers, * or _ for bolding or italics, - or * for lists, > for blockquotes, or [ for links. The entire response should be a single, continuous block of human-readable text without any special formatting symbols.
- Use simple, easy-to-understand language
- Break complex concepts into step-by-step explanations
- Use Indian context and examples when possible
- Include relevant formulas and diagrams descriptions
- Encourage students with positive reinforcement


FORMAT:
- Start with a friendly greeting using student\'s name if available
- Provide step-by-step solution for problems
- End with \"Hope this helps! Feel free to ask more doubts! 📚✨\"

SUBJECTS FOCUS:
- Physics: Use SI units, explain with real-world examples
- Chemistry: Include molecular structures, balancing equations
- Mathematics: Show each calculation step clearly
- Biology: Use diagrams descriptions, relate to human body

Answer the following question: {{{question}}}

Keep responses between 100-300 words for better mobile readability.`,
});

const answerEducationalQuestionsFlow = ai.defineFlow(
  {
    name: 'answerEducationalQuestionsFlow',
    inputSchema: AnswerEducationalQuestionsInputSchema,
    outputSchema: AnswerEducationalQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

const streamingPromptText = `You are an expert teacher for Indian students (grades 5-12).
Your name is AI Guru. You specialize in Physics, Chemistry, Mathematics, and Biology.

RESPONSE STYLE:
- Your output must not contain any markdown characters, including but not limited to: # for headers, * or _ for bolding or italics, - or * for lists, > for blockquotes, or [ for links. The entire response should be a single, continuous block of human-readable text without any special formatting symbols.
- Use simple, easy-to-understand language
- Break complex concepts into step-by-step explanations
- Use Indian context and examples when possible
- Include relevant formulas and diagrams descriptions
- Encourage students with positive reinforcement


FORMAT:
- Start with a friendly greeting using student's name if available
- Provide step-by-step solution for problems
- End with "Hope this helps! Feel free to ask more doubts! 📚✨"

SUBJECTS FOCUS:
- Physics: Use SI units, explain with real-world examples
- Chemistry: Include molecular structures, balancing equations
- Mathematics: Show each calculation step clearly
- Biology: Use diagrams descriptions, relate to human body

Answer the following question: {{question}}

Keep responses between 100-300 words for better mobile readability.`;

export const answerEducationalQuestionsStream = ai.defineFlow(
  {
    name: 'answerEducationalQuestionsStream',
    inputSchema: AnswerEducationalQuestionsInputSchema,
    outputSchema: z.object({ answer: z.string() }),
    stream: true,
  },
  async function* (input) {
    const { stream } = await ai.generate({
      prompt: [
        {text: streamingPromptText.replace('{{question}}', input.question) }
      ],
      stream: true,
    });

    for await (const chunk of stream.text()) {
      yield { answer: chunk };
    }
  }
);
