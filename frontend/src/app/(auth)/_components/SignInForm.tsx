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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { signInBodySchema } from "@adityaj07/common-app";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icons } from "@/components/icons";
import axios from "axios";

interface SignInFormProps {}

const SignInForm: FC<SignInFormProps> = ({}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

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

      console.log(process.env.NEXT_PUBLIC_BACKEND_URL);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/sign-in`,
        requestData
      );

      if (response.status === 200) {
        toast({
          description: response.data.message,
        });
        router.replace("/");
      }
    } catch (error) {
      toast({
        description: "Error loggin in",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign In</CardTitle>
        <CardDescription>
          Enter your information to sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="potus@joe.com" {...field} />
                  </FormControl>
                  <FormDescription>Enter your email.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormDescription>Enter your password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between items-center">
              <Button type="submit" className="mt-2" disabled={isSubmitting}>
                {isSubmitting && (
                  <Icons.spinner className="mr-2 size-4 animate-spin" />
                )}
                Sign in
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        <div className="text-sm text-muted-foreground">
          New customer?{" "}
          <Link
            href="/sign-up"
            className="text-primary underline-offset-4 transition-colors hover:underline"
          >
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignInForm;
