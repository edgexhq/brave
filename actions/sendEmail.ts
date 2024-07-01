"use server"

import { generateEmailBody, sendEmail } from "./generateEmail";
import {marked} from 'marked';


export async function sendToAll(
  emails: string[],
  content: string,
  subject: string
) {
  const sendPromises = emails.map((email) => send(content, email, subject));

  await Promise.all(sendPromises);
}

async function send(content: string, email: string, subject: string) {
  const htmlContent = marked(content) as string;
  const emailBody = await generateEmailBody(htmlContent, subject);
  await sendEmail(emailBody, email);
}