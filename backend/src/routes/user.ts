import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { Env } from "../types/types";
import { getDBInstance } from "../db/utils";
import { sha256 } from "hono/utils/crypto";
import { sendVerificationEmail } from "../lib/sendVerificationEmail";
import { sign, verify } from "hono/jwt";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import {
  signUpBodySchema,
  signInBodySchema,
  verifyCodeSchema,
} from "@adityaj07/common-app";

export const userRouter = new Hono<{
  Bindings: Env;
  Variables: {
    userId: string;
  };
}>();
const verifyCodeExpiryTime = 15 * 60 * 1000; //15 mins otp code expiry in milliseconds
const cookieMaxAge = 60 * 60 * 24 * 2; //2 days

//AUTH ENDPOINTS START--------

//SIGN UP ENDPOINT
userRouter.post(
  "/sign-up",
  zValidator("json", signUpBodySchema, (result, c) => {
    if (!result.success) {
      return c.json(
        { success: false, message: "Invalid email or password!" },
        400
      );
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

      setCookie(c, "token", token, {
        secure: true,
        httpOnly: true,
        maxAge: cookieMaxAge,
      });

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

//SIGN IN ENDPOINT
userRouter.post(
  "/sign-in",
  zValidator("json", signInBodySchema, (result, c) => {
    if (!result.success) {
      return c.json(
        { success: false, message: "Invalid email or password!" },
        400
      );
    }
  }),
  async (c) => {
    try {
      const { email, password } = c.req.valid("json");
      const prisma = getDBInstance(c);
      let user;

      //Check for existing user
      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      console.log(existingUser);

      if (!existingUser) {
        return c.json(
          {
            success: false,
            message: "User with this email doesnt exists.",
          },
          404
        );
      }

      const hashedPassword = await sha256(password);

      //Check for user credentials
      user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      //creating jwt token
      const token = await sign({ id: user?.id }, c.env.JWT_SECRET);

      if (!user) {
        return c.json(
          { success: false, message: "Incorrect email or password" },
          403
        );
      }

      if (!(user?.password === hashedPassword)) {
        return c.json(
          {
            success: false,
            message: "Incorrect email or password",
          },
          409
        );
      }

      if (!user.isVerified) {
        return c.json(
          {
            success: false,
            message: "Please verify your account before loggin in.",
          },
          403
        );
      }

      user = await prisma.user.findUnique({
        where: {
          email,
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

      setCookie(c, "token", token, {
        secure: true,
        httpOnly: true,
        maxAge: cookieMaxAge,
      });

      return c.json(
        {
          success: true,
          jwt: token,
          message: "Logged in successfully.",
          user: user,
        },
        200
      );
    } catch (error) {}
  }
);

//VERIFY VERIFICATION CODE ENDPOINT
userRouter.post(
  "/verify-code",
  zValidator("json", verifyCodeSchema, (result, c) => {
    if (!result.success) {
      return c.json({ success: false, message: "Incorrect OTP!" }, 400);
    }
  }),
  async (c) => {
    try {
      const prisma = getDBInstance(c);
      const { email, code } = c.req.valid("json");
      const decodedEmail = decodeURIComponent(email);

      const user = await prisma.user.findUnique({
        where: {
          email: decodedEmail,
        },
      });

      if (!user) {
        return c.json(
          {
            success: false,
            message: "User not found. Try signing up.",
          },
          404
        );
      }

      const isCodeValid = user.verifyCode === code;
      const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

      if (isCodeValid && isCodeNotExpired) {
        const result = await prisma.user.update({
          data: {
            isVerified: true,
          },
          where: {
            email: decodedEmail,
          },
        });

        if (!result) {
          return c.json(
            {
              success: false,
              message: "User couldnt be verified successfully. Sign up again.",
            },
            500
          );
        }

        return c.json(
          {
            success: true,
            message: "User verified successfully.",
          },
          200
        );
      } else if (!isCodeNotExpired) {
        console.log(isCodeNotExpired);

        return c.json(
          {
            success: false,
            message: "Verfication code has expired. Please sign up again.",
          },
          500
        );
      } else {
        return c.json(
          {
            success: false,
            message: "Verfication code is incorrect.",
          },
          500
        );
      }
    } catch (error) {
      console.log("Error verifying the user", error);
      return c.json(
        {
          success: false,
          message: "Error verifying the user.",
        },
        500
      );
    }
  }
);

//AUTH MIDDLEWARE => Endpoints above this are unprotected
userRouter.use("/*", async (c, next) => {
  const tokenFromCookie = getCookie(c, "token");

  if (!tokenFromCookie) {
    return c.json(
      {
        success: false,
        message: "Authentication token is missing.",
      },
      401
    );
  }
  const user = await verify(tokenFromCookie, c.env.JWT_SECRET);
  if (user && typeof user.id === "string") {
    c.set("userId", user.id);
    return next();
  } else {
    return c.json({ success: false, message: "Unauthorized" }, 403);
  }
});

//LOGOUT ENDPOINT
userRouter.post("/logout", async (c) => {
  try {
    const userId = c.get("userId");
    const deletedCookie = deleteCookie(c, "token", {
      secure: true,
    });

    if (!deletedCookie) {
      return c.json({ success: false, message: "Error logging out." }, 500);
    }

    return c.json({ success: true, message: "Logged out successfully" }, 200);
  } catch (error) {
    console.error("Logout error:", error);
    return c.json({ success: false, message: "Error during logout" }, 500);
  }
});

//AUTH ENDPOINTS END--------

//USER ENDPOINTS START--------

//GET A USER BY id
userRouter.get("/:id", async (c) => {
  const prisma = getDBInstance(c);
  const userId = c.req.param("id");
  const authorizedUserId = c.get("userId");

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return c.json(
        {
          success: false,
          message: "User does not exist.",
        },
        404
      );
    }

    return c.json(
      {
        user,
        isAuthorizedUser: authorizedUserId === userId,
        success: true,
        message: "User found",
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        success: false,
        message: "Some error occured fetching the user.",
        error: error,
      },
      500
    );
  }
});

//TODO: UPDATE A USER
// userRouter.put("/update-user", async (c) => {

// });

//DELETE A USER
userRouter.delete("/:id", async (c) => {
  try {
    const prisma = getDBInstance(c);
    const userId = c.req.param("id");
    const authorizedUserId = c.get("userId");

    if (authorizedUserId !== userId) {
      return c.json(
        {
          success: false,
          message: "Unauthorized to delete.",
        },
        401
      );
    }

    const deletedUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    if (!deletedUser) {
      return c.json(
        {
          success: false,
          message: "Error deleting the user.",
        },
        500
      );
    }

    return c.json(
      {
        success: true,
        message: "User deleted successfully.",
      },
      200
    );
  } catch (error) {
    console.error(error);
    return c.json(
      {
        success: false,
        message: "Error deleting user.",
        error: error,
      },
      500
    );
  }
});
