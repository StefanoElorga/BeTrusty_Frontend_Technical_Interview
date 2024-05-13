import imgGalery1 from "../assets/Rectangle24.png";
import imgGalery2 from "../assets/Rectangle26.png";
import imgGalery3 from "../assets/Rectangle28.png";
import imgGalery4 from "../assets/Rectangle25.png";
import galeryIcon from "../assets/GaleryIcon.png";
import Image from "next/image";
import { StaticImageData } from "next/image";

const ShowAllPhotos: React.FC = () => {
  return (
    <div className="absolute bottom-0 right-0 p-4">
      <div className="bg-white flex flex-row items-center gap-1 py-2.5 px-5 rounded-md">
        <Image src={galeryIcon} alt="icon" className="w-8" />
        <p className="text-base font-bold text-black">
          Mostrar todas las fotos
        </p>
      </div>
    </div>
  );
};
interface GaleryImages {
  image: StaticImageData;
  name: string;
}

const GaleryImages: React.FC<GaleryImages> = ({ image, name }) => {
  return (
    <div className="w-1/2">
      <Image src={image} alt={name} className="w-full object-cover" />
    </div>
  );
};

const SeeDatails: React.FC = () => {
  return (
    <div className="w-1/2 bg-cyan-900 flex text-center items-center justify-center rounded-lg px-4">
      <p>Ver los detalles de las habitaciones</p>
    </div>
  );
};

const Galery: React.FC = () => {
  return (
    <div className="w-full hidden lg:flex px-5 xl:px-12">
      <div className="w-full flex flex-row gap-2 xl:gap-4 relative">
        <ShowAllPhotos />
        <div className="w-1/2">
          <Image
            src={imgGalery1}
            alt="imagen1"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="w-1/2 flex flex-col gap-2 xl:gap-4">
          <div className="flex flex-row gap-2 xl:gap-4">
            <GaleryImages image={imgGalery2} name={"imagen2"} />
            <SeeDatails />
          </div>

          <div className="flex flex-row gap-2 xl:gap-4">
            <GaleryImages image={imgGalery3} name={"imagen3"} />
            <GaleryImages image={imgGalery4} name={"imagen4"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Galery;
