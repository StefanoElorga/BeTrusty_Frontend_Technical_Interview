import Image from "next/image";
import identification from "../assets/Identification.png";
import principal from "../assets/Principal.png";
import key from "../assets/Key.png";
import menu from "../assets/Menu.png";
import notifications from "../assets/Notifications.png";
import qrCode from "../assets/QrCode.png";
import dashboard from "../assets/Dashboard.png";
import settings from "../assets/Settings.png";

const Menu: React.FC = () => {
  return (
    <div className="bg-black w-full px-6 py-4 flex flex-row items-center gap-5 justify-center order-2 sm:order-1 sm:flex-col sm:gap-0 sm:justify-between sm:w-24 sm:py-8 sticky top-0">
      <div className="flex flex-col gap-10">
        <Image src={menu} alt="top" className="hidden sm:flex" />

        <div className="flex flex-row gap-5 sm:flex-col">
          <Image src={principal} alt={"principal"} />
          <Image
            src={identification}
            alt={"identification"}
            className="hidden sm:flex"
          />
          <Image src={dashboard} alt={"dashboard"} />
          <Image src={qrCode} alt={"qrCode"} />
          <Image src={key} alt={"key"} className="hidden sm:flex" />
          <Image src={notifications} alt={"notifications"} />
        </div>
      </div>

      <Image src={settings} alt="settings" />
    </div>
  );
};

export default Menu;
