import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import React from 'react'
import { Link } from 'react-router-dom';
import companies from '../data/companies.json';
import faqs from '../data/faqs.json';
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const LandingPage = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  )
  return (
    <main>
      <section>
        <div className='text-center text-4xl sm:text-6xl lg:text-8xl my-6 font-bold'>
          <p>Find your Dream Job</p>
          <p>and get hired</p>
        </div>
        <p className='text-center my-3 md:my-4 lg:my-6 text-xs md:text-sm lg:text-base'>Explore thousands of job listings or find the perfect candidate.</p>
      </section>
      <div className='mx-4 sm:mx-6 md:mx-10 lg:mx-16 flex justify-center gap-3 sm:gap-6 my-3 md:my-4 lg:my-6'>
        <Link to="/jobs">
          <Button variant='blue' size='xl'>Find Job</Button>
        </Link>
        <Link to="/post-job">
          <Button variant='red' size='xl'>Post a Job</Button>
        </Link>
      </div>
      <div className="mx-4 sm:mx-6 md:mx-10 lg:mx-16 overflow-hidden my-4 md:my-5 lg:my-7">
        <Carousel
          opts={{ loop: true }}
          plugins={[plugin.current]}
          className="w-full"
        >
          <CarouselContent className="flex items-center gap-4">
            {companies.map(({ name, path, id }) => (
              <CarouselItem
                key={id}
                className="basis-1/2 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
              >
                <div className="h-16 w-32 flex items-center justify-center">
                  <img
                    src={path}
                    alt={name}
                    className="h-10 object-contain transition duration-3000"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className='mx-4 my-4 sm:mx-6 md:mx-10 lg:mx-16'>
        <img src="banner.png" alt="banner" />
      </div>
      <div className="my-4 mx-4 sm:mx-6 md:mx-10 lg:mx-16 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Search and apply for jobs, track applications, and more.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Post jobs, manage applications, and find the best candidates.
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="my-4 mx-4 sm:mx-6 md:mx-10 lg:mx-16">
        <Accordion
          type="single"
          collapsible>
          {faqs.map(( faq, index) => {
            return (<AccordionItem key={index} value={`item-${index+1}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>)
          })}
        </Accordion>
      </div>
    </main>
  )
}

export default LandingPage;
