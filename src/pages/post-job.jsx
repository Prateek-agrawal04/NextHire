import { getCompanies } from '@/api/apiCompanies';
import { addNewJob } from '@/api/apiJobs';
import AddCompanyDrawer from '@/components/add-company-drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import useFetch from '@/hooks/use-fetch';
import { useUser } from '@clerk/react';
import { zodResolver } from '@hookform/resolvers/zod';
import MDEditor from '@uiw/react-md-editor';
import { State } from 'country-state-city';
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import z from 'zod';

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  location: z.string().min(1, { message: "Select a location" }),
  company_id: z.string().min(1, { message: "Select or Add a new Company" }),
  requirements: z.string().min(1, { message: "Requirements are required" }),
});

const PostJob = () => {

  const { user, isLoaded } = useUser();
  const navigate= useNavigate();

  const { fn: fnCompanies, data: companies, loading: loadingCompanies } = useFetch(getCompanies);
  const { fn: fnCreateJob, data: dataCreateJob, loading: loadingCreateJob, error: errorCreateJob } = useFetch(addNewJob);

  const onSubmit= (data)=> {
    fnCreateJob({
      ...data,
      recruiter_id: user.id,
      isOpen: true,
    })
  }

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
  }, [isLoaded]);

  useEffect(()=>{
    if(dataCreateJob?.length> 0){
      console.log(dataCreateJob);
      navigate("/jobs")
    }
  },[loadingCreateJob])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { location: "", company_id: "", requirements: "" },
    resolver: zodResolver(schema),
  });

  if (!isLoaded || loadingCompanies) {
    return (
    <div className='mx-5 sm:mx-7 md:mx-11 lg:mx-17'>
      <BarLoader className='mb-4' width={'100%'} color='#36d7b7' />
    </div>
  );
  }

  if (user?.unsafeMetadata?.role !== 'recruiter') {
    return <Navigate to='/jobs' />
  }

  return (
    <div className='mx-5 sm:mx-7 md:mx-11 lg:mx-17'>
      <h1 className='text-3xl sm:text-5xl lg:text-7xl font-bold text-center mb-4'>Post a Job</h1>
      <form className='flex flex-col gap-2 p-4' onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder='Job Title' {...register('title')} />
        {errors.title && <p className='text-red-500'>{errors.title.message}</p>}

        <Textarea placeholder='Job Description' {...register('description')} />
        {errors.title && <p className='text-red-500'>{errors.description.message}</p>}

        <div className="flex gap-2">
          <Controller
            name='location'
            control={control}
            render={({ field }) => (
              <Select
                value={field.value} onValueChange={field.onChange}
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {State.getStatesOfCountry("IN").map((state) => {
                      return <SelectItem key={state.name} value={state.name}>{state.name}</SelectItem>
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )} />
          <Controller
            name='company_id'
            control={control}
            render={({ field }) => (
              <Select
                value={field.value} onValueChange={field.onChange}
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder="Select Company">
                    {field.value ? companies?.find((com) => com.id === Number(field.value))?.name : "Company"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies?.map((company) => {
                      return <SelectItem key={company.id} value={company.id}>{company.name}</SelectItem>
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )} />
            <AddCompanyDrawer fetchCompanies={fnCompanies} />
        </div>
        {errors.title && <p className='text-red-500'>{errors.location.message}</p>}
        {errors.title && <p className='text-red-500'>{errors.company_id.message}</p>}
        <Controller
          name='requirements'
          control={control}
          render={({ field }) => (
            <MDEditor value={field.value} onChange={field.onChange} />
          )} />
        {errors.title && <p className='text-red-500'>{errors.location.message}</p>}
        {errorCreateJob?.message && <p className='text-red-500'>{errorCreateJob?.message}</p>}
        {loadingCreateJob && <BarLoader className='mb-4' width={'100%'} color='#36d7b7' />}
        <Button type="submit" variant="blue" size="lg" className="mt-2">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default PostJob;
