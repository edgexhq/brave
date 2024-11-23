"use client";

import AddResume from "../common/AddResume";
import ResumeCard from "../common/ResumeCard";
import { fetchUserResumes } from "@/lib/actions/resume.actions";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

const DashboardCards = () => {
  const user = useUser();
  const userId = user?.user?.id;
  const [resumeList, setResumeList] = useState(null as any);

  const loadResumeData = async () => {
    try {
      const resumeData = await fetchUserResumes(userId || "");

      setResumeList(JSON.parse(resumeData as any));
    } catch (error) {
      console.error("Error fetching resume:", error);
    }
  };

  useEffect(() => {
    user?.isSignedIn && loadResumeData();
  }, [user?.isLoaded]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        <AddResume userId={userId} />

        {resumeList !== null
          ? resumeList.map((resume: any) => (
              <ResumeCard
                key={resume.resumeId}
                resume={JSON.stringify(resume)}
                refreshResumes={loadResumeData}
              />
            ))
          : [1, 2, 3].map((index) => (
            <div
            key={index}
            className="h-full w-full bg-gray-200 animate-pulse rounded-lg "
          ></div>
            ))}
      </div>
    </>
  );
};

export default DashboardCards;