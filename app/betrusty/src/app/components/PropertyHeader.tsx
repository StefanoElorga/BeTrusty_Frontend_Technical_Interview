import Image from "next/image";
import edit from "../assets/Like.png";
import share from "../assets/Share.png";

const PropertyHeader: React.FC = () => {
  return (
    <div className="w-full flex flex-row py-7 px-5 justify-between items-center">
      <p className="text-2xl font-bold">Frank Apart</p>

      <div className="flex flex-row gap-2.5">
        <Image src={edit} alt="edit" width={44} height={44} />
        <Image src={share} alt="share" width={44} height={44} />
      </div>
    </div>
  );
};

export default PropertyHeader;
