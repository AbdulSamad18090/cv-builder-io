"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FileText,
  Briefcase,
  User,
  Mail,
  Lock,
  Github,
  GoalIcon,
  //   Google,
} from "lucide-react";

const AuthPage = () => {
  const [authType, setAuthType] = useState("login");

  return (
    <div className="mt-16 bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
        {/* Left Side - Illustration and Info */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="lg:flex items-center gap-2 hidden">
            <FileText className="h-10 w-10 text-rose-500" />
            <h1 className="text-2xl font-bold text-rose-500">Builder.io</h1>
          </div>

          <div className="hidden lg:block">
            <div className="bg-background backdrop-blur-sm p-5">
              <h2 className="text-xl font-semibold text-rose-500 mb-4">
                Build your career story
              </h2>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="bg-rose-100 dark:bg-rose-500 h-8 w-8 rounded-full flex items-center justify-center">
                    <Briefcase className="h-4 w-4 text-rose-500 dark:text-rose-50" />
                  </div>
                  <div>
                    <p className="font-medium">Professional templates</p>
                    <p className="text-sm text-muted-foreground">
                      Stand out with modern designs
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="bg-rose-100 dark:bg-rose-500 h-8 w-8 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-rose-500 dark:text-rose-50" />
                  </div>
                  <div>
                    <p className="font-medium">AI-powered suggestions</p>
                    <p className="text-sm text-muted-foreground">
                      Optimize your content
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="bg-rose-100 dark:bg-rose-500 h-8 w-8 rounded-full flex items-center justify-center">
                    <FileText className="h-4 w-4 text-rose-500 dark:text-rose-50" />
                  </div>
                  <div>
                    <p className="font-medium">Track applications</p>
                    <p className="text-sm text-muted-foreground">
                      Manage your job hunt
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <Card className="lg:col-span-3 border-none bg-background shadow-none backdrop-blur-md rounded-none">
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
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4" />
                      <Input
                        id="email"
                        placeholder="email@example.com"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="#"
                        className="text-xs text-rose-500 hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <label
                      htmlFor="remember"
                      className="text-sm text-muted-foreground"
                    >
                      Remember me
                    </label>
                  </div>

                  <Button className="w-full">Sign In</Button>
                </form>
              </CardContent>

              <CardFooter className="flex flex-col gap-4 border-t pt-4">
                <p className="text-sm text-center text-muted-foreground">
                  Or continue with
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    GitHub
                  </Button>
                </div>
              </CardFooter>
            </TabsContent>

            <TabsContent value="register">
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstname">First Name</Label>
                      <Input id="firstname" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastname">Last Name</Label>
                      <Input id="lastname" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="regemail">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="regemail"
                        placeholder="email@example.com"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="regpassword">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="regpassword"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm text-muted-foreground"
                    >
                      I agree to the{" "}
                      <a href="#" className="text-rose-500 hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-rose-500 hover:underline">
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  <Button className="w-full">Create Account</Button>
                </form>
              </CardContent>

              <CardFooter className="flex flex-col gap-4 border-t pt-4">
                <p className="text-sm text-center text-muted-foreground">
                  Or register with
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="flex items-center gap-2">
                    <GoalIcon className="h-4 w-4" />
                    Google
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    GitHub
                  </Button>
                </div>
              </CardFooter>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
