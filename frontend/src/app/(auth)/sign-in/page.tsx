import { FC } from "react";
import { type Metadata } from "next";
import SignInForm from "../_components/SignInForm";

export const metadata: Metadata = {
  title: "Sign In | Sudo",
  description: "Sign in to your account.",
};

const SignIn: FC = () => {
  return (
    <div>
      <SignInForm />
    </div>
  );
};

export default SignIn;
