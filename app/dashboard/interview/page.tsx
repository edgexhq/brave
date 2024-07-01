import { UserButton } from "@clerk/nextjs";
import React from "react";
import AddNewInterview from "@/components/interview/add-new-interview";
import InterviewList from "@/components/interview/interview-list";

export default function InterviewDashboard() {
  return (
    <div className="p-5">
      <div className="h-36 bg-gradient-to-tl from-green-300 via-blue-500 to-purple-600 p-10 rounded-lg mb-10">
        <div className="flex items-center justify-start gap-x-10 mb-10">
          <div>
            <h2 className="font-bold text-3xl text-white mb-2">
              mock interview.
            </h2>
            <h2 className="text-gray-200">
              Create and Start your AI Mock Interview
            </h2>
          </div>

          <AddNewInterview />
        </div>
      </div>

      {/* Previous Interview List  */}
      <InterviewList />
    </div>
  );
}
