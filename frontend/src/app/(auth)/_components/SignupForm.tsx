"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { useRouter } from "next/navigation";
import { signUpBodySchema } from "@adityaj07/common-app";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icons } from "@/components/icons";
import { userService } from "@/services/userService";

interface SignupFormProps {}

const SignupForm: FC<SignupFormProps> = ({}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpBodySchema>>({
    resolver: zodResolver(signUpBodySchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpBodySchema>) => {
    try {
      setIsSubmitting(true);
      const { name, email, password } = data;
      const requestData = {
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
      };

      const response = await userService.signUp(requestData);

      if (response.success === false) {
        toast({
          description: response.message,
          variant: "destructive",
        });
        return;
      }
      router.replace(`/verify-code/${response.user?.id}`);
    } catch (error) {
      toast({
        description: "Error signing up",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border border-orange-100/50 shadow-2xl shadow-orange-500/5 bg-white/95 backdrop-blur-xl dark:bg-gray-950/95 dark:border-orange-900/30 dark:shadow-orange-500/10">
      <CardHeader className="space-y-3 text-center pb-8">
        <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-gray-100 dark:to-gray-300">
          Create your account
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400 text-base">
          Start sharing your stories today
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Full name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
                      className="h-12 bg-white/80 border-gray-200 rounded-xl transition-all duration-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 focus:bg-white dark:bg-gray-900/80 dark:border-gray-700 dark:focus:border-orange-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      placeholder="Create a strong password"
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
              Create account
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="justify-center pt-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 transition-colors underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignupForm;
