import Image from "next/image";
import { StaticImageData } from "next/image";
import bathroom from "../assets/Bathroom.png";
import car from "../assets/Car.png";
import wifi from "../assets/Wifi.png";
import sleeping from "../assets/Sleeping.png";
import home from "../assets/Home.png";
import ubication from "../assets/Ubication.png";
import propietario from "../assets/Propietario.png";

interface ItemsProps {
  name: string;
  icon: StaticImageData;
  description: string;
}

const Item: React.FC<ItemsProps> = ({ icon, name, description }) => {
  return (
    <li className="flex flex-row items-center gap-4">
      <div className="w-7 h-7">
        <Image src={icon} alt={name} className="object-cover w-full" />
      </div>

      <p>{description}</p>
    </li>
  );
};

const Services: React.FC = () => {
  return (
    <div className="w-full md:max-w-[600px] px-2 py-9  flex flex-col items-center order-2 md:order-1 md:px-5 md:items-start">
      <ol className=" flex flex-col gap-4 max-w-80">
        <Item
          icon={ubication}
          name={"ubication"}
          description={"Av. San Martín 315, Mendoza, Argentina"}
        />

        <Item icon={home} name={"home"} description={"Departamento"} />

        <Item
          icon={sleeping}
          name={"sleeping"}
          description={"3 hábitaciones"}
        />

        <Item icon={bathroom} name={"bathroom"} description={"1 baño"} />

        <Item icon={wifi} name={"wifi"} description={"WIFI"} />

        <Item
          icon={car}
          name={"car"}
          description={"Estacionamiento gratuito"}
        />
      </ol>

      <div className="max-w-80 md:max-w-full my-8">
        <p className="pb-4 text-xl font-bold">Descripción</p>
        <p className="font-normal text-base">
          Este hermoso apartamento de 2 habitaciones se encuentra en el corazón
          de la ciudad, a solo unos pasos de los mejores restaurantes, tiendas y
          lugares de interés turístico. El apartamento es ideal para aquellos
          que buscan un espacio cómodo y acogedor en el que relajarse después de
          un largo día de trabajo o de turismo.
        </p>
      </div>

      <div className="w-full max-w-80 md:max-w-full">
        <p className="font-bold text-xl mb-2">Propietario</p>

        <div className="flex flex-row gap-3 items-center">
          <div className="w-14 h-14 rounded-full">
            <Image
              src={propietario}
              alt="propietario"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <p className="text-base font-normal">Elon Musk</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
