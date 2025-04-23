import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    const result = await streamText({
      model: google('models/gemini-2.0-flash-exp'),
      system: 'You are an AI assistant knowledgeable about the DagSwap DEX, a decentralized exchange built on BlockDAG. Answer user questions based only on information you reasonably know about decentralized exchanges and BlockDAG technology. If you dont know the answer, say you dont know. You are a helpful assistant that can help users with their questions about DagSwap.',
      messages,
    });
    console.log( result.finishReason);
    return result.toDataStreamResponse();

  } catch (error) {
    console.error("Error in /api/chat:", error);
    // Check if the error is likely due to a missing API key
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    let status = 500;
    if (errorMessage.includes('API key not found') || errorMessage.includes('invalid api key')) {
       status = 401; // Unauthorized
       console.error("API Key might be missing or invalid.");
    }
    return new Response(JSON.stringify({ error: 'Failed to process chat request', details: errorMessage }), { status: status, headers: { 'Content-Type': 'application/json' } });
  }
} 