import { Skeleton } from "@/components/ui/skeleton";
import { type Metadata } from "next";
import { FC, Suspense } from "react";
import SignInForm from "../_components/SignInForm";

export const metadata: Metadata = {
  title: "Sign In | Sudo",
  description: "Sign in to your account.",
};

const SignInFormSkeleton = () => (
  <div className="space-y-6 w-full max-w-md">
    <div className="space-y-3 text-center pb-8">
      <Skeleton className="h-8 w-48 mx-auto" />
      <Skeleton className="h-4 w-64 mx-auto" />
    </div>
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
      <Skeleton className="h-12 w-full rounded-xl" />
    </div>
  </div>
);

const SignIn: FC = () => {
  return (
    <div>
      <Suspense fallback={<SignInFormSkeleton />}>
        <SignInForm />
      </Suspense>
    </div>
  );
};

export default SignIn;
