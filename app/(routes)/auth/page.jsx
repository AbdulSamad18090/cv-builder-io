"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import Login from "./_components/Login";
import Register from "./_components/Register";
import LeftSide from "./_components/LeftSide";
import FormHeader from "./_components/FormHeader";
import Loader from "@/components/loader/Loader";

const AuthPage = () => {
  const [authType, setAuthType] = useState("login");
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  return (
    <>
      {/* Loader at the top level */}
      <Loader loading={isLoading} size={30} speed={700} />

      <div className="mt-16 bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Left Side - Illustration and Info */}
          <LeftSide />

          {/* Right Side - Auth Form */}
          <Card className="relative lg:col-span-3 border-none bg-background shadow-none backdrop-blur-md rounded-none">
            <FormHeader authType={authType} />

            <Tabs
              defaultValue="login"
              className="w-full"
              onValueChange={setAuthType}
            >
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <Login setIsLoading={setIsLoading} />
              </TabsContent>

              <TabsContent value="register">
                {/* Pass setIsLoading to Register component */}
                <Register setIsLoading={setIsLoading} />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
