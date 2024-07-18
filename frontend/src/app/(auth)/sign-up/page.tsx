import { type Metadata } from "next";
import { FC } from "react";
import SignupForm from "../_components/SignupForm";

interface SignUpProps {}

export const metadata: Metadata = {
  title: "Sign Up | Sudo",
  description: "Sign up for an account",
};

const SignUp: FC<SignUpProps> = ({}) => {
  return (
    <div className="flex justify-center items-center">
      <SignupForm />
    </div>
  );
};

export default SignUp;
