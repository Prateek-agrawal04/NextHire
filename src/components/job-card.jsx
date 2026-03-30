import { useUser } from '@clerk/react'
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Heart, MapPinIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const JobCard = ({
    Job,
    isMyJob = false,
    savedInit = false,
    onJobSaved = () => { },
}) => {
    const { user } = useUser();

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className='flex justify-between font-bold'>
                        {Job.title}
                        {!isMyJob && (
                            <Trash2Icon size={18} className='text-red-300 cursor-pointe ' />
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
                <CardFooter className='gap-2    '>
                    <Link to={`/job/${Job.id}`} className='flex-1'>
                        <Button variant='secondary' className='w-full'>More Details</Button>
                    </Link>
                    <Heart size={20} stroke='red' fill='red' />
                </CardFooter>
            </Card>
        </>
    )
}

export default JobCard
