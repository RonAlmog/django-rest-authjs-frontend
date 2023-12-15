"use client";

import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const formSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Email is required!" })
      .email({ message: "Please enter a valid email" }),
    first_name: z
      .string()
      .min(2, { message: "First name must 2 characters min" }),
    last_name: z
      .string()
      .min(2, { message: "Last name must 2 characters min" }),
    password1: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    password2: z.string(),
  })
  .refine(
    (data) => {
      return data.password1 === data.password2;
    },
    { message: "Password do not match", path: ["password2"] }
  );

const Signup = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      first_name: "",
      last_name: "",
      password1: "",
      password2: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("values", values);
    const credentials = {
      username: values.username,
      email: values.username,
      first_name: values.first_name,
      last_name: values.last_name,
      password1: values.password1,
      password2: values.password2,
    };

    console.log("cred", credentials);

    try {
      const url = "http://127.0.0.1:8000/api/";
      // const url = process.env.NEXTAUTH_BACKEND_URL
      const response = await axios({
        url: `${url}auth/register/`,
        method: "post",
        data: credentials,
      });
      const data = response.data;
      if (data) {
        toast.success("Logged in!");
        router.push("/");
      }
    } catch (error) {
      toast.error("Something went wrong...");
      console.log("error:", error.response.data);
      if (error.response.data) {
        if (error.response.data["username"]) {
          form.setError("username", {
            type: "string",
            message: error.response.data["username"],
          });
        }
        if (error.response.data["password1"]) {
          form.setError("password1", {
            type: "string",
            message: error.response.data["password1"],
          });
        }
        if (error.response.data["password2"]) {
          form.setError("password2", {
            type: "string",
            message: error.response.data["password2"],
          });
        }
      }
    }
  };

  return (
    <div className="w-[400px] mx-auto mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        placeholder="john@gmail.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        placeholder="johny"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        placeholder="Smith"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        type="password"
                        placeholder="Password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password confirm</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        type="password"
                        placeholder="Password confirm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" variant="default">
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
