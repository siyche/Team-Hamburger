import nodemailer from "nodemailer";
import schedule from "node-schedule";

// Called 1 hour before an event to send a reminder
export default function sendEmail(recipientEmail, emailBody) {
  const senderEmail = "calendarhamburger@gmail.com";
  const subjectMessage = "Event Reminder";

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: senderEmail,
      pass: process.env.APP_PASSWORD,
    },
  });

  const mailDetails = {
    from: senderEmail,
    to: recipientEmail,
    subject: subjectMessage,
    text: emailBody,
  };

  transporter.sendMail(mailDetails, (error, info) => {
    if (error) {
      return console.log("❌ Error:", error);
    }
    console.log("✅ Email sent successfully:", info.response);
  });
}
