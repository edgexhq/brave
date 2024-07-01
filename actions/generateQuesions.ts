"use server";

import { generateObject } from "ai";
import { z } from "zod";
import { createOpenAI } from "@ai-sdk/openai";

export const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});
export async function generateQuestions(inputPrompt: string) {
  console.log(inputPrompt);
  const {
    object: { questions },
  } = await generateObject({
    model: groq.chat("mixtral-8x7b-32768"),
    schema: z.object({
      questions: z.array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      ),
    }),
    prompt: inputPrompt,
  });
  return questions;
}

// console.log(
//   generateQuestions(
//     "job position: junior dev intern, Job Description: react, js, html, css, Years of Experience : 1 , Depending on Job Position, Job Description & Years of Experience give us 6 Interview question along with answer"
//   ).then((questions) => {
//     console.log(questions);
//   })
// );
export default generateQuestions;
