import { useUser } from '@clerk/react'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Heart, MapPinIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { saveJob } from '@/api/apiJobs';
import useFetch from '@/hooks/use-fetch';

const JobCard = ({
    Job,
    isMyJob = false,
    savedInit = false,
    onJobSaved = () => { },
}) => {
    const { user } = useUser();
    const [saved, setSaved] = useState(savedInit);

    const { fn: fnSavedJob, data: SavedJob, loading: loadingSavedJob } = useFetch(saveJob, {alreadySaved: saved});

    useEffect(()=>{
        if(SavedJob !== undefined){
            setSaved(SavedJob?.length >0);
        }
    }, [SavedJob])

    const handleSaveJob = async () => {
        await fnSavedJob({
            user_id: user.id,
            job_id: Job.id,
        })
        onJobSaved();
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className='flex justify-between font-bold'>
                        {Job.title}
                        {!isMyJob && (
                            <Trash2Icon size={18} className='text-red-300 cursor-pointer' />
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent className='h-full'>
                    <div className='my-1 flex items-center justify-between'>
                        {Job.company && <img src={Job.company.logo_url} alt={Job.company.name} className='h-6' />}
                        <div className='flex items-center gap-1'>
                            <MapPinIcon size={14} />
                            {Job.location}
                        </div>
                    </div>
                    <hr />
                    <div className='my-1'>
                        {Job.description.substring(0, Job.description.indexOf("."))}
                    </div>
                </CardContent>
                <CardFooter className='gap-2'>
                    <Link to={`/job/${Job.id}`} className='flex-1'>
                        <Button variant='secondary' className='w-full'>More Details</Button>
                    </Link>
                    {isMyJob && (
                        <Button variant='outline' onClick={handleSaveJob} className='cursor-pointer' disabled={loadingSavedJob} >
                            {saved ?
                                <Heart size={20} stroke='red' fill='red' />
                                : <Heart size={20} stroke='red' />
                        }
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </>
    )
}

export default JobCard
