import Banner from "./landing-components/Banner/Banner";
import Companies from "./landing-components/Companies/Companies";
import Buyers from "./landing-components/Buyers/index";
import Provide from "./landing-components/Provide/index";
import Why from "./landing-components/Why/index";
import Clientsay from "./landing-components/Clientsay/index";
import Newsletter from "./landing-components/Newsletter/Newsletter";
import Navbar from "./landing-components/Navbar/Navbar";
import Footer from "./landing-components/Footer/Footer";
import { Worldwide } from "./landing-components/Worldwide";
import { Team } from "./landing-components/team";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="mt-14 w-full">
        <Banner />
        <Companies />
        <Buyers />
        <Provide />
        <Why />
        {/* <Worldwide /> */}
        <Team />
        <Clientsay />
        <Newsletter />
      </div>
      <Footer />
    </>
  );
}
