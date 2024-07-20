import { FC } from "react";
import VerifyCodeForm from "../../_components/VerifyCodeForm";
import { Metadata } from "next";

interface VerifyCodeProps {}

export const metadata: Metadata = {
  title: "Verify your email | Sudo",
  description: "Verify yourself  with the email Sudo sent to your email.",
};

const VerifyCode: FC<VerifyCodeProps> = ({}) => {
  return (
    <div>
      <VerifyCodeForm />
    </div>
  );
};

export default VerifyCode;
