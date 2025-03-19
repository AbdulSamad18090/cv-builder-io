import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

const GoToDashboardButton = () => {
  return (
    <Link href={"/dashboard"}>
      <Button>
        <LayoutDashboard /> Dashboard
      </Button>
    </Link>
  );
};

export default GoToDashboardButton;
