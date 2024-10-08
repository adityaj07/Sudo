import { Context } from "hono";
import { Env } from "../types/types";
import { Resend } from "resend";

interface EmailResponse {
  success: boolean;
  message: string;
  error?: string;
}

export async function sendVerificationEmail(
  name: string,
  email: string,
  userId: string,
  verifyCode: string,
  env: Env,
  c: Context
): Promise<EmailResponse> {
  try {
    // console.log(env.RESEND_API_KEY);
    const resend = new Resend(env.RESEND_API_KEY);

    const emailVerificationLink = `${env.FRONTEND_URL}/verify-code/${userId}`;

    // HTML email template
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #333;">Hello ${name},</h2>
          <p>Thank you for registering an account with us. Please verify your email address by using the OTP below:</p>
          <p style="font-size: 24px; font-weight: bold; color: #333;">${verifyCode}</p>
          <p>Or you can click the link below to verify your email address:</p>
          <a href="${emailVerificationLink}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; background-color: #FA8500; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
          <p>This OTP is valid for 15 minutes. If you did not create an account, please ignore this email.</p>
          <p>Best regards,<br>Sudo</p>
      </div>
    `;

    // console.log(email);

    const result = await resend.emails.send({
      from: "Sudo <noreply@adityaj07.tech>",
      to: `${email}`,
      subject: "Sudo | Verification Code",
      html: htmlContent,
    });

    // console.log("Email send result:", result);

    if (result.error) {
      return {
        success: false,
        message: "Error sending verification email.",
        error: result.error.message,
      };
    }

    return {
      success: true,
      message: "Verification email sent successfully.",
    };
  } catch (error: any) {
    console.error("Error sending verification email", error);
    return {
      success: false,
      message: "Error sending verification email.",
      error: error.message,
    };
  }
}
