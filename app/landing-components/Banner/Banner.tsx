import Blobby from "@/app/components/ui/blobby";
import ShimmerButton from "@/components/ui/shimmerButton";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <main>
      <div className="px-6 lg:px-8">
        <Blobby className="bg-blue-400/60 top-12 left-10" />
        <div className="mx-auto max-w-7xl pt-16 sm:pt-20 pb-20 banner-image">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-navyblue sm:text-5xl lg:text-7xl md:4px">
              A Next Gen Perfect <br /> Interview Prep Suite.
            </h1>
            <p className="mt-6 text-lg max-w-prose text-center mx-auto leading-8 text-bluegray">
              At Brave, we revolutionize the way you prepare for and conduct
              interviews. Our platform is designed to simplify and enhance every
              step of the interview process for both interviewers and
              candidates.
            </p>
          </div>

          <div className="text-center mt-5">
            <ShimmerButton>
              <Link href="/sign-in">Get Started</Link>
            </ShimmerButton>
          </div>

          <Image
            src={"/assets/banner/dashboard.svg"}
            alt="banner-image"
            width={1200}
            height={598}
          />
        </div>
      </div>
    </main>
  );
};

export default Banner;
