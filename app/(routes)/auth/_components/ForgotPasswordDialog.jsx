import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X, Send, CheckCircle } from "lucide-react";
import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ForgotPasswordDialog = ({ open, onOpenChange }) => {
  const [email, setEmail] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [activeTab, setActiveTab] = useState("email");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSendCode = () => {
    if (email) {
      setCodeSent(true);
      setActiveTab("otp");
      setOtp("");
    }
  };

  const handleVerify = () => {
    if (otp.length === 5) {
      console.log("Verifying OTP:", otp);
      setOtpVerified(true);
      setActiveTab("change-password");
    }
  };

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const resendCode = () => {
    console.log("Resending code to:", email);
    setOtp("");
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
                <div className="space-y-4">
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
                    />
                  </div>
                  <Button
                    onClick={handleSendCode}
                    className="w-full"
                    disabled={!email}
                  >
                    <Send className="mr-2 h-4 w-4" /> Send Code
                  </Button>
                </div>
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
                    disabled={otp.length !== 5}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" /> Verify Code
                  </Button>
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
                    className="w-full"
                    disabled={!newPassword || newPassword !== confirmPassword}
                  >
                    Change Password
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
