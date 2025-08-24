'use server';

import { readableStreamToAsyncGenerator } from '@/lib/utils';
import { analyzeImageDoubtsStream } from '@/ai/flows/analyze-image-doubts';
import { answerEducationalQuestionsStream } from '@/ai/flows/answer-educational-questions';
import { z } from 'zod';
import { streamFlow } from '@genkit-ai/next/server';

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export async function sendMessageAction(
  message: string,
  photoDataUri?: string,
): Promise<AsyncGenerator<{ answer: string } | { error: string }>> {
  try {
    let flow;
    let input;
    
    if (photoDataUri) {
      const mimeType = photoDataUri.split(';')[0].split(':')[1];
      if(!ALLOWED_MIME_TYPES.includes(mimeType)) {
        return readableStreamToAsyncGenerator(new ReadableStream({
          start(controller) {
            controller.enqueue({ error: 'Invalid file type. Please upload an image.' });
            controller.close();
          }
        }));
      }
      if (photoDataUri.length > MAX_FILE_SIZE * 1.4) { // Base64 is larger than original
         return readableStreamToAsyncGenerator(new ReadableStream({
          start(controller) {
            controller.enqueue({ error: 'Image is too large. Maximum size is 4MB.' });
            controller.close();
          }
        }));
      }

      flow = analyzeImageDoubtsStream;
      input = { photoDataUri };

    } else {
      const QuestionSchema = z.string().min(1, "Question cannot be empty.").max(1000, "Question is too long.");
      const validation = QuestionSchema.safeParse(message);
      if(!validation.success) {
        return readableStreamToAsyncGenerator(new ReadableStream({
          start(controller) {
            controller.enqueue({ error: validation.error.errors[0].message });
            controller.close();
          }
        }));
      }
      flow = answerEducationalQuestionsStream;
      input = { question: message };
    }
    
    const stream = await streamFlow(flow, input);
    return readableStreamToAsyncGenerator(stream as ReadableStream<any>);

  } catch (e) {
    console.error(e);
     return readableStreamToAsyncGenerator(new ReadableStream({
      start(controller) {
        controller.enqueue({ error: 'Our AI is facing some issues at the moment. Please try again later.' });
        controller.close();
      }
    }));
  }
}
