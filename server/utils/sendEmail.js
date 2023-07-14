const { createTransport } = require("nodemailer");
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SENDER_EMAIL_ADDRESS } =
  process.env;

const sendMail = async (email, subject, text) => {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const mailOptions = {
    from: SENDER_EMAIL_ADDRESS,
    to: email,
    subject,
    text,
  };

  // transport.sendMail(mailOptions, (err, infor) => {
  //   if (err) return console.log(err);
  //   return infor;
  // });
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error" + error);
      return res.status(500).json({ error });
    } else {
      console.log("Email sent:" + info.response);
      res.status(201).json({ status: 201, info });
    }
  });
};

module.exports = { sendMail };
