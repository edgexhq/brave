import Banner from './landing-components/Banner/Banner';
import Companies from './landing-components/Companies/Companies';
import Buyers from './landing-components/Buyers/index';
import Provide from './landing-components/Provide/index';
import Why from './landing-components/Why/index';
import Network from './landing-components/Network/index';
import Clientsay from './landing-components/Clientsay/index';
import Newsletter from './landing-components/Newsletter/Newsletter';
import Navbar from './landing-components/Navbar/Navbar';
import Footer from './landing-components/Footer/Footer';


export default function Home() {
  return (
    <>
      <Navbar />
      <div className="mt-32">
        <Banner />
        <Companies />
        <Buyers />
        <Provide />
        <Why />
        <Network />
        <Clientsay />
        <Newsletter />
      </div>
      <Footer />
    </>
  )
}
