import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { LogIn } from "lucide-react";

const GetStartedButtton = ({ title = "Get Started For Free" }) => {
  return (
    <Link href={"/auth"}>
      <Button className="gap-1">
        <LogIn className="h-4 w-4" />
        <span>{title}</span>
      </Button>
    </Link>
  );
};

export default GetStartedButtton;
