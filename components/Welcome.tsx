import Blobby from "@/app/components/ui/blobby";
import { currentUser } from "@clerk/nextjs/server";

const Welcome = async () => {
  const user = await currentUser();

  return (
    <div className="bg-gradient-to-l from-cyan-300 via-blue-500 to-purple-500 text-white relative group overflow-hidden rounded-lg transition-all hover:shadow p-6 md:p-8">
      <h1 className="text-3xl font-bold mb-2">
        Heyy{" "}
        <span className="text-4xl">
          {user?.firstName || user?.lastName || user?.fullName}
        </span>{" "}
        !👋
      </h1>
      <p className="text-muted text-lg">
        hi there! welcome to your dashboard. You can do:
      </p>
    </div>
  );
};

export default Welcome;
