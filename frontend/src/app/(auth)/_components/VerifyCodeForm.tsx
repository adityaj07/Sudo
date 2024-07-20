"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/icons";
// import { verifyCodeSchema } from "@adityaj07/common-app";
import axios from "axios";

interface VerifyCodeFormProps {}

export const verifyCodeSchema = z.object({
  userId: z.string().uuid(),
  code: z.string().length(6),
});

const VerifyCodeForm: FC<VerifyCodeFormProps> = ({}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const params = useParams<{ userId: string }>();
  const router = useRouter();

  const form = useForm<z.infer<typeof verifyCodeSchema>>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      userId: params.userId,
      code: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: z.infer<typeof verifyCodeSchema>) => {
    try {
      setIsSubmitting(true);
      const { code } = data;
      const requestData = {
        userId: params.userId,
        code,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/verify-code`,
        requestData
      );

      if (response.data.success === true) {
        toast({
          description: response.data.message,
        });
        router.replace(`/sign-in`);
      }
    } catch (error) {
      toast({
        description: "Error verifying the code" + error,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

export default VerifyCodeForm;
