import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Linkedin, Lock, Mail } from "lucide-react";
import React from "react";

const Login = () => {
  return (
    <>
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
              <a href="#" className="text-xs text-rose-500 hover:underline">
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
            <label htmlFor="remember" className="text-sm text-muted-foreground">
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
        <div className="w-full">
          <Button
            variant="outline"
            className="w-full text-blue-600 border-blue-600 hover:text-blue-600"
          >
            <Linkedin className="h-4 w-4 " />
            Linkedin
          </Button>
        </div>
      </CardFooter>
    </>
  );
};

export default Login;
