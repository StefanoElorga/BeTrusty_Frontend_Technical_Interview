import PropertyHeader from "./components/PropertyHeader";
import Slider from "./components/Slider";
import PriceOwner from "./components/PriceOwner";
import CTA from "./components/CTA";
import Services from "./components/Services";
import Menu from "./components/Menu";

const Home: React.FC = () => {
  return (
    <main className="w-full">
      <div>
        <PropertyHeader />
        <Slider />

        <div>
          <div>
            <PriceOwner />
            <CTA />
          </div>
          <Services />
        </div>
      </div>

      <Menu />
    </main>
  );
};

export default Home;
