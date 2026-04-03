import { getCompanies } from '@/api/apiCompanies';
import { getJobs } from '@/api/apiJobs'
import JobCard from '@/components/job-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import useFetch from '@/hooks/use-fetch';
import { useUser } from '@clerk/react'
import { State } from 'country-state-city';
import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners';

const JobListing = () => {

  const { isLoaded, user } = useUser();

  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");

  const { fn: fnJobs, data: Jobs, loading: loadingJobs } = useFetch(getJobs, { location, company_id, searchQuery });
  const { fn: fnCompanies, data: companies, loading: loadingCompanies } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) {
      fnJobs();
    }
  }, [isLoaded, location, company_id, searchQuery]);

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
  }, [isLoaded]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  }

  const clearFilters= ()=> {
    setCompany_id("");
    setLocation("");
    setSearchQuery("");
  }

  if (!isLoaded) {
    return <BarLoader className='mb-4' width={'100%'} color='#36d7b7' />
  }

  return (
    <>
      <div className='mx-5 sm:mx-7 md:mx-11 lg:mx-17'>
        <h1 className='text-3xl sm:text-5xl lg:text-7xl font-bold text-center mb-4'>Latest Jobs</h1>

        <form onSubmit={handleSearch} className='my-2 flex gap-3 h-10'>
          <Input type='text' placeholder="Search Jobs by title..." name='search-query' className='p-4 h-full' />
          <Button type='submit' variant='blue' className='h-full sm:w-28' >Search</Button>
        </form>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-2">
          <Select value={location} onValueChange={(value) => { setLocation(value) }} >
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

          <Select value={company_id} onValueChange={(value) => { setCompany_id(value) }}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder="Select Company" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {companies?.map((company) => {
                  return <SelectItem key={company.id} value={company.id}>{company.name}</SelectItem>
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button onClick={clearFilters} variant='red' className='col-span-2 sm:col-span-1' >Clear Filters</Button>
        </div>
        {loadingJobs && <BarLoader className='mb-4' width={'100%'} color='#36d7b7' />}
        {(loadingJobs === false) && (
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {Jobs?.length ? (
              Jobs.map((Job) => {
                return <JobCard key={Job.id} Job={Job} savedInit={Job?.saved?.length > 0} isMyJob={Job.recruiter_id === user.id} onJobSaved={fnJobs} />
              })
            ) : (
              <div>No Jobs found</div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default JobListing;