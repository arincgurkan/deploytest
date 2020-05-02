const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");

module.exports = class Email {
  constructor(username, custemail, phone, message) {
    this.custemail = custemail;
    this.firstName = username;
    this.phone = phone;
    this.message = message;
    this.from = `Arinc Gurkan <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    // if (process.env.NODE_ENV === "production") {
    //   // Sendgrid
    //   return nodemailer.createTransport({
    //     service: "SendGrid",
    //     auth: {
    //       user: process.env.SENDGRID_USERNAME,
    //       pass: process.env.SENDGRID_PASSWORD,
    //     },
    //   });
    // }

    return nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "c2ab40643899bc",
        pass: "3243ddffbc5bf7",
      },
    });
  }

  // Send the actual email
  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      phone: this.phone,
      custemail: this.custemail,
      message: this.message,
      subject,
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: "test@gmail.com",
      subject,
      html,
      text: htmlToText.fromString(html),
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendMessage() {
    await this.send("message", "You have new message");
  }
};
