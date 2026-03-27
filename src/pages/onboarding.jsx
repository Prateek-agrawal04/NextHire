import { useUser } from '@clerk/react';
import {BarLoader} from 'react-spinners'
import React from 'react'

const Onboarding = () => {
  const {user, isLoaded}= useUser();
  console.log(user);

  if(!isLoaded){
    return <BarLoader className='mb-4' width={'100%'} color='#36d7b7'/>
  }
  return (
    <div>
      Onboarding
    </div>
  )
}

export default Onboarding;
