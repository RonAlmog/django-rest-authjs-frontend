"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  FormDescription,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { EyeIcon, EyeOff, EyeOffIcon, KeySquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link";

const formSchema = z.object({
  email: z
    .string()
    .min(3, { message: "Email is required!" })
    .email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 charachters long" }),
});
type Props = {};

const LoginPage = (props: Props) => {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const showHidePass = () => {
    setShowPass(!showPass);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("values", values);
  };
  return (
    <div className="w-[400px] mx-auto mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="john@gmail.com"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          disabled={isSubmitting}
                          {...field}
                          type={showPass ? "text" : "password"}
                        />
                        <div
                          className="absolute right-4 top-2 p-1 cursor-pointer"
                          onClick={showHidePass}
                        >
                          {showPass ? (
                            <EyeIcon size={18} />
                          ) : (
                            <EyeOffIcon size={18} />
                          )}
                        </div>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={isSubmitting} type="submit" className="w-full">
                <KeySquare className="mr-2 h-4 w-4" /> Log In
              </Button>
              <div className="flex items-center gap-x-2">
                No account yet?{" "}
                <Link
                  href="/signup"
                  className="text-blue-600 underline hover:text-blue-800 transition"
                >
                  Sign up for free
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
