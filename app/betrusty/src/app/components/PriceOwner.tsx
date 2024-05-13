"use client";
import Image from "next/image";
import edit from "../assets/Edit.png";
//Instalamos la biblioteca "react-datepicker e importamos a 'DatePicker'"
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import React, { useState, useEffect } from "react";

const PriceOwner: React.FC = () => {
  //ESTADOS para el calendario y obtener la fecha seleccionada.
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  //ESTADO para el total de días, que se obtiene en el useEffect, el cual escucha a "checkInDate" y a "checkOutDate"
  const [totalDays, setTotalDays] = useState<number>(0);
  //ESTADOS para el precio por noche, "pricePerNight" guarada el precio; "isEditing" detecta si el usuario está editando; "EditedPrice" es el valor que está escribiendo el usuario
  const [pricePerNight, setPricePerNight] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedPrice, setEditedPrice] = useState<string>("");
  const [isCalendarVisible, setIsCalendarVisible] = useState<boolean>(false);

  //UseEffect para escuchar los cambios que hace el usuario en checkInDate y checkOutDate
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const days = Math.ceil(
        (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24)
      );

      setTotalDays(days);
    }
  }, [checkInDate, checkOutDate]);

  //Funcion para detectar mostrar el input de editar.
  const handleEditPrice = () => {
    setIsEditing(true);
    setEditedPrice(pricePerNight.toString());
  };

  //Funcion para guardar el nuevo valor.
  const handleSavePrice = () => {
    //si el precio está vacio no permite guardar.
    if (editedPrice === "") {
      return;
    }
    //si el precio es NEGATIVO tampoco permite guardar.
    if (parseFloat(editedPrice) < 0) {
      return;
    }
    //Guarda el nuevo valor y cierra el input de editar, en caso de pasar las primeras condiciones.
    setIsEditing(false);
    setPricePerNight(parseFloat(editedPrice));
  };

  const handleCheckInFocus = () => {
    setIsCalendarVisible(true);
  };

  const handleCheckOutFocus = () => {
    setIsCalendarVisible(false);
  };

  return (
    //CONTAINER
    <div className="w-full px-2 my-7 flex justify-center lg:justify-end lg:px-5 xl:px-12">
      {/* CARD */}
      <div className="w-full bg-transparent border-gray-400 border-2 rounded-xl max-w-80">
        {/* HEADER de la CARD */}
        <div className="w-full border-b-2 border-gray-400 px-4 py-6">
          <div className="flex flex-row w-full justify-center items-center gap-3">
            <div className="flex flex-col text-center">
              {isEditing ? (
                <div className="flex items-center justify-center">
                  <input
                    type="number"
                    value={editedPrice}
                    maxLength={3}
                    onChange={(e) => setEditedPrice(e.target.value)}
                    className="w-20 text-black text-center border border-gray-400 rounded-md py-1"
                  />

                  <button
                    onClick={handleSavePrice}
                    className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-md"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-2xl font-semibold">
                    ${pricePerNight} USD por noche
                  </p>
                  <p className="text-base font-normal">Precio por habitación</p>
                </>
              )}

              <p className="text-base font-normal">Precio por habitación</p>
            </div>

            <div className="h-8 w-8">
              <Image
                src={edit}
                alt="edit"
                className="object-cover w-full"
                onClick={handleEditPrice}
              />
            </div>
          </div>
        </div>

        {/*CHECK-IN y CHECK-OUT*/}
        <div className="flex flex-row border-b-2 border-gray-400 w-full ">
          {/* check-in */}
          <div className="w-1/2">
            <div className="flex flex-col px-2 py-4 text-center border-r-2 border-gray-400">
              <p className="text-base font-bold">CHECK-IN</p>
              <DatePicker
                selected={checkInDate}
                onChange={(date) => setCheckInDate(date)}
                dateFormat={"dd/mm/yyyy"}
                onFocus={handleCheckInFocus}
                className="bg-transparent w-full placeholder:text-white text-center"
                placeholderText="dd/mm/aaaa"
              />
            </div>
          </div>

          {/* check-out */}
          <div className="w-1/2">
            <div className="flex flex-col px-2 py-4 text-center">
              <p className="text-base font-bold">CHECK-OUT</p>
              <DatePicker
                selected={checkOutDate}
                onChange={(date) => setCheckOutDate(date)}
                dateFormat={"dd/mm/yyyy"}
                onFocus={handleCheckOutFocus}
                startDate={checkInDate}
                endDate={checkOutDate}
                minDate={checkInDate}
                className="bg-transparent w-full placeholder:text-white text-center"
                placeholderText="dd/mm/aaaa"
              />
            </div>
          </div>
        </div>

        {/* Cantidad de días */}
        <div className="flex justify-center items-center border-b-2 border-gray-400">
          <p className="font-normal text-base py-4">
            Cantidad de días: <span className="font-bold">{totalDays}</span>
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
            Ingreso total:{" "}
            <span className="font-bold">${totalDays * pricePerNight} USD</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceOwner;
