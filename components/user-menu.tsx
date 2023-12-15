"use client";

import {
  MenuIcon,
  User as UserIcon,
  UserPlus,
  UserCheck,
  CreditCard,
  DoorClosed,
} from "lucide-react";
import Avatar from "./avatar";
import { useCallback, useState } from "react";
import MenuItem from "./menu-item";
import { User } from "@/types";
import { Session } from "next-auth";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface UserMenuProps {
  session: Session;
}

const UserMenu = ({ session }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <DropdownMenu>
      <div className="relative">
        <div className="flex flex-row items-center gap-3">
          <DropdownMenuTrigger asChild>
            <div className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
              <MenuIcon />
              <div className="hidden md:block">
                <Avatar />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mr-20" sideOffset={4}>
            {session?.user ? (
              <>
                <DropdownMenuLabel>{session?.user?.username}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <DoorClosed className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Reservations</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Trips</span>
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <Link href="/login">
                  <DropdownMenuItem>
                    <UserCheck className="mr-2 h-4 w-4" />
                    <span>Sign In</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/signup">
                  <DropdownMenuItem>
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span>Sign Up</span>
                  </DropdownMenuItem>
                </Link>
              </>
            )}
          </DropdownMenuContent>
        </div>
      </div>
    </DropdownMenu>
  );
};

export default UserMenu;
