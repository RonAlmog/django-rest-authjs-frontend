"use client";
// Remember you must use an AuthProvider (in layout) for
// client components to useSession
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const ClientPage = () => {
  const {
    data: session,
    status,
    update,
  } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callback=/client");
    },
  });

  return (
    <>
      <h2>Client page</h2>
      <section>
        <p>Name: {session?.user?.username}</p>
        <p>Email: {session?.user?.email}</p>
      </section>
    </>
  );
};

export default ClientPage;
