import { createOpenAI } from "@ai-sdk/openai";
import { StreamingTextResponse, streamText } from "ai";

export const dynamic = "force-dynamic";

const groq = createOpenAI({
  apiKey: process.env.GROQ_API_KEY ?? "",
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: groq.chat("llama3-70b-8192"), // llama3-8b-8192 , llama3-70b-8192, llama2-70b-4096,  mixtral-8x7b-32768, gemma-7b-it
      system:
        "You are a proffessional job counsellor and psychologist who talks in light and casual way , always ready to help poeple in need of job and career advice, mental health ,etc.",
      messages,
    });

    return new StreamingTextResponse(result.toAIStream());
  } catch (error) {
    console.log(error);
    throw error;
  }
}
