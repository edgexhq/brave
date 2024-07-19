import DashboardCards from "@/components/layout/DashboardCards";

export default function Resume() {
  return (
    <>
      <div className="w-full flex flex-col gap-8 md:p-5">
        <div className="bg-gradient-to-tl from-green-300 via-blue-500 to-purple-600 p-10 rounded-lg mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-x-10 gap-y-4">
            <div>
              <h2 className="font-bold text-3xl text-white mb-2">
                create your resume.
              </h2>
              <h2 className="text-gray-200">
                Create your resume with our easy-to-use AI resume builder. Also
                download your resume in PDF format.
              </h2>
            </div>
          </div>
        </div>

        <DashboardCards />
      </div>
    </>
  );
}
