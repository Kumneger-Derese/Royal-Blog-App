import FAQ from '../components/FAQ';
import { useSelector } from 'react-redux';
import NavBar from '../components/NavBar';
import Clients from '../components/Clients';
import Explore from '../components/Explore';
import Services from '../components/Services';
import Features from '../components/Features';
import HeroSection from '../components/HeroSection';
import Subscription from '../components/Subscription';
import RecentTopics from '../components/RecentTopics';

export default function HomeScreen() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div>
      <NavBar />
      <HeroSection />
      <Features />
      <Explore />
      <Services />
      {userInfo && <RecentTopics />}
      <Clients />
      <FAQ />
      <Subscription />
    </div>
  );
}
