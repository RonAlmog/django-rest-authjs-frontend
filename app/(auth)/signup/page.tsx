"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {};

const Signup = (props: Props) => {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    const email = e.target[0].value;
    const password = e.target[1].value;

    console.log(email, password);
    if (email.length < 3) {
      setError("email is not valid");
      return;
    }
    if (password.length < 3) {
      setError("password is not valid");
      return;
    }
    // call api
    const credentials = {
      username: email,
      password1: password,
      password2: password,
    };
    console.log("credentials", credentials);
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
        console.log("success!", data);
      }
    } catch (error) {
      console.error("error:", error);
    }
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-[#212121] p-8 rounded shadow-sm w-96">
        <h1 className="text-4xl text-center font-semibold mb-8">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full border border-gray-300 text-black rounded px-3 mb-4 focus:ouline-none focus:border-blue-400 focus:text-black"
            placeholder="Email"
            required
          />
          <input
            type="text"
            className="w-full border border-gray-300 text-black rounded px-3 mb-4 focus:ouline-none focus:border-blue-400 focus:text-black"
            placeholder="Password"
            required
          />
          <Button className="w-full" variant="outline">
            Sign Up
          </Button>
          <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
        </form>
        <div className="text-center text-sm text-gray-500 mt-4">- OR -</div>
        <Link
          className="block text-lg text-center text-blue-500 hover:underline mt-2"
          href="/login"
        >
          Login with existing account
        </Link>
      </div>
    </div>
  );
};

export default Signup;
