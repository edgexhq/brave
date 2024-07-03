"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/lib/utils/db";
import { MockInterview } from "@/lib/utils/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const QuestionsSection = dynamic(
  () => import("@/components/interview/start/questions-section"),
  { ssr: false }
);
const RecordAnswerSection = dynamic(
  () => import("@/components/interview/start/record-answer-section"),
  { ssr: false }
);

// import { MockInterviewProps } from "@/lib/utils/types";

// type Props = {
//   params: {
//     interviewId: string;
//   };
// };

export default function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    const deserializedJsonResp = JSON.parse(result[0]?.jsonMockResp);
    setMockInterviewQuestion(deserializedJsonResp);
    setInterviewData(result[0]);
  };

  return (
    <div className="w-full flex flex-col gap-8 md:p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />

        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>
      <div className="flex justify-end gap-6">
        {activeQuestionIndex > 0 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
          >
            Previous Question
          </Button>
        )}
        {activeQuestionIndex != mockInterviewQuestion?.length - 1 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
          >
            Next Question
          </Button>
        )}
        {activeQuestionIndex == mockInterviewQuestion?.length - 1 && (
          <Link
            href={"/dashboard/interview/" + interviewData?.mockId + "/feedback"}
          >
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
