import Image from "next/image";

const Clientsay = () => {
  return (
    <div className="mx-auto max-w-2xl py-40 px-4s sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="bg-image-what">
        <h3 className="text-navyblue text-center text-4xl lg:text-6xl font-semibold">
          What say clients about us.
        </h3>
        <h4 className="text-lg font-normal text-darkgray text-center mt-4">
          Brave is a platform that helps to connect with interviewor around the
          world
        </h4>

        <div className="lg:relative">
          <Image
            src={"/assets/clientsay/avatars.png"}
            alt="avatar-image"
            width={1061}
            height={733}
            className="hidden lg:block"
          />

          <span className="lg:absolute lg:bottom-40 lg:left-80">
            <Image
              src={"/assets/clientsay/user.png"}
              alt="user-image"
              width={168}
              height={168}
              className="mx-auto pt-10 lg:pb-10"
            />
            <div className="lg:inline-block bg-white rounded-2xl p-5 shadow-sm">
              <p className="text-base font-normal text-center text-darkgray">
                I am very happy with the service provided by Brave.
                <br /> It is very easy to use and the support team
                <br /> is always available to help me with any issues.
              </p>
              <h3 className="text-2xl font-medium text-center py-2">
                Jony Scotty
              </h3>
              <h4 className="text-sm font-normal text-center">UI Designer</h4>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Clientsay;
