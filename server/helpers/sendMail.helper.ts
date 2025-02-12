import nodeMailer from "nodemailer";
import { logger } from "./log.helper";
import { transport } from "winston";
import { User } from "@prisma/client";

const transporter = nodeMailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: "danishikhwn03@gmail.com",
    pass: "eudf jgci tkrj ifzo",
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
