const { createTransport } = require("nodemailer");

const sendMail = async (email, subject, text) => {
  const transport = createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SENDER_EMAIL_ADDRESS,
    to: email,
    subject:
    text,
  };

  transport.sendMail(mailOptions, (err, infor) => {
    if (err) return console.log(err);
    return infor;
  });
};

module.exports = { sendMail };
