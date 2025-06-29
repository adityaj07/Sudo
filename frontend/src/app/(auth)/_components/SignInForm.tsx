"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCurrentUser } from "@/lib/slices/userSlice";
import { userService } from "@/services/userService";
import { signInBodySchema } from "@adityaj07/common-app";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface SignInFormProps {}

const SignInForm: FC<SignInFormProps> = ({}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const searchParams = useSearchParams();
  const isDemoMode = searchParams?.get("demo") === "true";

  useEffect(() => {
    if (isDemoMode && !isSubmitting) {
      handleTestLogin();
    }
  }, [isDemoMode]);

  const form = useForm<z.infer<typeof signInBodySchema>>({
    resolver: zodResolver(signInBodySchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInBodySchema>) => {
    try {
      setIsSubmitting(true);
      const { email, password } = data;
      const requestData = {
        email: email.trim(),
        password: password.trim(),
      };

      const response = await userService.signIn(requestData);

      if (response.success === false) {
        toast({
          description: response.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        description: response.message,
      });
      router.replace("/home");
      if (response.user) {
        dispatch(setCurrentUser(response.user));
      }
    } catch (error) {
      console.error(error);
      toast({
        description: "Error signing in",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTestLogin = async () => {
    try {
      setIsSubmitting(true);
      const response = await userService.testLogin();

      if (response.success === false) {
        toast({
          description: response.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        description: `${response.message} 🧪`,
      });

      if (response.user) {
        dispatch(setCurrentUser(response.user));
      }

      router.replace("/home");
    } catch (error) {
      console.error(error);
      toast({
        description: "Error with test login",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border border-orange-100/50 shadow-2xl shadow-orange-500/5 bg-white/95 backdrop-blur-xl dark:bg-gray-950/95 dark:border-orange-900/30 dark:shadow-orange-500/10">
      <CardHeader className="space-y-3 text-center pb-8">
        <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-gray-100 dark:to-gray-300">
          Welcome back
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400 text-base">
          {isDemoMode ? (
            <span className="text-orange-600 dark:text-orange-400">
              🧪 Logging you in with demo account...
            </span>
          ) : (
            "Continue your writing journey"
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Email address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@example.com"
                      className="h-12 bg-white/80 border-gray-200 rounded-xl transition-all duration-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 focus:bg-white dark:bg-gray-900/80 dark:border-gray-700 dark:focus:border-orange-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      className="h-12 bg-white/80 border-gray-200 rounded-xl transition-all duration-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 focus:bg-white dark:bg-gray-900/80 dark:border-gray-700 dark:focus:border-orange-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/25 transition-all duration-200 hover:shadow-xl hover:shadow-orange-500/30 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <Icons.spinner className="mr-2 size-4 animate-spin" />
              )}
              Sign in
            </Button>

            {/* Test Login Button */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-950 px-2 text-gray-500 dark:text-gray-400">
                  Or try demo
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleTestLogin}
              className="w-full h-12 border-orange-200 text-orange-600 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-950 dark:hover:text-orange-300 font-semibold rounded-xl transition-all duration-200 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Icons.spinner className="mr-2 size-4 animate-spin" />
              ) : (
                <span className="mr-2">🧪</span>
              )}
              Demo Login (Test User)
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="justify-center pt-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 transition-colors underline-offset-4 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignInForm;
