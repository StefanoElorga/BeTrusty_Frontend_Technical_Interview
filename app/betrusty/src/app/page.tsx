import React from "react";
import Header from "./components/Header";
import PropertyHeader from "./components/PropertyHeader";
import Slider from "./components/Slider";
import PriceOwner from "./components/PriceOwner";
import CTA from "./components/CTA";
import Services from "./components/Services";
import Menu from "./components/Menu";

const Home: React.FC = () => {
  return (
    <div className="w-full flex flex-col sm:flex-row max-h-screen overflow-hidden">
      <div className="sm:w-full overflow-y-auto order-1 sm:order-2">
        <Header />
        <PropertyHeader />
        <Slider />

        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="order-1 md:order-2">
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
