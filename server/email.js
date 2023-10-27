const nodemailer = require("nodemailer");

const sendmail = async (options) => {
  const transport = nodemailer.createTransport({
    // host: process.env.EMAIL_HOST,
    // port: process.env.EMAIL_PORT,

    service: "gmail",
    auth: {
      // user: process.env.EMAIL_USERNAME,
      // pass: process.env.EMAIL_PASSWORD,

      user: "prvnkmrg.47@gmail.com",
      pass: "lzhbwbxgfzrcghir",
    },
  });

  const mailOptions = {
    from: "prvnkmrg.472gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transport.sendMail(mailOptions);
};

module.exports = sendmail;
