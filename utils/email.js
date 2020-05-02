const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");

module.exports = class Email {
  constructor(
    driverinfo,
    username,
    usersurname,
    phone,
    custemail,
    adresse,
    datum,
    von,
    bis
  ) {
    this.driverinfo = driverinfo;
    this.custemail = custemail;
    this.firstName = username;
    this.surname = usersurname;
    this.phone = phone;
    this.adresse = adresse;
    this.datum = datum;
    this.von = von;
    this.bis = bis;
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
      surname: this.surname,
      phone: this.phone,
      custemail: this.custemail,
      adresse: this.adresse,
      datum: this.datum,
      von: this.von,
      bis: this.bis,
      driverinfo: this.driverinfo,
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

  async sendInfos() {
    await this.send("infos", "Congrats!! You have new request!");
  }

  async sendMessage() {
    await this.send("message", "You have new message");
  }
};
