"use client";
// Remember you must use an AuthProvider (in layout) for
// client components to useSession
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";

const ClientPage = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callback=/client");
    },
  });

  return (
    <>
      <h2>Client page</h2>
      {status === "loading" && (
        <div>
          <h2>Loading...</h2>
        </div>
      )}
      {status === "authenticated" && (
        <section>
          <p>Name: {session?.user?.username}</p>
          <p>Email: {session?.user?.email}</p>
        </section>
      )}
    </>
  );
};

export default ClientPage;
