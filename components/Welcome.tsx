import { currentUser } from "@clerk/nextjs/server";
import GradualSpacing from "./ui/gradual-separate";

const Welcome = async () => {
  const user = await currentUser();

  return (
    <div className="bg-gradient-to-l from-cyan-300 via-blue-500 to-purple-500 text-white relative group overflow-hidden rounded-lg transition-all hover:shadow p-6 md:p-8 md:py-12">
      <h1 className="text-3xl font-bold mb-2">
        Heyy{" "}
        <span>
          <GradualSpacing
            className="text-center text-4xl font-bold tracking-[-0.11em] text-white md:text-6xl md:leading-[5rem]"
            text={
              user?.firstName || user?.lastName || user?.fullName || "Friend"
            }
          />
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
