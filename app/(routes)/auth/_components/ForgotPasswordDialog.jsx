import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X, Send, CheckCircle, LoaderCircle } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const ForgotPasswordDialog = ({ open, onOpenChange }) => {
  const [email, setEmail] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [activeTab, setActiveTab] = useState("email");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resOTP, setResOTP] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);

  // Timer logic
  useEffect(() => {
    let interval;
    if (timerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setTimerActive(false);
      toast("Your verification code has expired. Please request a new one.");
    }
    return () => clearInterval(interval);
  }, [timerActive, timeRemaining]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const startTimer = () => {
    setTimeRemaining(600); // Reset to 10 minutes
    setTimerActive(true);
  };

  const handleSendCode = async (e) => {
    if (e) e.preventDefault();

    if (!email) {
      toast("Please enter your email address");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/auth/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setResOTP(data.otp);
        setCodeSent(true);
        setActiveTab("otp");
        setOtp("");
        startTimer();
        toast("An OTP has been sent to your email. Please check your inbox.");
      } else {
        toast(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (otp.length !== 5) {
      toast("Please enter the complete 5-digit code");
      return;
    }

    setLoading(true);

    try {
      const isValid = otp === resOTP;

      if (isValid) {
        setOtpVerified(true);
        setActiveTab("change-password");
        setTimerActive(false); // Stop the timer once verified
        toast("Your code has been verified. Please set your new password.");
      } else {
        toast("The code you entered is incorrect. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast("Failed to verify code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const handleChangePassword = async () => {
    if (!newPassword) {
      toast("Please enter a new password");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/auth/reset-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          newPassword,
          otp,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast("Your password has been reset successfully.");
        onOpenChange(false); // Close the dialog
      } else {
        toast("Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);

    try {
      const response = await fetch(`/api/auth/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setResOTP(data.otp);
        startTimer(); // Reset the timer
        toast("A new code has been sent to your email.");
      } else {
        toast(data.error || "Failed to resend code. Please try again.");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast("Failed to resend code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Reset Password
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="otp" disabled={!codeSent}>
              OTP Verification
            </TabsTrigger>
            <TabsTrigger value="change-password" disabled={!otpVerified}>
              Change Password
            </TabsTrigger>
          </TabsList>

          <TabsContent value="email">
            <Card>
              <CardContent className="p-4 pt-6">
                <form onSubmit={handleSendCode} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!email || loading}
                  >
                    {loading ? (
                      <>
                        <LoaderCircle className="mr-2 animate-spin" size={20} />{" "}
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" /> Send Code
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="otp">
            <Card>
              <CardContent className="p-4 pt-6">
                <div className="space-y-6">
                  <div className="space-y-2 text-center">
                    <CardTitle className="text-lg font-medium">
                      Enter Verification Code
                    </CardTitle>
                    <p className="text-sm text-gray-500">
                      We've sent a code to {email}
                    </p>
                    {timerActive && (
                      <p className="text-xs text-gray-500">
                        Code expires in: {formatTime(timeRemaining)}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={5}
                      value={otp}
                      onChange={handleOtpChange}
                      className="justify-center"
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <Button
                    onClick={handleVerify}
                    className="w-full"
                    disabled={otp.length !== 5 || loading}
                  >
                    {loading ? (
                      <>
                        <LoaderCircle className="mr-2 animate-spin" size={20} />{" "}
                        Verifying...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" /> Verify Code
                      </>
                    )}
                  </Button>
                  <div className="flex justify-center">
                    <Button
                      variant="link"
                      size="sm"
                      onClick={handleResendCode}
                      disabled={loading || (timerActive && timeRemaining > 540)} // Disable resend for first minute
                    >
                      Didn't receive a code? Resend
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="change-password">
            <Card>
              <CardContent className="p-4 pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="new-password"
                      className="text-sm font-medium"
                    >
                      New Password
                    </Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="Enter a new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="confirm-password"
                      className="text-sm font-medium"
                    >
                      Confirm Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm your new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Button
                    onClick={handleChangePassword}
                    className="w-full"
                    disabled={
                      !newPassword || newPassword !== confirmPassword || loading
                    }
                  >
                    {loading ? (
                      <>
                        <LoaderCircle className="mr-2 animate-spin" size={20} />{" "}
                        Processing...
                      </>
                    ) : (
                      "Change Password"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <DialogFooter className="flex justify-end">
          <DialogClose asChild>
            <Button variant="outline" size="sm">
              <X className="mr-2 h-4 w-4" /> Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordDialog;
