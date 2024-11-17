"use-client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useDisconnect } from "@reown/appkit/react";
import { useRouter } from "next/router";

export const Header = () => {
  const { disconnect } = useDisconnect();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex flex-row justify-end gap-2 items-center m-4">
          <div className="flex flex-col justify-end">
            <p className="text-white text-end">Hello, Raccon</p>
            <p className="text-white text-end">Welcome back!</p>
          </div>
          <Avatar className="h-11 w-11">
            <AvatarImage src="https://collectiveshift.io/wp-content/uploads/2021/11/Example-of-Noun.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            disconnect();
            router.push("/");
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
