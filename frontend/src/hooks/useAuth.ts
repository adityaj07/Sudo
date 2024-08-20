"use client";

import apiClient from "@/lib/apiClient";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setCurrentUser } from "@/lib/slices/userSlice";
import { userService } from "@/services/userService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuth() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.currentUser);
  const isLogin = useAppSelector((state) => state.user.isLogin);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        const response = await userService.userInfo();

        if (response.success && response.user) {
          dispatch(setCurrentUser(response.user));
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        // router.push("/sign-in")
      } finally {
        setLoading(false);
      }
    }

    if (!isLogin) {
      fetchUser();
    }
  }, [dispatch, isLogin]);

  return { user, isLogin, loading };
}
