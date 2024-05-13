import React from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";

const Configuration: React.FC = () => {
  return (
    <div className="w-full flex flex-col sm:flex-row max-h-screen overflow-hidden">
      <div className="sm:w-full overflow-y-auto order-1 sm:order-2">
        <Header />
        <div className="w-full flex justify-center pt-5 h-screen">
          <h1 className="text-3xl">CONFIGURATION</h1>
        </div>
      </div>

      <Menu />
    </div>
  );
};

export default Configuration;
