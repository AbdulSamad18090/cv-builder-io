"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import Login from "./_components/Login";
import Register from "./_components/Register";
import LeftSide from "./_components/LeftSide";
import FormHeader from "./_components/FormHeader";
import Loader from "@/components/loader/Loader";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AuthPage = () => {
  const [authType, setAuthType] = useState("login");
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (!session) {
        router.push("/auth");
      } else {
        router.push("/dashboard");
        setLoading(false);
      }
    };
    checkSession();
  }, [router]);

  // if (loading) {
  //   return (
  //     <div className="h-screen w-full">
  //       <Loader
  //         size={30}
  //         speed={700}
  //         loading={true}
  //         title="Preparing to login"
  //       />
  //     </div>
  //   );
  // }

  return (
    <>
      {/* Loader at the top level */}
      <Loader loading={isLoading} size={30} speed={700} />
      <Loader
        size={30}
        speed={700}
        loading={isLoading}
        title="Preparing to login"
      />
      <div className="bg-background flex items-center justify-center p-4">
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
