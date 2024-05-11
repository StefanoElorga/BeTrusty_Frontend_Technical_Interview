import React from "react";
import Header from "./components/Header";
import PropertyHeader from "./components/PropertyHeader";
import Slider from "./components/Slider";
import PriceOwner from "./components/PriceOwner";
import CTA from "./components/CTA";
import Services from "./components/Services";
import Menu from "./components/Menu";
import Galery from "./components/Galery";

const Home: React.FC = () => {
  return (
    <div className="w-full flex flex-col sm:flex-row max-h-screen overflow-hidden">
      <div className="sm:w-full overflow-y-auto order-1 sm:order-2">
        <Header />
        <PropertyHeader />
        <Slider />
        <Galery />

        <div className="flex flex-col lg:flex-row lg:justify-between">
          <div className="order-1 lg:order-2">
            <PriceOwner />
            <CTA />
          </div>

          <Services />
        </div>
      </div>
      <Menu />
    </div>
  );
};

export default Home;
