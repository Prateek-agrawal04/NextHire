import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Boxes, BriefcaseBusiness, Download, School } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import useFetch from '@/hooks/use-fetch'
import { updateApplicationStatus } from '@/api/apiApplications'
import { BarLoader } from 'react-spinners'

const ApplicationCard = ({ application, isCandidate = false }) => {

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = application?.resume;
        link.target = "_blank";
        link.click();
    }

    const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
        updateApplicationStatus,
        {
            id: application.id,
        }
    );

    const handleStatusChange = (status) => {
        fnHiringStatus(status);
    };

    return (
        <Card>
            {loadingHiringStatus && <BarLoader width={"100%"} color="#36d7b7" />}
            <CardHeader>
                <CardTitle className='flex justify-between font-bold items-center'>
                    {
                        isCandidate ? `${application?.job?.title} at ${application?.job?.company?.name}` :
                            application?.name
                    }
                    <Download size={18} className="bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer" onClick={handleDownload} />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row justify-between gap-1.5 md:gap-0">
                    <div className="flex gap-2 items-center">
                        <BriefcaseBusiness size={20} /> {application?.experience} years of experience
                    </div>
                    <div className="flex gap-2 items-center">
                        <School size={20} /> {application?.education}
                    </div>
                    <div className="flex gap-2 items-center">
                        <Boxes size={20} /> Skills: {application?.skills}
                    </div>
                </div>
            </CardContent>
            <CardFooter className='flex justify-between'>
                <span>{new Date(application?.created_at).toLocaleString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                })}</span>
                {isCandidate ? <span className='capitalize font-bold'>Status: {application?.status}</span> : <>
                    <Select
                        onValueChange={handleStatusChange}
                        defaultValue={application.status}
                    >
                        <SelectTrigger className="w-52">
                            <SelectValue placeholder="Application Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="applied">Applied</SelectItem>
                            <SelectItem value="interviewing">Interviewing</SelectItem>
                            <SelectItem value="hired">Hired</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                </>}
            </CardFooter>
        </Card>
    )
}

export default ApplicationCard
