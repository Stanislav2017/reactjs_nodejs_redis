const nodemailer = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendConfirmationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Confirm email message for ${process.env.API_URL}`,
      html: `
        <div>
          <h1>For confirm email. Please click by link.</h1>
          <a href="${process.env.API_URL}/api/auth/confirm_email/${link}">Click by link for confirm email!</a>
        </div>
      `,
    });
  }
}

module.exports = new MailService();
