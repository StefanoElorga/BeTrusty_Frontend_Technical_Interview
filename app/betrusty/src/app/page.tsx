import PropertyHeader from "./components/PropertyHeader";
import Slider from "./components/Slider";

const Home: React.FC = () => {
  return (
    <main className="w-full">
      <PropertyHeader />
      <Slider />
    </main>
  );
};

export default Home;
