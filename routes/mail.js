"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main(email,text){

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let account = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'in-v3.mailjet.com',
    port: 587,
    auth: {
        user: '9f6c50e015a81a8ecce46b78cfbea463',
        pass: 'f3c7781cf149c0f073ba1229a3236a1f'
    }
});

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Rishabh Sharma" <rish6696.rs@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Test mail", // Subject line
    text: text // plain text body
    // html body
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions)

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports=main;