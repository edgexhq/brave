"use client";
import { useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface whydata {
  heading: string;
  subheading: string;
}

const whydata: whydata[] = [
  {
    heading: "AI-Driven Efficiency",
    subheading: "Simplifies and enhances every interview step.",
  },
  {
    heading: "Customizable and Shareable",
    subheading: "Access tips, mock interviews, and expert insights.",
  },
  {
    heading: "Professional Resumes",
    subheading: "Create standout resumes that impress and pass ATS.",
  },
  {
    heading: "Collaborative Community",
    subheading: "Share resources and feedback with fellow interviewers.",
  },
  {
    heading: "Top LinkedIn Jobs",
    subheading:
      "Interviewers can check the top LinkedIn interviews as well in our platform",
  },
];

const Why = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  return (
    <div
      ref={ref}
      style={{
        transform: isInView ? "none" : "translateX(200px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.6s",
      }}
      id="about"
    >
      <div className="mx-auto max-w-7xl px-4 my-20 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* COLUMN-1 */}
          <div className="lg:-ml-64">
            <Image
              src="/assets/why/iPad.png"
              alt="iPad-image"
              width={4000}
              height={900}
            />
          </div>

          {/* COLUMN-2 */}
          <div>
            <h3 className="text-4xl lg:text-5xl pt-4 font-semibold sm:leading-tight mt-5 text-center lg:text-start">
              Why we best?
            </h3>
            <h4 className="text-lg pt-4 font-normal sm:leading-tight text-center text-beach lg:text-start">
              Dont waste time on search manual tasks. Let Automation do it for
              you. Simplify workflows, reduce errors, and save time.
            </h4>

            <div className="mt-10">
              {whydata.map((items, i) => (
                <div className="flex mt-4" key={i}>
                  <div className="rounded-full h-10 w-10 flex items-center justify-center bg-circlebg">
                    <Image
                      src="/assets/why/check.svg"
                      alt="check-image"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className="ml-5">
                    <h4 className="text-2xl font-semibold">{items.heading}</h4>
                    <h5 className="text-lg text-beach font-normal mt-2">
                      {items.subheading}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Why;
