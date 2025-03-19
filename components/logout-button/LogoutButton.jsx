import { signOut } from "next-auth/react";
import React from "react";
import { Button } from "../ui/button";
import { Power } from "lucide-react";

const LogoutButton = ({ withText = true, variant = "default" }) => {
  return (
    <Button
      size={!withText ? "icon" : "default"}
      variant={variant}
      className={`${!withText && "rounded-full"}`}
      onClick={() => {
        signOut({ callbackUrl: "/auth" });
      }}
    >
      <Power />
      {withText && "Sign Out"}
    </Button>
  );
};

export default LogoutButton;
