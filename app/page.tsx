"use client";
import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button
        size="sm"
        variant="outline"
        onClick={() => console.log("Beep boop")}
      >
        Sign in
      </Button>
    </main>
  );
}
