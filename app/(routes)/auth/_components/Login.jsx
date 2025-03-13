import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cross, Lock, Mail, X } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ForgotPasswordDialog from "./ForgotPasswordDialog";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  remember: yup.boolean(),
});

const Login = ({ setIsLoading }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [isOpenForgotDialog, setIsOpenForgotDialog] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setIsLoading(true);
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    setLoading(false);
    setIsLoading(false);
    if (result?.error) {
      console.log(result);
      toast("Login Failed. please try again.");
    } else {
      toast("Logged in successfull");
      window.location.href = "/dashboard";
    }
  };

  return (
    <>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                {...register("email")}
                placeholder="email@example.com"
                className="pl-10"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <p
                className="text-xs text-rose-500 hover:underline cursor-pointer"
                onClick={() => {
                  setIsOpenForgotDialog(true);
                }}
              >
                Forgot password?
              </p>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className="pl-10"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Controller
              name="remember"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Checkbox
                  id="remember"
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                />
              )}
            />
            <label htmlFor="remember" className="text-sm text-muted-foreground">
              Remember me
            </label>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-4 border-t pt-4">
        <p className="text-sm text-center text-muted-foreground">
          Or continue with
        </p>
        <div className="w-full">
          <Button
            variant="outline"
            className="w-full flex items-center border-rose-600"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          >
            <FcGoogle className="h-4 w-4" />
            Continue in with Google
          </Button>
        </div>
      </CardFooter>

      {/* Forgot Password Dialog */}
      <ForgotPasswordDialog
        open={isOpenForgotDialog}
        onOpenChange={() => {
          setIsOpenForgotDialog(false);
        }}
      />
    </>
  );
};

export default Login;
