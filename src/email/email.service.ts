import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendUserPassword(email: string, password: string): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.SMTP_FROM || 'no-reply@lms.com',
      to: email,
      subject: 'Your Account Password',
      text: `Your account has been created. Your password is: ${password}`,
    });
  }
}
