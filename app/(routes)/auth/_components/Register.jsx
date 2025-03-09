import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

const schema = yup.object().shape({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  terms: yup.bool().oneOf([true], "You must accept the terms and conditions"),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log("Form Data:", data);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (!res.ok) {
        console.error("Registration failed:", responseData.message);
        toast(responseData.message || "Registration failed");
        return;
      }

      console.log("Registration successful:", responseData);
      toast("Registration successful!");
    } catch (error) {
      console.error("Error during registration:", error);
      toast("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstname">First Name</Label>
              <Input
                id="firstname"
                {...register("firstname")}
                placeholder="First Name"
              />
              {errors.firstname && (
                <p className="text-red-500 text-sm">
                  {errors.firstname.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastname">Last Name</Label>
              <Input
                id="lastname"
                {...register("lastname")}
                placeholder="Last Name"
              />
              {errors.lastname && (
                <p className="text-red-500 text-sm">
                  {errors.lastname.message}
                </p>
              )}
            </div>
          </div>

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
            <Label htmlFor="password">Password</Label>
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
              name="terms"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Checkbox
                  id="terms"
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                />
              )}
            />

            <label htmlFor="terms" className="text-sm text-muted-foreground">
              I agree to the{" "}
              <Link href="/terms" className="text-rose-500 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-rose-500 hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-sm">{errors.terms.message}</p>
          )}

          <Button className="w-full" type="submit">
            Create Account
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-4 border-t pt-4">
        <p className="text-sm text-center text-muted-foreground">
          Or register with
        </p>
        <div className="w-full">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 border border-rose-600"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })} // Add callbackUrl for redirection
          >
            <FcGoogle className="h-5 w-5" />
            Register with Google
          </Button>
        </div>
      </CardFooter>
    </>
  );
};

export default Register;
