import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const composeMessage = (id, subject, description) => {
  return {
    from: 'davids@pricereporter.com',
    to: 'davids@pricereporter.com',
    subject: `Freshdesk Ticket ${id}: ${subject}`,
    html: `<div><a href=https://pricereporter.freshdesk.com/a/tickets/${id}>TICKET</a></div>${description}`,
  };
};

const sendEmail = (id, subject, description) => {
  const message = composeMessage(id, subject, description);
  return new Promise((res, rej) => {
    transport.sendMail(message, (err, data) => {
      if (err) rej(err);
      res(data);
    });
  });
};

export default sendEmail;
