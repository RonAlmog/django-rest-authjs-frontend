"use client";

import { useSession } from "next-auth/react";
import Container from "./container";
import Logo from "./logo";
import NavMenu from "./nav-menu";
import UserMenu from "./usermenu";
import { User } from "@/types";
import { Session } from "next-auth";

const Navbar = () => {
  const { data: session } = useSession({
    required: false,
  });

  return (
    <div className="w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />

            <NavMenu />
            <UserMenu session={session as Session} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
