import React, { useEffect } from 'react'
import z from 'zod'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { addNewCompany } from '@/api/apiCompanies'
import useFetch from '@/hooks/use-fetch'
import { BarLoader } from 'react-spinners'

const schema = z.object({
    name: z.string().min(1, { message: "Company name is required" }),
    logo: z.any().refine((file) =>
        file[0] && (file[0].type === 'image/png' || file[0].type === 'image/jpeg')
    , { message: "Only Image is allowed" }),
})

const AddCompanyDrawer = ({ fetchCompanies }) => {

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schema)
    });

    const { fn: fnAddCompany, error: errorAddCompany, data: dataAddCompany, loading: loadingAddCompany } = useFetch(addNewCompany);

    const onSubmit = (data) => {
        fnAddCompany({
            ...data,
            logo: data.logo[0]
        })
    }

    useEffect(()=>{
        if(dataAddCompany?.length >0) fetchCompanies()
    }, [loadingAddCompany])

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant='secondary' size='sm' type='button'>Add Company</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Add New Company</DrawerTitle>
                </DrawerHeader>
                <form className="flex flex-col sm:flex-row gap-2 mx-5 sm:mx-7 md:mx-11 lg:mx-17">
                    <Input
                        type='text'
                        placeholder='Company Name'
                        className='flex-1'
                        {...register("name")}
                    />
                    <Input
                        type='file'
                        accept='image/*'
                        className='flex-1 file:text-gray-300'
                        {...register("logo")}
                    />
                    <Button type='button' onClick={handleSubmit(onSubmit)} variant='red' className='w-full sm:w-40'>Add</Button>
                </form>
                <div className='mx-5 sm:mx-7 md:mx-11 lg:mx-17'>
                    {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    {errors.logo && <p className='text-red-500'>{errors.logo.message}</p>}
                    {errorAddCompany?.message && <p className='text-red-500'>{errorAddCompany?.message}</p>}
                </div>
                {loadingAddCompany && <BarLoader className='mb-4 mt-4' width={'100%'} color='#36d7b7' />}
                <DrawerFooter className='mx-5 sm:mx-7 md:mx-11 lg:mx-17 px-0'>
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default AddCompanyDrawer
