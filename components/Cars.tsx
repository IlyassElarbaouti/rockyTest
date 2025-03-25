import { getCars } from "@/sanity/sanity-utils";
import Image from "next/image";
import React from "react";
import { Car } from "./Car";
import { carType } from "@/types";
export const revalidate = 60
export const dynamic = "force-dynamic";

const Cars = async () => {
  const cars = await getCars();
  return (
    <section id="cars" className="flexCenter flex-col py-24">
      <div className="padding-container max-container w-full ">
        <Image src="/camp.svg" alt="camp" width={50} height={50} />
        <p className="regular-18 -mt-1 mb-3 uppercase text-green-50">
          Our cars
        </p>
        <div className="flex flex-wrap justify-between gap-5 lg:gap-10">
          <h2 className="bold-40 lg:bold-64 xl:max-w-[390px]">
            Discover Our Luxury Cars
          </h2>
          <p className="regular-16 text-gray-30 xl:max-w-[520px]">
            Explore our exquisite fleet of luxury vehicles, designed to provide
            the ultimate in comfort and style. Whether for airport transfers,
            weddings, or special events, our top-of-the-line cars ensure a
            sophisticated and memorable travel experience.
          </p>
        </div>
      </div>

      <div className="max-container relative grid w-full grid-cols-1 items-center md:grid-cols-2 lg:grid-cols-3">
        {cars.map((carData: carType) => (
          <Car key={carData.name} carData={carData} />
        ))}
      </div>
    </section>
  );
};

export default Cars;
