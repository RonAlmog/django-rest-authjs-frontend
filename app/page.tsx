"use client";
import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";
import { signIn } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Home Page</h1>
      <Button size="sm" variant="outline" onClick={() => signIn()}>
        Sign in
      </Button>
    </main>
  );
}
