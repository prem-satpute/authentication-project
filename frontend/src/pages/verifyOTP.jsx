import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card,CardTitle, CardDescription, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { CheckCircle, Loader2, RotateCcw, RotateCcwIcon } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function VerifyOtp() {
    let [isVerified , setIsVerified] = useState(false);
    let [error, setError] = useState("");
    let [successMessage, setSuccessMessage] = useState("");
    let [otp , setOtp] = useState(["", "", "", "" ,"",""]);
    let [isLoading , setIsLoading] = useState(false);
    const inputRefs = useRef([]);
    const {email}  = useParams();
    const navigate = useNavigate();



    const handleChange =(index, value)=>{
        if(value.length>1) return ;

        const updatedOtp = [...otp]
        updatedOtp[index] = value;
        setOtp(updatedOtp);
        if(value && index<5 ){
            inputRefs.current[index+1]?.focus();


        }

    };

    const handleVerify = async ()=>{
        const finalOtp = otp.join("");

        if(finalOtp.length != 6){
            setError("Please enter the al 6 digit");
        };

        try{
            setIsLoading= true;
            const res = await axios.post(`http://localhost:8080/user/verify-otp/${email}`,{
                otp:finalOtp
            });

            setSuccessMessage(res.data.message);
            setTimeout(()=>{
                navigate(`/change-password/${email}`)

            },2000)

        }catch(err){
            setError(err.response?.data?.message || "Something went wrong ")
        }finally{
            setIsLoading(false);
        }
    }
    
    const clearOtp = ()=>{
        setOtp(["", "", "", "" ,"",""])
        setError("");
        inputRefs.current[0]?.focus()
    }
    return (  
        <div className=' relative min-h-screen flex flex-col bg-green-100'>
            {/* <>Main Contain</> */}
            <div className='flex-1 flex items-center justify-center p-4'>
                <div className='w-full max-w-md space-y-6'>
                    <div className='text-center space-y-2'>

                        <h1 className='text-3xl font-bold tracking-tight text-green-600'>Verify Your Email </h1>
                        <p className='Text-center'>We`ll send 6-digit verification code to {" "}
                            <span>{"your email"}</span>
                        </p>
                    </div>
                    <Card className="shadow-lg">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl text-center text-green-600">Enter Verification Code</CardTitle>
                            <CardDescription className="text-center">
                                {
                                    isVerified ? "Code verified Successfully ! Redirecting ": "Enter The 6-digit Code sent to your email"
                                }
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {
                                error && (<Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>) 

                            }
                            {
                                successMessage && <p className='text-green-500 text-sm mb-3 text-center'>{successMessage}</p>
                            }
                            {
                                isVerified ? 
                                (
                                    <div className='py-6 flex flex-col items-center justify-center space-y-4'>
                                        <div className='bg-primary/10 rounded-full p-3'>
                                        <CheckCircle className='h-6 w-6 text-primary'></CheckCircle>
                                        </div>
                                        <div className='space-y-2'>
                                            <h3 className='font-medium text-lg '>Verification Successfully !</h3>
                                            <p className='text-muted-foreground'>Your Email has been Verified . you`ll be redirected to reset your password</p>
                                        </div>
                                        <div className='flex items-center space-x-2'>
                                            <Loader2 className='h-4 w-4 animat-spin'></Loader2>
                                            <span className='text-sm text-muted-foreground '>Redirecting...</span>
                                        </div>
                                    </div>
                                ):

                                (
                                    <div className='text-center'>
                                    {/* OTP INPUT */}
                                    <div className='flex justify-between mb-6 text-center' >
                                        {
                                            otp.map((digit, idx)=>(
                                                <Input key={idx}  value={digit} type="text" maxLength={1} className="w-12 h-12 text-center text-xl  font-bold" onChange={(e)=>handleChange(idx,e.target.value)} ref={(el)=>(inputRefs.current[idx] = el)}/>
                                            ))
                                        }
                                    </div>
                                    {/* Action Button */}
                                    <div className='space-y-3'>
                                        <Button className="bg-green-600 w-full hover:bg-green-500" disabled={isLoading || otp.some((digit)=> digit=="")} onClick={handleVerify}>
                                            {
                                                isLoading ? <><Loader2 className='mr-2 h-4 w-4 animate-spin'/> Verifing </> : "Verify Code"
                                            }
                                        </Button>
                                        <Button variant='outline' onClick={clearOtp} className="w-full bg-tranparent " disabled={isLoading || isVerified}>
                                            <RotateCcw/>
                                            Clear
                                        </Button>
                                    </div>
                                    
                                    </div>
                                )
                            }

                            
                        </CardContent>
                        <CardFooter className="flex justify-center">
                            <p className='text-sm text-muted-foreground '>
                                Wrong Email ? {" "}
                                <Link to={"/forgot-password"} className='text-green-600 hover:underline'>Go Back</Link>
                            </p>
                        </CardFooter>
                    </Card>
                    <div className='text-center text-xs text-muted-foreground'>
                        <p>For testing purposes, use code <span className='font-mono font-md'>123456</span></p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default VerifyOtp;