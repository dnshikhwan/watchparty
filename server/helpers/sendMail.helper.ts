import nodeMailer from "nodemailer";
import { logger } from "./log.helper";
import { User } from "@prisma/client";
import { configs } from "../configs";

const transporter = nodeMailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: configs.GMAIL_USER,
    pass: configs.GMAIL_PASS,
  },
  secure: true,
});

const sendMail = async (user: User, subject: string, html: string) => {
  try {
    await transporter.sendMail({
      from: "support@watchparty.com",
      to: user.email,
      subject,
      html: `${html}`,
    });
  } catch (err) {
    logger.error("Error sending email to user : ", err);
  }
};

export default sendMail;
