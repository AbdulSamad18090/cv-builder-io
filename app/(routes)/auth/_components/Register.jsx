import React from "react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Linkedin, Lock, Mail } from "lucide-react";

const Register = () => {
  return (
    <>
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
            <label htmlFor="terms" className="text-sm text-muted-foreground">
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

export default Register;
