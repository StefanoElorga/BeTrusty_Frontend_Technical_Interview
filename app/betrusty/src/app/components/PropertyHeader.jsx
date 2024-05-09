import edit from "../assets/Like.png";
import share from "../assets/Share.png";
import Image from "next/image";
export default function PropertyHeader() {
  return (
    <div className="w-full flex flex-row py-7 px-5 justify-between items-center">
      <p className="text-2xl font-bold">Frank Apart</p>

      <div className="flex flex-row gap-2.5">
        <Image src={edit} alt="edit" className="w-11 h-11" />
        <Image src={share} alt="share" className="w-11 h-11" />
      </div>
    </div>
  );
}
