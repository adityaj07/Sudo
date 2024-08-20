"use client";

import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  // const isLogin = useAppSelector((state) => state.user.isLogin);
  // const router = useRouter();

  // useEffect(() => {
  //   if (!isLogin) {
  //     router.push("/sign-in");
  //   }
  // }, [isLogin, router]);

  // if (!isLogin) {
  //   return null;
  // }

  return <>{children}</>;
};

export default ProtectedRoute;
