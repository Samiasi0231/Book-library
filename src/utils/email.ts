import nodemailer from "nodemailer";

const transporter =
  nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(
      process.env.SMTP_PORT ?? 587,
    ),
    secure:
      Number(
        process.env.SMTP_PORT ?? 587,
      ) === 465,

    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

export async function sendPasswordResetEmail(
  email: string,
  token: string,
) {
  const resetUrl =
    `${process.env.PASSWORD_RESET_URL}?token=${encodeURIComponent(token)}`;

  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: email,
    subject: "Reset your Book Library password",

    text:
      `Reset your password using this link: ${resetUrl}`,

    html: `
      <div>
        <h2>Reset your password</h2>

        <p>
          You requested to reset your Book Library password.
        </p>

        <p>
          <a href="${resetUrl}">
            Reset your password
          </a>
        </p>

        <p>
          This link expires in 1 hour.
        </p>
      </div>
    `,
  });
}