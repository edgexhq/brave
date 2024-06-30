import { UserButton } from "@clerk/nextjs";
import React from "react";
import AddNewInterview from "@/components/interview/add-new-interview";
import InterviewList from "@/components/interview/interview-list";

export default function InterviewDashboard() {
  return (
    <div className="p-5">
      <h2 className="font-bold text-3xl text-black mb-2">mock interview.</h2>
      <h2 className="text-gray-500">
        Create and Start your AI Mock Interview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 my-5 gap-5">
        <AddNewInterview />
      </div>

      {/* Previous Interview List  */}
      <InterviewList />
    </div>
  );
}
