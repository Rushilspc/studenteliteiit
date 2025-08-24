'use server';

import { analyzeImageDoubts } from '@/ai/flows/analyze-image-doubts';
import { answerEducationalQuestions } from '@/ai/flows/answer-educational-questions';
import { z } from 'zod';

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export async function sendMessageAction(
  message: string,
  photoDataUri?: string,
): Promise<{ answer?: string; error?: string }> {
  try {
    if (photoDataUri) {
       const mimeType = photoDataUri.split(';')[0].split(':')[1];
      if(!ALLOWED_MIME_TYPES.includes(mimeType)) {
        return { error: 'Invalid file type. Please upload an image.' };
      }
      if (photoDataUri.length > MAX_FILE_SIZE * 1.4) { // Base64 is larger than original
        return { error: 'Image is too large. Maximum size is 4MB.' };
      }

      const result = await analyzeImageDoubts({ photoDataUri });
      return { answer: result.response };
    } else {
      const QuestionSchema = z.string().min(1, "Question cannot be empty.").max(1000, "Question is too long.");
      const validation = QuestionSchema.safeParse(message);
      if(!validation.success) {
        return { error: validation.error.errors[0].message };
      }

      const result = await answerEducationalQuestions({ question: message });
      return { answer: result.answer };
    }
  } catch (e) {
    console.error(e);
    return { error: 'Our AI is facing some issues at the moment. Please try again later.' };
  }
}
