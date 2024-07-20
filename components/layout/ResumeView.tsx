"use client";

import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";
import { FormProvider } from "@/lib/context/FormProvider";
import ResumePreview from "./my-resume/ResumePreview";
import { usePathname } from "next/navigation";
import { DownloadIcon, Share2Icon } from "lucide-react";
import { toast } from "sonner";

const FinalResumeView = ({
  params,
  isOwnerView,
}: {
  params: { id: string };
  isOwnerView: boolean;
}) => {
  const path = usePathname();

  const downloadPDF = async () => {
    const printArea = document.querySelector("#print-area") as HTMLElement;
    if (printArea) {
      const canvas = await html2canvas(printArea, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("resume.pdf");
    }
  };

  return (
    <FormProvider params={params}>
      <div id="no-print">
        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          {isOwnerView ? (
            <>
              <h2 className="text-center text-2xl font-bold">
                Congrats! Your ultimate AI-generated resume is ready!
              </h2>
              <p className="text-center text-gray-600">
                You can now download your resume or share its unique URL with
                your friends and family.
              </p>
              <p className="text-center text-sm text-gray-500 font-light">
                For better print quality, adjust your browser's print settings:
                save as PDF, disable headers and footers, set margins to none,
                and enable background graphics.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-center text-2xl font-bold">Resume Preview</h2>
              <p className="text-center text-gray-600">
                You are currently viewing a preview of someone else's resume.
              </p>
              <p className="text-center text-sm text-gray-500 font-light">
                For the ultimate experience, create your own AI-generated
                resume.
              </p>
            </>
          )}
          <div className="flex max-sm:flex-col justify-center gap-8 my-10">
            <Button
              className="flex px-12 py-6 gap-2 rounded-full bg-primary hover:bg-primary focus:ring-4 focus:ring-primary-700/30 text-white"
              onClick={downloadPDF}
            >
              <DownloadIcon className="size-6" /> Download
            </Button>
            <Button
              className="flex px-12 py-6 gap-2 rounded-full bg-slate-200 hover:bg-primary/20 focus:ring-4 focus:ring-primary-700/30 text-black"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.origin}${path}`
                );
                toast("Copied to clipboard!");
              }}
            >
              <Share2Icon className="size-6" /> Share URL
            </Button>
          </div>
        </div>
      </div>
      <div className="px-10 pt-4 pb-16 max-sm:px-5 max-sm:pb-8 print:p-0">
        <div id="print-area">
          <ResumePreview />
        </div>
      </div>
    </FormProvider>
  );
};

export default FinalResumeView;
