import { carType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { getCar, getCars, urlForImage } from "@/sanity/sanity-utils";
import { AudioWaveformIcon, BatteryChargingIcon, Bluetooth, Luggage, UsersRound } from "lucide-react";
import ActionButton from "@/components/ui/ActionButton";
import CarCarousel from "@/components/CarCarousel";
export const dynamic = "force-dynamic";
import {motion} from "framer-motion"
import { Button } from "@/components/ui/button";
export const revalidate = 60
type carProps = {
    params: {
        slug: string;
    };
};

const page = async ({ params }: carProps) => {

    const car: carType = await getCar(params.slug);
    const cars: carType[] = await getCars()
    const otherCars = cars.filter(car => car.slug.current !== params.slug)
    return (
        <div className="flex items-center flex-col w-vw my-4 mx-2 ">

            <div className="prose lg:prose-xl xl:prose-2xl ">
                <h1 className="text-center">{car.name}</h1>
                <Image width={2000} height={2000} src={car.image} quality={100} alt={car.slug.current} />
                <div  className="my-11 justify-center items-center flex w-full flex-col gap-3 sm:flex-row">
          <Link href={"/booking"}>
            <Button
              type="button"
              className="bg-green-600 rounded-3xl"
              size="lg"
            >BOOK NOW!</Button>
          </Link>
          <a href={`tel:+18668467720`}>
          <Button
          variant="ghost"
              type="button"
              className=" rounded-3xl gap-3"
              size="lg"
            >
          <Image src={"/play.svg"} alt="call" width={24} height={24} />
              CALL US
            </Button>
            </a>
        </div>
                <div className="flex justify-between items-center ">
                    <h4 className="flex items-center gap-2"><UsersRound /> Passengers:  {car.passengers} </h4>
                    <h4 className="flex items-center gap-2"><Luggage /> Luggage:  {car.bagCapacity} </h4>
                </div>
                <div className="flex p-4 justify-around gap-10 my-4 rounded-2xl border items-center bg-slate-50 shadow-xl">
                    <h3 className="p-0 m-0">Features:</h3>
                    <div className="flex flex-col  gap-3 ">

                        {car.bluetoothConnection && <div className="flex gap-2 items-center"><Bluetooth /> Bluetooth</div>}
                        {car.surroundSound && <div className="flex gap-2 items-center"> <AudioWaveformIcon /> Surround sound</div>}
                        {car.iphoneCharger && <div className="flex gap-2 items-center"> <BatteryChargingIcon /> Iphone charger</div>}
                    </div>
                </div>
                <PortableText
                    components={{
                        types: {
                            image: ({ value }) => {
                                // we need to get the image source url, and since @sanity/image-url will give us optimised images for each instance we use it
                                const imgUrl = urlForImage(value.asset).url()
                                return (<div className=" grid min-h-[140px] w-full place-items-center overflow-hidden rounded-lg p-6 ">
                                    <Image
                                        width={2000}
                                        height={2000}
                                        alt={value.alt}
                                        src={imgUrl}
                                        className="object-cover object-center w-full h-96"
                                        priority={false}
                                    /></div>)
                            },
                        },
                        marks: {
                            link: ({ value, children }) => {
                                const { blank, href } = value;
                                return blank ? (
                                    <Link href={href} className="underline" target="_blank" rel="noopener">
                                        {children}
                                    </Link>
                                ) : (
                                    <Link href={href}>{children}</Link>
                                )
                            },
                        },
                    }}
                    i18nIsDynamicList
                    value={car?.additionalInformation}
                />
            </div>
            <div className="py-6">
            <h2 className="font-bold underline">Explore our awesome cars:</h2>
            <CarCarousel cars={otherCars}/>
            </div>
        </div>
    )
}

export default page