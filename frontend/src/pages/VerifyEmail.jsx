import React from 'react'

function VerifyEmail() {
    return ( 
        <div className='relative flex min-h-svh w-full flex-col bg-green-100'>
            <div className='flex flex-1 items-center justify-center px-4'>
            <div className='bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center'>
                <h2 className='text-2xl font-semibold text-green-700 mb-4'>✅ Check Your Email</h2>
                <p className='text-gray-400 text-sm'>
                    We`ve send you an email to verify your account. Please check your inbox click the vreification Link `
                </p>
            </div>
            </div>
        </div>
     );
}

export default VerifyEmail;