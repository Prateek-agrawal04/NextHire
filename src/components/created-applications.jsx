import { getApplications } from '@/api/apiApplications';
import useFetch from '@/hooks/use-fetch';
import { useUser } from '@clerk/react';
import React, { useEffect } from 'react'
import ApplicationCard from './application-card';
import { BarLoader } from 'react-spinners';

const CreatedApplications = () => {

    const { user, isLoaded } = useUser();
    const { fn: fnApplications, data: applications, loading: loadingApplications, error: errorApplications } = useFetch(getApplications, { user_id: user.id });

    useEffect(() => {
        fnApplications();
    }, []);

    if (!isLoaded || loadingApplications) {
        return <BarLoader className='mb-4' width={'100%'} color='#36d7b7' />
    }

    if (applications?.length === 0) {
        return <div>No Applications Found</div>
    }

    return (
        <div>
            {applications?.length > 0 &&
                <div className='mt-6 flex flex-col gap-3'>
                    {applications?.map((application) => {
                        return <ApplicationCard key={application.id} application={application} isCandidate={true} />
                    })}
                </div>
            }
        </div>
    )
}

export default CreatedApplications
