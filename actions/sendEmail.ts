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

sendToAll(
  ["uiuxarghya@gmail.com", "xevenbiswas@gmail.com", "subha9.5roy350@gmail.com"],
  "AWESOME EMAIILLL BDSFISDB KCABDFDU NIONOASIH EFBIWI",
  "EMAIL TO BITCH"
);
