import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { signUpBodySchema } from "../types/schemas/signUpBodySchema";
import { Env } from "../types/types";
import { getDBInstance } from "../db/utils";
import { sha256 } from "hono/utils/crypto";
import { sendVerificationEmail } from "../lib/sendVerificationEmail";
import { sign } from "hono/jwt";

export const userRouter = new Hono<{ Bindings: Env }>();
const verifyCodeExpiryTime = 15 * 60 * 60; //15 mins code expiry

//sign up endpoint
userRouter.post(
  "/sign-up",
  zValidator("json", signUpBodySchema, (result, c) => {
    if (!result.success) {
      return c.text("Invalid email or password!", 400);
    }
  }),
  async (c) => {
    try {
      const { name, email, password } = c.req.valid("json");
      const prisma = getDBInstance(c);

      // console.log(name, email, password);
      // console.log(c.env.RESEND_API_KEY);

      //Check for existing user
      const existingUser = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      //generate verification code
      const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
      let user;

      if (existingUser) {
        //if user exists and is also verified already
        if (existingUser.isVerified) {
          c.status(409);
          return c.json({
            success: false,
            message: "User with this email already exists",
          });
        } else {
          //user exists but isnt verified and may have put a new password this time while registering, so we will overwrite it and set this current password and send them the verification email

          const hashedPassword = await sha256(password);

          //updating the existing user because he may have put in new name &/or password and already used email
          user = await prisma.user.update({
            data: {
              name,
              password: hashedPassword as string,
              verifyCode: verifyCode,
              verifyCodeExpiry: new Date(Date.now() + verifyCodeExpiryTime),
            },
            where: {
              email: existingUser.email,
            },
            select: {
              id: true,
              name: true,
              email: true,
              bio: true,
              porfilePicture: true,
              createdAt: true,
              isVerified: true,
            },
          });
        }
      } else {
        const hashedPassword = await sha256(password);

        //creating newUser
        user = await prisma.user.create({
          data: {
            email,
            name,
            password: hashedPassword as string,
            isVerified: false,
            verifyCode,
            verifyCodeExpiry: new Date(Date.now() + verifyCodeExpiryTime),
          },
          select: {
            id: true,
            name: true,
            email: true,
            bio: true,
            porfilePicture: true,
            createdAt: true,
            isVerified: true,
          },
        });

        // console.log(newUser);
      }

      //Send verification email
      const emailResponse = await sendVerificationEmail(
        email,
        name,
        verifyCode,
        c.env,
        c
      );

      //creating jwt token
      const token = await sign({ id: user.id }, c.env.JWT_SECRET);

      //email sending fails
      if (!emailResponse.success) {
        return c.json(emailResponse, 500);
      }

      //successful registration
      return c.json(
        {
          succes: true,
          message: "Registration successful. Please verify your email.",
          jwt: token,
          user: user,
        },
        201
      );
    } catch (error) {
      console.error("Some error ocurred.", error);
      return c.json(
        {
          success: false,
          message: "Some error ocurred.",
        },
        500
      );
    }
  }
);
