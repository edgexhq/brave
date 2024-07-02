"use client";

import generateQuestions from "@/actions/generateQuesions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/lib/utils/db";
import { MockInterview } from "@/lib/utils/schema";
import { useUser } from "@clerk/nextjs";
import { LoaderCircle } from "lucide-react";
import moment from "moment";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

function AddNewInterview() {
  const [openDailog, setOpenDailog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const InputPrompt =
      "Job position - " +
      jobPosition +
      ", Job Description- " +
      jobDesc +
      ", Years of Experience - " +
      jobExperience +
      ", Depending on Job Position, Job Description & Years of Experience, give us minimum " +
      process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +
      " Interview questions for it, with answers";

    try {
      const MockJsonResp = await generateQuestions(InputPrompt);
      const mckId = nanoid(12);

      if (MockJsonResp && MockJsonResp.length > 0) {
        const serializedJsonResp = JSON.stringify(MockJsonResp);
        console.log(serializedJsonResp);
        const resp = await db
          .insert(MockInterview)
          .values({
            mockId: mckId,
            jsonMockResp: serializedJsonResp,
            jobPosition: jobPosition,
            jobDesc: jobDesc,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD-MM-yyyy"),
          })
          .returning({
            mockId: MockInterview.mockId,
            jsonMockResp: MockInterview.jsonMockResp,
          });

        if (resp) {
          setOpenDailog(false);
          router.push("/dashboard/interview/" + resp[0]?.mockId);
          toast.success("Interview created successfully");
        }
      } else {
        console.log("MockJsonResp is undefined or empty");
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
    setLoading(false);
  };
  return (
    <div>
      <div
        className="p-2 border rounded-lg bg-white
        hover:scale-105 hover:shadow-md cursor-pointer
         transition-all border-dashed"
        onClick={() => setOpenDailog(true)}
      >
        <h2 className="text-lg text-black text-center font-semibold">
          + start new.
        </h2>
      </div>
      <Dialog open={openDailog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interviwing
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add Details about yout job position/role, Job description
                    and years of experience
                  </h2>

                  <div className="mt-7 my-3">
                    <label>Job Role/Job Position</label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      required
                      onChange={(event) => setJobPosition(event.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Job Description/ Tech Stack (In Short)</label>
                    <Textarea
                      placeholder="Ex. React, Angular, NodeJs, MySql etc"
                      required
                      onChange={(event) => setJobDesc(event.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Years of experience</label>
                    <Input
                      placeholder="Ex.5"
                      type="number"
                      max="100"
                      required
                      onChange={(event) => setJobExperience(event.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDailog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" /> Generating
                        from AI
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
