import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {openRouter} from '@genkit-ai/openrouter';
import {config} from 'dotenv';

config();

export const ai = genkit({
  plugins: [googleAI(), openRouter({apiKey: process.env.OPENROUTER_API_KEY})],
  model: 'googleai/gemini-2.0-flash',
});
