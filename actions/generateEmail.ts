"use server";

import nodemailer from "nodemailer";

export async function generateEmailBody(content: string, subject1: string) {
  const subject = subject1;
  const body = `
    <div style="font-family:sans;">
    <div style="border: 1px solid #ff4968; padding: 10px; background-color:rgb(56, 23, 29,0.7);border-radius:15px;color:white;">
      ${content}
    </div>
  </div>
      `;

  return { subject, body };
}

const transporter = nodemailer.createTransport({
  pool: true,
  service: "hotmail",
  port: 2525,
  auth: {
    user: "xevenbiswas@outlook.com",
    pass: process.env.EMAIL_PW,
  },
  maxConnections: 1,
});

export const sendEmail = async (emailContent: EmailContent, sendTo: string) => {
  const mailOptions = {
    from: "xevenbiswas@outlook.com",
    to: sendTo,
    html: emailContent.body,
    subject: emailContent.subject,
  };
  await new Promise((resolve, reject) => {
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });
  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
};

type EmailContent = {
  subject: string;
  body: string;
};