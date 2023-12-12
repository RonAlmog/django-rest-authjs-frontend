"use client";

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
    <section>
      <p>Name: {session?.user?.name}</p>
      <p>Email: {session?.user?.email}</p>
    </section>
  );
};

export default ClientPage;
