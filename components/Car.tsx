"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import Link from "next/link";
import { AudioWaveformIcon, BatteryChargingIcon, Bluetooth, BluetoothConnected, Luggage, UsersRound } from "lucide-react";
import { carType } from "@/types";

export function Car({ carData }:{carData:carType}) {
    return (
        <Link href={`/cars/${carData.slug.current}`}>
        <CardContainer className="inter-var shadow-lg">
            <CardBody className="bg-white relative group/card  dark:hover:shadow-2xl  border-black/[0.1] w-[22rem]  sm:w-[20rem] h-auto rounded-xl p-2 border  ">
                <h3
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                    >
                    {carData.name}
                </h3>
                <CardItem translateZ="100" className="w-full mt-4 bg-transparent">
                    <Image
                        src={carData.image}
                        height="1000"
                        width="1000"
                        className="h-30 w-full  object-contain rounded-xl "
                        alt="thumbnail"
                        />
                </CardItem>
                <CardItem className="flex w-full justify-center gap-2 items-center mt-8">
                    <span className="">Features:</span>
                    <div className="flex gap-2">
                    {carData.bluetoothConnection && <Bluetooth/>}
                    {carData.surroundSound && <AudioWaveformIcon/>}
                    {carData.iphoneCharger && <BatteryChargingIcon/>}
                    </div>
                    
                    </CardItem>
                <CardItem className="flex w-full justify-around items-center mt-10">
                    <div className="flex gap-2 font-bold">

                        <UsersRound /> <span className=""> X {carData.passengers}</span>
                    </div>
                    <div className="flex gap-2 font-bold">

                        <Luggage /> <span className=""> X {carData.bagCapacity}</span>
                    </div>

                </CardItem>
                <div className="flex  justify-between items-center mt-10">
                    <div className="">
                    </div>
                    <CardItem
                        translateZ={20}
                        as="button"
                        className="px-8  py-4 hover:shadow-2xl rounded-xl bg-black  text-white text-xs font-bold"
                        >
                        Book now
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer>
                        </Link>
    );
}