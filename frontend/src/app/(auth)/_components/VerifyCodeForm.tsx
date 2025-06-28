"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Icons } from "@/components/icons";
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
import apiClient from "@/lib/apiClient";
import { useRouter } from "next/navigation";

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

      const response = await apiClient.post(`/users/verify-code`, requestData);

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
    <Card className="border border-orange-100/50 shadow-2xl shadow-orange-500/5 bg-white/95 backdrop-blur-xl dark:bg-gray-950/95 dark:border-orange-900/30 dark:shadow-orange-500/10">
      <CardHeader className="space-y-3 text-center pb-8">
        <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-gray-100 dark:to-gray-300">
          Verify your email
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400 text-base">
          Enter the 6-digit code we sent to your email
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center space-y-6">
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup className="gap-3">
                        <InputOTPSlot
                          index={0}
                          className="w-14 h-14 text-xl font-semibold border-gray-200 rounded-xl bg-white/80 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 dark:bg-gray-900/80 dark:border-gray-700"
                        />
                        <InputOTPSlot
                          index={1}
                          className="w-14 h-14 text-xl font-semibold border-gray-200 rounded-xl bg-white/80 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 dark:bg-gray-900/80 dark:border-gray-700"
                        />
                        <InputOTPSlot
                          index={2}
                          className="w-14 h-14 text-xl font-semibold border-gray-200 rounded-xl bg-white/80 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 dark:bg-gray-900/80 dark:border-gray-700"
                        />
                        <InputOTPSlot
                          index={3}
                          className="w-14 h-14 text-xl font-semibold border-gray-200 rounded-xl bg-white/80 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 dark:bg-gray-900/80 dark:border-gray-700"
                        />
                        <InputOTPSlot
                          index={4}
                          className="w-14 h-14 text-xl font-semibold border-gray-200 rounded-xl bg-white/80 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 dark:bg-gray-900/80 dark:border-gray-700"
                        />
                        <InputOTPSlot
                          index={5}
                          className="w-14 h-14 text-xl font-semibold border-gray-200 rounded-xl bg-white/80 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 dark:bg-gray-900/80 dark:border-gray-700"
                        />
                      </InputOTPGroup>
                    </InputOTP>
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
              Verify email
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default VerifyCodeForm;
