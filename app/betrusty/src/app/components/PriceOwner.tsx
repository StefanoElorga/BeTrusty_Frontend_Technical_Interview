"use client";
import Image from "next/image";
import edit from "../assets/Edit.png";

const PriceOwner: React.FC = () => {
  return (
    //CONTAINER
    <div className="w-full px-2 my-7 flex justify-center md:justify-end md:px-4">
      {/* CARD */}
      <div className="w-full bg-transparent border-gray-400 border-2 rounded-xl max-w-80">
        {/* HEADER de la CARD */}
        <div className="w-full border-b-2 border-gray-400 px-4 py-6">
          <div className="flex flex-row w-full justify-center items-center gap-3">
            <div className="flex flex-col text-center">
              <p className="text-2xl font-semibold">$60 USD por noche</p>
              <p className="text-base font-normal">Precio por habitación</p>
            </div>

            <div className="h-8 w-8">
              <Image src={edit} alt="edit" className="object-cover w-full" />
            </div>
          </div>
        </div>

        {/*CHECK-IN y CHECK-OUT*/}
        <div className="flex flex-row border-b-2 border-gray-400 w-full ">
          {/* check-in */}
          <div className="w-1/2">
            <div className="flex flex-col px-2 py-4 text-center  border-r-2 border-gray-400">
              <p className="text-base font-bold">CHECK-IN</p>
              <p className="text-base font-normal">dd/mm/aaaa</p>
            </div>
          </div>

          {/* check-out */}
          <div className="w-1/2">
            <div className="flex flex-col px-2 py-4 text-center ">
              <p className="text-base font-bold">CHECK-OUT</p>
              <p className="text-base font-normal">dd/mm/aaaa</p>
            </div>
          </div>
        </div>

        {/* Cantidad de días */}
        <div className="flex justify-center items-center border-b-2 border-gray-400">
          <p className="font-normal text-base py-4">
            Cantidad de días: <span className="font-bold">0</span>
          </p>
        </div>

        {/* Depósito reembolsable */}
        <div className="flex justify-center items-center border-b-2 border-gray-400">
          <p className="font-normal text-base py-4">
            Depósito reembolsable: <span className="font-bold">$60 USD</span>
          </p>
        </div>

        {/* Ingreso total */}
        <div className="flex justify-center items-center">
          <p className="font-normal text-base py-4">
            Ingreso total: <span className="font-bold">$0 USD</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceOwner;
