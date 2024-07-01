"use client"
import React, { useContext, useState } from 'react'
import FormSection from '../_components/FormSection'
import OutputSection from '../_components/OutputSection'
import { TEMPLATE } from '@/components/content/TemplateListSection'
import Templates from '@/app/(data)/Templates'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { chatSession } from '@/lib/utils/gemini-model'
import { db } from '@/lib/utils/db'
import { AIOutput } from '@/lib/utils/schema'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import ts from 'typescript'

interface PROPS{
    params:{
        'template-slug':string
    }
}


function CreateNewContent(props:PROPS) {
    //@ts-ignore
    const selectedTemplate:TEMPLATE|undefined=Templates?.find((item)=>item.slug==props.params['template-slug']);
    const [loading,setLoading]=useState(false);
    const [aiOutput,setAiOutput]=useState<string>('');
    const {user}=useUser();
    const router=useRouter();
    /**
     * Used to generate content from AI
     * @param formData 
     * @returns 
     */
    const GenerateAIContent=async(formData:any)=>{
        setLoading(true);
        const SelectedPrompt=selectedTemplate?.aiPrompt;
        const FinalAIPrompt=JSON.stringify(formData)+", "+SelectedPrompt;
        const result=await chatSession.sendMessage(FinalAIPrompt);
        
        setAiOutput(result?.response.text());
        await SaveInDb(JSON.stringify(formData),selectedTemplate?.slug,result?.response.text())
        setLoading(false);
    }

    const SaveInDb=async(formData:any,slug:any,aiResp:string)=>{
        const result=await db.insert(AIOutput).values({
            formData:formData,
            templateSlug:slug,
            aiResponse:aiResp,
            createdBy:user?.primaryEmailAddress?.emailAddress,
            createdAt:moment().format('DD/MM/yyyy'),
        });

        console.log(result);
    }
    

  return (
    <div className='p-5'>
        <Link href={"/dashboard/content"}>
            <Button variant="secondary"> <ArrowLeft/> Back</Button>
        </Link>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 py-5 '>
            {/* FormSection  */}
                <FormSection 
                selectedTemplate={selectedTemplate}
                userFormInput={(v:any)=>GenerateAIContent(v)}
                loading={loading} />
            {/* OutputSection  */}
            <div className='col-span-2'>
                <OutputSection aiOutput={aiOutput} />
                </div>
        </div>
    </div>
  )
}

export default CreateNewContent