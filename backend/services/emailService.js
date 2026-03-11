const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
 service: "gmail",
 auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS
 }
})

async function sendEmail(to, summary){

 await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: to,
  subject: "Sales AI Summary",
  text: summary
 })

}

module.exports = { sendEmail }