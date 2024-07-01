"use client";

import FormSectioEmailer from '@/components/emailer/FormSectionEmailer';
import { useState } from 'react'
import { TEMPLATE } from '@/components/content/TemplateListSection'
import Templates from '@/app/(data)/Templates'
import { chatSession } from "@/lib/utils/gemini-model";
import { db } from "@/lib/utils/db";
import { AIOutput } from "@/lib/utils/schema";
import moment from 'moment'
import { useUser } from '@clerk/nextjs'
import { Input } from "@/components/ui/input";
import InputBar from "@/components/ui/InputBar";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import dynamic from "next/dynamic";

const OutputSection2 = dynamic(() => import('@/components/emailer/OutputSection2'), { ssr: false });

const page = () => {

    const selectedTemplate: TEMPLATE | undefined = Templates?.find((item) => item.slug === 'email-writeup');

    const [loading, setLoading] = useState(false);
    const [aiOutput, setAiOutput] = useState<string>('');
    const { user } = useUser();
    /**
     * Used to generate content from AI
     * @param formData 
     * @returns 
     */
    const GenerateAIContent = async (formData: any) => {
        setLoading(true);
        const SelectedPrompt = selectedTemplate?.aiPrompt;
        const FinalAIPrompt = JSON.stringify(formData) + ", " + SelectedPrompt;
        const result = await chatSession.sendMessage(FinalAIPrompt);

        setAiOutput(result?.response.text());
        await SaveInDb(JSON.stringify(formData), selectedTemplate?.slug, result?.response.text())
        setLoading(false)
    }

    const SaveInDb = async (formData: any, slug: any, aiResp: string) => {
        const result = await db.insert(AIOutput).values({
            formData: formData,
            templateSlug: slug,
            aiResponse: aiResp,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD/MM/yyyy'),
        });

        console.log(result);
    }

    const [emails, setEmails] = useState<any>([])
    const [inputtedEmail, setInputtedEmail] = useState<string>('')
    const handleAddEmail = () => {
        setEmails(
            emails.concat({
                id: emails.length + 1,
                receiver: inputtedEmail
            })
        )
    }

    return (
        <div>
            <div className='p-5 mb-4 shadow-md border rounded-lg bg-white'>
                <h2 className='font-bold text-2xl mb-2 text-primary'>Scheduler Your Emails</h2>
                <p className='text-gray-500 text-sm'>Schedule your emails from here. You can also ask our AI to generate a template for you</p>
                <form className='mt-6 flex flex-col sm:flex-row justify-between gap-1 sm:gap-16 items-center' onSubmit={(e) => e.preventDefault()}>
                    <div className='my-2 flex flex-1 flex-col w-full gap-2 mb-7'>
                        <label className='font-bold'>Email</label>
                        {/*Email with valiation */}
                        <div className="flex">
                            <Input type='email' name='email' required={true} onChange={(e) => setInputtedEmail(e.target.value)} />
                            <Button type="button" className="ml-2 w-10 h-10 rounded-full p-0" variant={"secondary"} onClick={handleAddEmail}><CirclePlus className="text-blue-500" size={18} /></Button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="pb-10 pt-2">
                <h2 className='font-bold text-2xl mb-2 text-primary'>Check emails that will be receiving it</h2>
                <InputBar
                    emails={emails}
                    setEmails={setEmails}
                />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mb-20'>
                {/* FormSection  */}
                <FormSectioEmailer
                    selectedTemplate={selectedTemplate}
                    userFormInput={(v: any) => GenerateAIContent(v)}
                    loading={loading} />
                {/* OutputSection  */}
                <div className='col-span-2'>
                    <OutputSection2 aiOutput={aiOutput} emails={emails} />
                </div>
            </div>
        </div>
    )
}

export default page
