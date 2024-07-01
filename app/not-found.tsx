import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div className="text-center pt-20 sm:pt-32">
      <h1 className="text-2xl sm:text-5xl relative z-20 font-bold tracking-tight">
        Uh-oh!
      </h1>
      <p className="mt-4 relative z-10 text-gray-500">
        We can't find that page.
      </p>
      <Button className={"relative z-10 mt-4"}>
        <a href="/">Go back home</a>
      </Button>
      <div className="absolute left-0 bottom-0 sm:top-40 w-full">
        <img src="/error1.svg" alt="Error" className="z-0 relative" />
      </div>
    </div>
  );
};

export default page;
