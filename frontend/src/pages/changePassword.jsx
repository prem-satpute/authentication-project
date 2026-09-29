import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

function ChangePassword() {
    const {email} = useParams();
    const [error, setError]  = useState("");
    const [success , setSuccess] = useState("");
    let  [isLoading ,setIsLoading ]= useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setconfirmPassword]  = useState("");
    const navigate = useNavigate();


    const handleChnagePassword =async ()=>{
        setError("");
        setSuccess("");

        if(!newPassword || !confirmPassword){
            setError("Please fill in all fileds");
            return
        }

        if(newPassword != confirmPassword){
            setError("Password does not Match !!");
            return
        }

        try{
            setIsLoading(true);
            const res  = await axios.post(`http://localhost:8080/user/change-password/${email}`,{
                newPassword,
                confirmPassword
            })

            setSuccess(res.data.message);
            toast.success(res.data.message);
            setTimeout(()=>{
                navigate("/login")

            },1000);

        }catch(err){
            setError(err.response?.data?.message || "Something Went Wrong ")

        }finally{
            setIsLoading(false);
        }
    }



    return ( 
        <div className='min-h-screen  flex items-center justify-center bg-green-100 px-4'>
            <div className='bg-white shadow-md rounded-lg p-5 max-w-md w-full'>
                <h2 className='text-2xl font-semibold mb-4 text-center'>Change Password</h2>
                <p className='text-sm text-gray-500 text-center mb-4'>
                    Set a new Password for <sapn className="font-semibold">{email}</sapn>
                </p>

                {
                    error && <p className='text-red-500 text-sm text-center mb-3'>{error}</p>
                }
                {
                    success && <p className='text-green-500 text-sm mb-3 text-center'>{success}</p>
                }

                <div className='space-y-4'>
                    <Input type="password" placeholder="New Password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
                    <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setconfirmPassword(e.target.value)}/>

                    <Button className="w-full bg-green-500 hover:bg-green-500" disabled={isLoading} onClick={handleChnagePassword} >
                        {
                            isLoading ? <><Loader2 className='animate-spin mr-2 h-4 w-4'/>Changing..</>:"Change Password"
                        }
                    </Button>
                </div>
            </div>

        </div>
     );
}

export default ChangePassword;