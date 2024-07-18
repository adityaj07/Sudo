"use client";

import { FC, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Loader2, AlertCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import { verifyCodeSchema } from "@adityaj07/common-app";

interface VerifyCodeProps {}

const VerifyCode: FC<VerifyCodeProps> = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const router = useRouter();

  const email = useMemo(() => {
    const emailParam = params?.email as string;
    if (!emailParam) {
      setError("Invalid email parameter");
      setIsLoading(false);
      return null;
    }
    try {
      const decodedEmail = decodeURIComponent(emailParam);
      setIsLoading(false);
      return decodedEmail;
    } catch {
      setError("Unable to decode email parameter");
      setIsLoading(false);
      return null;
    }
  }, [params]);

  const form = useForm<z.infer<typeof verifyCodeSchema>>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof verifyCodeSchema>) => {
    if (!email) return;

    try {
      setIsSubmitting(true);
      const { code } = data;
      const requestData = { email, code };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/verify-code`,
        requestData
      );

      if (response.status === 201) {
        toast({
          description: response.data.message,
        });
        router.replace(`/sign-in`);
      }
    } catch (error) {
      toast({
        description: "Error verifying the code",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Card className="w-[300px] text-center">
          <CardHeader>
            <CardTitle>Loading</CardTitle>
          </CardHeader>
          <CardContent>
            <Loader2 className="h-8 w-8 animate-spin mx-auto" />
            <p className="mt-2">Preparing verification...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Card className="w-[300px] text-center">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <AlertCircle className="h-8 w-8 text-red-600 mx-auto" />
            <p className="mt-2">{error}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push("/sign-up")} className="w-full">
              Back to Sign Up
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Verify your email</CardTitle>
        <CardDescription>
          Enter the OTP we sent you on your email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-2" disabled={isSubmitting}>
              {isSubmitting && (
                <Icons.spinner className="mr-2 size-4 animate-spin" />
              )}
              Verify
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default VerifyCode;
