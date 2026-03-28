import { useUser } from '@clerk/react';
import {BarLoader} from 'react-spinners'
import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const {user, isLoaded}= useUser();
  const navigate= useNavigate();

  const handleRoleSelection= async (role)=>{
    await user.update({
      unsafeMetadata: {role},
    }).then(()=>{
      navigate(role === "recruiter"? "/post-job": "/jobs");
    }).catch((err)=>{
      console.log("Error updating role: ", err);
    });
  }

  useEffect(()=>{
    if(user?.unsafeMetadata?.role){
      navigate(user?.unsafeMetadata?.role === "recruiter"? "/post-job": "/jobs")
    }
  }, [user]);

  if(!isLoaded){
    return <BarLoader className='mb-4' width={'100%'} color='#36d7b7'/>
  }
  return (
    <>
    <div className='flex flex-col text-center mt-40 justify-center mx-5 sm:mx-7 md:mx-11 lg:mx-17'>
      <h1 className='text-4xl sm:text-6xl lg:text-8xl font-bold'>I am a...</h1>
      <div className='grid grid-cols-4 gap-4 my-4'>
        <Button variant='blue' className='text-2xl col-span-2 h-25 md:h-36' onClick={()=>{handleRoleSelection("candidate")}} >Candidate</Button>
        <Button variant='red' className='text-2xl col-span-2 h-25 md:h-36' onClick={()=>{handleRoleSelection("recruiter")}} >Recruiter</Button>
      </div>
    </div>
    </>
  )
}

export default Onboarding;
