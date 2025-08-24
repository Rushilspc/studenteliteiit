'use server';
/**
 * @fileOverview Analyzes an image of a problem and provides assistance.
 *
 * - analyzeImageDoubts - A function that handles the image analysis and provides assistance.
 * - AnalyzeImageDoubtsInput - The input type for the analyzeImageDoubts function.
 * - AnalyzeImageDoubtsOutput - The return type for the analyzeImageDoubts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeImageDoubtsInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a problem, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeImageDoubtsInput = z.infer<typeof AnalyzeImageDoubtsInputSchema>;

const AnalyzeImageDoubtsOutputSchema = z.object({
  response: z.string().describe('The AI tutor response to the image.'),
});
export type AnalyzeImageDoubtsOutput = z.infer<typeof AnalyzeImageDoubtsOutputSchema>;

export async function analyzeImageDoubts(input: AnalyzeImageDoubtsInput): Promise<AnalyzeImageDoubtsOutput> {
  return analyzeImageDoubtsFlow(input);
}

const analyzeImageDoubtsPrompt = ai.definePrompt({
  name: 'analyzeImageDoubtsPrompt',
  input: {schema: AnalyzeImageDoubtsInputSchema},
  output: {schema: z.object({ response: z.string() })},
  prompt: `You are an expert teacher for Indian students (grades 5-12). Analyze the image and provide assistance.

Image: {{media url=photoDataUri}}

Keep responses between 100-300 words for better mobile readability.`,
});

const analyzeImageDoubtsFlow = ai.defineFlow(
  {
    name: 'analyzeImageDoubtsFlow',
    inputSchema: AnalyzeImageDoubtsInputSchema,
    outputSchema: AnalyzeImageDoubtsOutputSchema,
  },
  async input => {
    const {output} = await analyzeImageDoubtsPrompt(input);
    return output!;
  }
);

export const analyzeImageDoubtsStream = ai.defineFlow(
  {
    name: 'analyzeImageDoubtsStream',
    inputSchema: AnalyzeImageDoubtsInputSchema,
    outputSchema: z.object({ answer: z.string() }),
    stream: true,
  },
  async function* (input) {
    const { stream } = await ai.generate({
      prompt: `You are an expert teacher for Indian students (grades 5-12). Analyze the image and provide assistance.

Image: {{media url=${input.photoDataUri}}}

Keep responses between 100-300 words for better mobile readability.`,
      stream: true,
    });

    for await (const chunk of stream.text()) {
      yield { answer: chunk };
    }
  }
);
