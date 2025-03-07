import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const FormHeader = ({authType}) => {
  return (
    <CardHeader>
      <CardTitle className="text-2xl">
        Welcome to <span className="text-rose-500">Builder.io</span>
      </CardTitle>
      <CardDescription>
        {authType === "login"
          ? "Sign in to continue building your career path"
          : "Create an account to start crafting your perfect CV"}
      </CardDescription>
    </CardHeader>
  );
};

export default FormHeader;
