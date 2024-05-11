import imgGalery1 from "../assets/Rectangle24.png";
import imgGalery2 from "../assets/Rectangle26.png";
import imgGalery3 from "../assets/Rectangle28.png";
import imgGalery4 from "../assets/Rectangle25.png";
import galeryIcon from "../assets/GaleryIcon.png";
import Image from "next/image";

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
            <div className="w-1/2">
              <Image
                src={imgGalery2}
                alt="imagen2"
                className="w-full object-cover"
              />
            </div>

            <div className="w-1/2 bg-cyan-900 flex text-center items-center justify-center rounded-lg px-4">
              <p>Ver los detalles de las habitaciones</p>
            </div>
          </div>

          <div className="flex flex-row gap-2 xl:gap-4">
            <div className="w-1/2">
              <Image
                src={imgGalery3}
                alt="imagen3"
                className="w-full object-cover"
              />
            </div>

            <div className="w-1/2">
              <Image
                src={imgGalery4}
                alt="imagen4"
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Galery;
