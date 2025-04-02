
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { MailCheck } from "lucide-react";

interface OTPVerificationProps {
  username: string;
  onVerify: (isVerified: boolean) => void;
  onCancel: () => void;
}

export const OTPVerification = ({ username, onVerify, onCancel }: OTPVerificationProps) => {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();

  // For demo purposes, the correct OTP is always "123456"
  const correctOtp = "123456";

  const handleVerify = () => {
    setIsVerifying(true);
    
    // Simulate API call delay
    setTimeout(() => {
      if (otp === correctOtp) {
        toast({
          title: "Success",
          description: "OTP verified successfully",
        });
        onVerify(true);
      } else {
        toast({
          title: "Verification Failed",
          description: "Invalid OTP code. Please try again.",
          variant: "destructive",
        });
        setOtp("");
      }
      setIsVerifying(false);
    }, 1500);
  };

  const handleResendOTP = () => {
    toast({
      title: "OTP Resent",
      description: `A new OTP has been sent to your registered email/phone (For demo: use 123456)`,
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-t-4 border-t-primary animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-center mb-4">
          <div className="bg-primary/10 p-4 rounded-full">
            <MailCheck className="h-8 w-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-center">Verification Required</CardTitle>
        <CardDescription className="text-center">
          Enter the 6-digit code sent to your registered email or phone
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-6">
          <div className="w-full flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
              render={({ slots }) => (
                <InputOTPGroup>
                  {slots.map((slot, index) => (
                    <InputOTPSlot key={index} index={index} {...slot} />
                  ))}
                </InputOTPGroup>
              )}
            />
          </div>
          
          <p className="text-sm text-muted-foreground text-center mt-2">
            For demo purposes, use <span className="font-bold">123456</span>
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-3">
        <Button 
          className="w-full" 
          onClick={handleVerify}
          disabled={otp.length !== 6 || isVerifying}
        >
          {isVerifying ? "Verifying..." : "Verify OTP"}
        </Button>
        <div className="flex w-full justify-between">
          <Button variant="link" onClick={onCancel} className="text-sm">
            Back to Login
          </Button>
          <Button variant="link" onClick={handleResendOTP} className="text-sm">
            Resend OTP
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
