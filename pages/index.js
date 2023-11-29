import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import Sponsorship from "../components/Sponsorship";
import Dashboard from "../components/Dashboard";
import AboutUs from "../components/AboutUs";
import CuratedProject from "../components/CuratedProject";
import DigitalAssets from "../components/DigitalAssets";
import DefiIntegration from "../components/DefiIntegration";
import AIInsights from "../components/AIInsights";
import CDEcosystem from "../components/CDEcosystem";
import CoDoTokenomics from "../components/CoDoTokenomics";
import Howtobuy from "../components/HowToBuy";
import Nextpresale from "../components/Nextpresale";
import RoadMap from "../components/RoadMap";
import Faqs from "../components/Faq";

export default function Home() {

  return (
    <main
      id="dashboard"
      className="text-white w-full overflow-y-auto"
    >
      <Dashboard />
      <Sponsorship />
      <AboutUs />
      <DigitalAssets />
      <CuratedProject />
      <DefiIntegration />
      <AIInsights />
      <CDEcosystem />
      <CoDoTokenomics />
      <Howtobuy />
      <Nextpresale />
      <RoadMap />
      <Faqs />
    </main>
  );
}
