var nodemailer = require('nodemailer');


// const mailOptions = {
//   // from: 'sender@email.com', // sender address
//   to: 'ahmedalsawi2012@gmail.com', // list of receivers
//   subject: 'Subject of your email', // Subject line
//   html: '<p>Your html here</p>' // plain text body
// };

function sendEmail(mailOptions) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.googlemail.com', // Gmail Host
    port: 465, // Port
    secure: true, // this is true as port is 465
    auth: {
      user: process.env.EMAIL_ACCOUNT,
      pass: process.env.EMAIL_PASSWORD
    }
  });


  transporter.sendMail(mailOptions, function (err, info) {
    if (err)
      console.log(err)
    else
      console.log(info);
  });
}
module.exports = sendEmail;