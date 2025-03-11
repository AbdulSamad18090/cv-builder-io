import { signOut } from "next-auth/react";
import React from "react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  return (
    <Button
      onClick={() => {
        signOut({ callbackUrl: "/auth" });
      }}
    >
      <LogOut />
      Sign Out
    </Button>
  );
};

export default LogoutButton;
