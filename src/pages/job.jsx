import { getSingleJob, updateHiringStatus } from '@/api/apiJobs';
import ApplicationCard from '@/components/application-card';
import ApplyJobDrawer from '@/components/apply-job';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useFetch from '@/hooks/use-fetch';
import { useUser } from '@clerk/react';
import MDEditor from '@uiw/react-md-editor';
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

const JobPage = () => {

  const { isLoaded, user } = useUser();
  const { id } = useParams();

  const { loading: loadingJob, data: job, fn: fnJob } = useFetch(getSingleJob, { job_id: id });
  const { loading: loadingHiring, fn: fnHiring } = useFetch(updateHiringStatus, { job_id: id });

  const handleStatusChange = (value) => {
    const isOpen = value == "open"
    fnHiring(isOpen).then(() => fnJob());
  }

  useEffect(() => {
    if (isLoaded) fnJob()
  }, [isLoaded]);

  if (!isLoaded || loadingJob) {
    return <BarLoader className='mb-4' width={'100%'} color='#36d7b7' />
  }

  return (
    <div className='mx-5 sm:mx-7 md:mx-11 lg:mx-17 flex flex-col'>
      <div className="flex flex-col-reverse md:flex-row justify-between gap-4 items-center">
        <h1 className='text-3xl sm:text-5xl lg:text-6xl font-bold mb-4'>{job?.title}</h1>
        <img src={job?.company?.logo_url} alt={job?.title} className='h-12' />
      </div>
      <div className="flex justify-between mb-6">
        <div className="flex gap-1 items-center">
          <MapPinIcon size={20} /> {job?.location}
        </div>
        <div className="flex gap-1 items-center">
          <Briefcase size={20} /> {job?.applications?.length} Applicants
        </div>
        <div className="flex gap-1 items-center">
          {job?.isOpen ?
            <>
              <DoorOpen /> Open
            </>
            :
            <>
              <DoorClosed /> Closed
            </>}
        </div>
      </div>
      {loadingHiring && <BarLoader className='mb-4' width={'100%'} color='#36d7b7' />}
      {job?.recruiter_id === user?.id && (
        <Select onValueChange={(value) => { handleStatusChange(value) }} >
          <SelectTrigger className={`w-full text-white! mb-6 ${job?.isOpen ? "bg-green-950!" : "bg-red-950!"}`}>
            <SelectValue placeholder={`Hiring Status ${job?.isOpen ? "(Open)" : "(Close)"}`} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Close</SelectItem>
          </SelectContent>
        </Select>
      )}
      <h2 className='text-2xl sm:text-3xl font-bold mb-2'>About the Job</h2>
      <hr className=' mb-4 border bg-gray-300' />
      <p className='mb-6'>{job?.description}</p>
      <h2 className='text-2xl sm:text-3xl font-bold mb-2'>What we are Looking For</h2>
      <hr className=' mb-4 border bg-gray-300' />
      <MDEditor.Markdown source={job?.requirements} className='bg-transparent sm:text-lg' />

      {job?.recruiter_id !== user?.id &&
        <div className="mt-10 md:mt-20 flex justify-center">
          <ApplyJobDrawer job={job} user={user} fetchJob={fnJob} applied={job?.applications?.find((ap) => ap.candidate_id === user.id)} />
        </div>
      }

      {job?.applications.length > 0 && job.recruiter_id === user.id &&
        <div className='mt-6 flex flex-col gap-2'>
          <h2 className='text-2xl sm:text-3xl font-bold mb-2'>Applications</h2>
          {job?.applications.map((application)=>{
            return <ApplicationCard key={application.id} application={application} />
          })}
        </div>
      }
    </div>
  )
}

export default JobPage;
