import { NextRequest, NextResponse } from 'next/server';
import { generateResponse } from '@/app/actions/openai';

// openAI generate endpoint
export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const result = await generateResponse(prompt);
  return NextResponse.json({ result });
}
