"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import PulsatingDots from "@/components/ui/LoadingAnimation"
import LinkedIn from "@/components/ui/LinkedInIcon"

interface JobProps {
    job_title: string
    job_location: string
    posted_date: string
    company_name: string
    job_url: string
    company_url: string
}

export default function TopLinkedIn() {

    const [jobs, setJobs] = useState<[]>([]); // Corrected line
    const [jobPosition, setJobPosition] = useState('')
    const [location, setLocation] = useState('')
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)


    const handleJobSearch = async (e:
        any
    ) => {
        e.preventDefault()
        setLoading(true)
        const url = 'https://linkedin-jobs-search.p.rapidapi.com/';
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'x-rapidapi-host': 'linkedin-jobs-search.p.rapidapi.com',
                'x-rapidapi-key': '6c2ecc1cb1msh391f17c98609634p100a4cjsnc4908da78d9a'
            },
            body: JSON.stringify({
                search_terms: jobPosition,
                location: location,
                page: page
            })
        };
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            setLoading(false)
            setJobs(data);
        } catch (error) {
            console.error(error);
            setLoading(false)
        }
    }

    const gotoJob = (url: string) => () => {
        window.open(url, '_blank')
    }

    const pageDown = (e: any) => {
        if (page > 1) {
            setPage(page - 1)
            handleJobSearch(e)
        }
    }

    const pageUp = (e: any) => {
        setPage(page + 1)
        handleJobSearch(e)
    }

    return (
        <div className="w-full flex flex-col gap-8 md:p-5">
            <div className="bg-gradient-to-tl from-green-300 via-blue-500 to-purple-600 p-10 rounded-lg mb-10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-x-10 gap-y-4">
                    <div>
                        <h2 className="font-bold text-3xl text-white mb-2">
                            top jobs you need.
                        </h2>
                        <h2 className="text-gray-200">
                            Search for the Top Jobs on LinkedIn and apply directly.
                        </h2>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                    <Label htmlFor="job-position">Job Position</Label>
                    <Input
                        id="job-position"
                        type="text"
                        placeholder="e.g. Software Engineer"
                        value={jobPosition}
                        onChange={(e) => setJobPosition(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                        id="location"
                        type="text"
                        placeholder="e.g. San Francisco"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>

                <div>
                    <Button onClick={handleJobSearch}>Search</Button>
                </div>
            </div>
            {
                loading && <PulsatingDots />
            }
            {
                ((!jobs.length || jobs.length === 0) && !loading) && (
                    <p className="text-muted-foreground text-center">No jobs found</p>
                )
            }

            {
                (jobs.length && jobs.length !== 0 && !loading) ? (
                    <>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {jobs.length && jobs.map((job: JobProps, index) => (
                                <Card key={index} className="p-4 shadow-md relative transition-all duration-500 hover:scale-105">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <Link href={job.company_url}><h3 className="text-lg font-medium text-blue-500">{job.company_name}</h3></Link>
                                            <p className="text-muted-foreground">{job.job_location}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-muted-foreground">{job.job_title}</p>
                                        <Button onClick={gotoJob(job.job_url)}>Apply</Button>
                                        <LinkedIn className="top-2 right-2 absolute" />
                                    </div>
                                </Card>
                            ))}
                        </div>
                        {/*Prev and Next Buttons*/}
                    </>) : null
            }

            {
                (jobs.length && jobs.length !== 0 && !loading) ? (
                    <div className="flex justify-center mt-4">
                        <Button onClick={(e) => pageDown(e)} disabled={page === 1}>Prev</Button>
                        <Button onClick={(e) => pageUp(e)} className="ml-8">Next</Button>
                    </div>) : null
            }
        </div>
    )
}