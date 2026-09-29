import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import axios from 'axios'
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  let  [isLoading , setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username:"",
    email:"",
    password:""
  });

  const handleChnage =(event)=>{
    const {name, value } = event.target;
    setFormData((preval)=>(
        {...preval, [name]:value}
    ));
  };

  const handleSubmit =async (event)=>{
    event.preventDefault();
    console.log(formData);
    try{
        setIsLoading(true)
        const res  = await axios.post("http://localhost:8080/user/register", formData,{
            headers:{
                "Content-Type":"application/json"
            }
        });

        if(res.data.success){
            navigate("/verify")
            toast.success(res.data.message)

        }

    }catch(err){
        console.log(err);

    }finally{
        setIsLoading= false;

    }
  }

  return (
    <div className="relative flex min-h-svh w-full flex-col bg-green-100">
      <div className="flex flex-1 flex-col to-muted/20">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center space-y-3">
              <h1 className="text-3xl font-bold tracking-tight text-green-600">
                Create Your Account
              </h1>
              <p className="text-grey-600">
                Start Organizing your thoughts and ideas today
              </p>

              <Card className="w-full max-w-sm m-8">
                <CardHeader className="spce-y-2">
                  <CardTitle className="text-2xl text-center text-green-600">
                    Signup
                  </CardTitle>
                  <CardDescription className="text-center">
                    Create Your Account To Get Started With Note App
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  
                    <div className="flex flex-col gap-6">
                      <div className="grid gap-2">
                        <Label htmlFor="fullname">Full Name</Label>
                        <Input
                          id="fullname"
                          type="text"
                          placeholder="Enter Your Full Name "
                          name="username"
                          value={formData.username}
                          onChange={handleChnage}
                          required
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChnage}
                          type="email"
                          placeholder="m@example.com"
                          required
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChnage}
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="Enter  Your Password "
                          />
                          <button variant="ghost"  className="absolute right-0 top-0 h-full px-3 py-1 hover:bg-transparent size-sm" onClick={()=>setShowPassword(!showPassword)} disabled={isLoading}>
                            {
                                showPassword ? (<EyeOff className="w-4 h-4 text-gray-600"/>): (<Eye className="w-4 h-4 text-gray-600"/>)
                            }
                          </button>
                        </div>
                      </div>
                    </div>
                  
                </CardContent>
                <CardFooter className="flex-col gap-2">
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-500" onClick={handleSubmit}>
                    {
                        isLoading ? (
                        <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                        Creating Account...
                        
                        </>
                        ) : "Signup"
                    }
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
