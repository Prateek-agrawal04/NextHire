import { getMyJobs } from '@/api/apiJobs';
import useFetch from '@/hooks/use-fetch';
import { useUser } from '@clerk/react';
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners';
import JobCard from './job-card';

const CreatedJobs = () => {

    const { user, isLoaded } = useUser();
    const { fn: fnMyJobs, data: myJobs, loading: loadingMyJobs, error: errorMyJobs } = useFetch(getMyJobs, { recruiter_id: user.id });

    useEffect(() => {
        fnMyJobs();
    }, []);

    if (!isLoaded || loadingMyJobs) {
        return <BarLoader className='mb-4' width={'100%'} color='#36d7b7' />
    }

    return (
        <div>
            {(loadingMyJobs === false) && (
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {myJobs?.length ? (
                        myJobs.map((Job) => {
                            return <JobCard key={Job.id} Job={Job} isMyJob={true} onJobSaved={fnMyJobs}/>
                        })
                    ) : (
                        <div>You haven't posted any job</div>
                    )}
                </div>
            )}
        </div>
    )
}

export default CreatedJobs
