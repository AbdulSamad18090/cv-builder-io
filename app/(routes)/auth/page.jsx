"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import Login from "./_components/Login";
import Register from "./_components/Register";
import LeftSide from "./_components/LeftSide";
import FormHeader from "./_components/FormHeader";
import Loader from "@/components/loader/Loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AuthPage = () => {
  const [authType, setAuthType] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession(); // Use session hook
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Avoid running if session is still loading

    if (session) {
      router.replace("/dashboard"); // Redirect only if session exists
    }
  }, [session, status, router]);

  // Show loader only if session is being checked
  if (status === "loading" || isLoading) {
    return <Loader loading={true} size={30} speed={700} />;
  }

  return (
    <div className="bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
        {/* Left Side */}
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
              <Register setIsLoading={setIsLoading} />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
