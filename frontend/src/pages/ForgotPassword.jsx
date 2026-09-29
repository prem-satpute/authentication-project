import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { getData } from "@/context/userContext";
import { Button, Input } from "@base-ui/react";
import axios from "axios";
import { CheckCircle, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function ForgotPaswword() {
  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState("");
  let [email, setEmail] = useState("");
  let [isSubmitted, setIsSubmmited] = useState(false);
  let navigate = useNavigate();
  let { setUser } = getData();

  let handleForgotPassword = async (event) => {
    event.preventDefault();
    try {
      setIsLoading = true;
      const res = await axios.post(
        `http://localhost:8080/user/forgot-password`,
        { email },
      );
      if (res.data.success) {
        navigate(`/verify-otp/${email}`);
        toast.success(res.data.message);
        setEmail("");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="relative flex min-h-svh w-full flex-col bg-green-100">
      <div className="flex flex-1 flex-col">
        {/* main contenet */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center space-y-2 ">
              <h1 className="text-3xl font-bold  tracking-tight text-green-600">
                Reset our Password
              </h1>
              <p className="text-muted-foreground ">
                Enter Your Email Address And We`ll send you instruction to
                resert the your password
              </p>
            </div>
            <Card className="bg-white">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center text-green-600">
                  Forgot Password
                </CardTitle>
                <CardDescription className="text-center">
                  {isSubmitted
                    ? "Check your email for reset instruction"
                    : "Enter your email address to reset your password"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {isSubmitted ? (
                  <div className="py-6 flex felx-col items-center justify-center text-center space-y-4">
                    <div className="bg-primary/10 rounded-full">
                      <CheckCircle className="h-6 w-6 text-primary"></CheckCircle>
                    </div>
                    <div className="space-y-2 ">
                      <h3 className="font-medium text-lg">Check Your Inbox</h3>
                      <p>
                        We`ve Send a password reset link to{" "}
                        <span className="font-medium text-foreground">
                          {email}
                        </span>
                      </p>
                      <p>
                        If You don`t see the email, Check Your Span Folder of{" "}
                        <button
                          onClick={() => setIsSubmmited(false)}
                          className="text-primary hover:underline font-medium"
                        >
                          try again
                        </button>
                      </p>
                    </div>
                  </div>
                ) : (
                  <form className="space-y-4 " onSubmit={handleForgotPassword}>
                    <div className="space-y-2 relative text-gary-800 ">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="m@example.com"
                        required
                        disabled={isLoading}
                        className="rounded-full w-full p-2"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-500 rounded-full p-2">
                    {
                        isLoading ? (
                        <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                        Sending OTP on your mail
                        
                        </>
                        ) : "reset password"
                    }
                  </Button>
                  </form>
                )}
              </CardContent>

              <CardFooter className="flex justify-center ">
                <p>
                  Remember your password{" "}
                  <Link
                    to={"/login"}
                    className="text-green-600 hover:underline font-medium relative"
                  >
                    Login
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPaswword;
