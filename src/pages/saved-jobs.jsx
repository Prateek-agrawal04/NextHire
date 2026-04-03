import { getSavedJobs } from '@/api/apiJobs';
import JobCard from '@/components/job-card';
import useFetch from '@/hooks/use-fetch';
import { useUser } from '@clerk/react';
import React, { useEffect } from 'react';
import { BarLoader } from 'react-spinners';

const SavedJobs = () => {

  const {isLoaded}= useUser();
  const { fn: fnSavedJobs, data: dataSavedJobs, loading: loadingSavedJobs, error: errorSavedJobs } = useFetch(getSavedJobs);

  useEffect(() => {
    if (isLoaded) {
      fnSavedJobs();
    }
  }, [isLoaded]);

  if(!isLoaded || loadingSavedJobs){
    return <BarLoader className='mb-4' width={'100%'} color='#36d7b7' />
  }
  return (
    <div className='mx-5 sm:mx-7 md:mx-11 lg:mx-17'>
      <h1 className='text-3xl sm:text-5xl lg:text-7xl font-bold text-center mb-4'>Saved Jobs</h1>
      {(loadingSavedJobs === false) && (
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {dataSavedJobs?.length ? (
              dataSavedJobs.map((savedJob) => {
                return <JobCard key={savedJob.id} Job={savedJob.job} savedInit={true} onJobSaved={fnSavedJobs} />
              })
            ) : (
              <div>No Jobs saved</div>
            )}
          </div>
        )}
    </div>
  )
}

export default SavedJobs;
