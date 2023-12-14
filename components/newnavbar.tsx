"use client";

import Container from "./container";
import Logo from "./logo";
import UserMenu from "./user-menu";

type Props = {};

const NewNavbar = (props: Props) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NewNavbar;
