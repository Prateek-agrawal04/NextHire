import CreatedApplications from '@/components/created-applications';
import CreatedJobs from '@/components/created-jobs';
import { useUser } from '@clerk/react';
import React from 'react'
import { BarLoader } from 'react-spinners';

const MyJobs = () => {

  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <BarLoader className='mb-4' width={'100%'} color='#36d7b7' />
  }
  return (
    <div className='mx-5 sm:mx-7 md:mx-11 lg:mx-17'>
      <h1 className='text-3xl sm:text-5xl lg:text-7xl font-bold text-center mb-4'>
        {user?.unsafeMetadata?.role === "candidate" ?
          "My Applications" : "My Jobs"
        }
      </h1>
      {user?.unsafeMetadata?.role === "candidate" ?
          <CreatedApplications/> : <CreatedJobs/>
        }
    </div>
  )
}

export default MyJobs;
