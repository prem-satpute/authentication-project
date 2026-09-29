import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Verify() {
    const {token } = useParams();
    const [status, setStatus] = useState("verifying....");
    const navigate  = useNavigate();

    useEffect(()=>{
        const verifyEmail =async ()=>{
            try{
                const res =await axios.post(`http://localhost:8080/user/verify`,{},{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(res);
                if(res.data.success){
                    setStatus("✅ Email Verify Successfully !");
                    setTimeout(()=>{
                        navigate("/login")
                    },1000);
                }else{
                    setStatus("❌ Invalid or Exipred Token ! ")
                }

            }catch(er){
                console.log(err);
                setStatus("❌ verification Failed .Please try again ");
            }
        };

        verifyEmail();
    },[token, navigate])


    return ( 
        <div className='relative flex min-h-svh w-full flex-col bg-green-100'>
            <div className='flex flex-1 items-center justify-center'>
                <div className='bg-white p-6 rounded-xl shadow-md text-center w-[90%] max-w-md'>
                    <h2 className='text-xl font-semibold text-gray-800'>{status}</h2>
                </div>
            </div>
        </div>
     );
}

export default Verify;