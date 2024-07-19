import React, { use } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { checkResumeOwnership } from "@/lib/actions/resume.actions";
import { redirect } from "next/navigation";
import ResumeEditor from "@/components/layout/my-resume/ResumeEditor";

const EditResume = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  const isResumeOwner = await checkResumeOwnership(user?.id || "", params.id);

  if (!isResumeOwner) {
    return redirect("/dashboard");
  }

  return (
    <>
      <ResumeEditor params={params} userId={user?.id} />
    </>
  );
};

export default EditResume;
