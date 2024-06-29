import { cn } from "@/lib/utils";

const Blobby = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "duration-500 transition-all min-h-24 min-w-24 rounded-full blur-3xl absolute",
        className
      )}
    />
  );
};

export default Blobby;
