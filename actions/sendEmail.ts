import { generateEmailBody, sendEmail } from "./generateEmail";

export async function sendToAll(
  emails: string[],
  content: string,
  subject: string
) {
  const sendPromises = emails.map((email) => send(content, email, subject));

  await Promise.all(sendPromises);
}

async function send(content: string, email: string, subject: string) {
  const emailBody = await generateEmailBody(content, subject);
  await sendEmail(emailBody, email);
}