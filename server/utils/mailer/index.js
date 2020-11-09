const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
function sendMail({ email, firstName, lastName, message, files }, next) {
  return new Promise((resolve) => {
    (async function () {
      try {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        const testAccount = await nodemailer.createTestAccount();
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
          },
        });

        let attachments = [
          {   // encoded string as an attachment https://stackoverflow.com/a/35178715/9640188
            filename: 'text1.txt',
            content: 'aGVsbG8gd29ybGQh',
            encoding: 'base64'
          }
        ];

        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"Fred Foo 👻" <foo@example.com>', // sender address
          to: email, // list of receivers
          subject: "Saffron order ✔", // Subject line
          text: message, // plain text body
          attachments,
        });

        resolve(`Message sent: ${info.messageId}`);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      } catch (err) {
        next(err);
      }
    })();
  });
};

module.exports = sendMail;
