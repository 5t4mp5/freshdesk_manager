import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const composeMessage = (subject, body, attachments = []) => {
  return {
    from: 'davids@pricereporter.com',
    to: 'davids@pricereporter.com',
    subject,
    html: body,
    attachments,
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
