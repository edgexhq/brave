import Banner from './components/Banner/Banner';
import Companies from './components/Companies/Companies';
import Buyers from './components/Buyers/index';
import Provide from './components/Provide/index';
import Why from './components/Why/index';
import Network from './components/Network/index';
import Clientsay from './components/Clientsay/index';
import Newsletter from './components/Newsletter/Newsletter';


export default function Home() {
  return (
    <main>
      <Banner />
      <Companies />
      <Buyers />
      <Provide />
      <Why />
      <Network />
      <Clientsay />
      <Newsletter />
    </main>
  )
}
