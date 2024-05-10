import Image from "next/image";
import logo from "../assets/Logo.png";
import avatar from "../assets/Avatar.png";

const Header: React.FC = () => {
  return (
    <header>
      <div className="bg-black w-full px-6 py-4 flex flex-row justify-between items-center">
        <Image src={logo} alt="logo" className="w-32 h-9" />
        <Image src={avatar} alt="avatar" className="w-11 h-11" />
      </div>
    </header>
  );
};

export default Header;
