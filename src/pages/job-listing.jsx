import { getJobs } from '@/api/apiJobs'
import JobCard from '@/components/job-card';
import useFetch from '@/hooks/use-fetch';
import { useUser } from '@clerk/react'
import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners';

const JobListing = () => {

  const { isLoaded } = useUser();

  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");

  const { fn: fnJobs, data: Jobs, loading: loadingJobs } = useFetch(getJobs, { location, company_id, searchQuery });

  useEffect(() => {
    if (isLoaded) {
      fnJobs();
    }
  }, [isLoaded, location, company_id, searchQuery]);
  // console.log(dataJobs);

  if (!isLoaded) {
    return <BarLoader className='mb-4' width={'100%'} color='#36d7b7' />
  }

  return (
    <>
      <div className='mx-5 sm:mx-7 md:mx-11 lg:mx-17'>
        <h1 className='text-3xl sm:text-5xl lg:text-7xl font-bold text-center mb-4'>Latest Jobs</h1>
        {loadingJobs && <BarLoader className='mb-4' width={'100%'} color='#36d7b7' />}
        {(loadingJobs === false) && (
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {Jobs?.length ? (
              Jobs.map((Job)=>{
                return <JobCard key={Job.id} Job= {Job} />
              })
            ): (
              <div>No Jobs found</div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default JobListing;