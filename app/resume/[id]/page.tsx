import FinalResumeView from "@/components/layout/ResumeView";
import React from "react";
import { checkResumeOwnership } from "@/lib/actions/resume.actions";
import { currentUser } from "@clerk/nextjs/server";

const MyResume = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  const isResumeOwner = await checkResumeOwnership(user?.id || "", params.id);

  return <FinalResumeView params={params} isOwnerView={isResumeOwner} />;
};

export default MyResume;
