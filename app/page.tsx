// server component!
import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";
import { signIn } from "next-auth/react";

import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <>
        {session ? (
          <p>Name: {session?.user?.username}</p>
        ) : (
          <>
            <h1>Home Page</h1>
            <h1 className="text-5xl">
              This page is protected. login to reaveal
            </h1>
            {/* <Button size="sm" variant="outline" onClick={() => signIn()}>
              Sign in
            </Button> */}
          </>
        )}
      </>
    </main>
  );
}
