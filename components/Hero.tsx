"use client"
import Image from "next/image";
import ActionButton from "./ui/ActionButton";
import Link from "next/link";
import { motion} from "framer-motion";
import { Button } from "./ui/button";

const Hero = () => {

  return (
    <section className="max-container md:py-26 padding-container relative flex flex-col gap-20  md:gap-28 xl:flex-row">
    <div  className="hero-map opacity-5 md:opacity-10 lg:opacity-5 xl:opacity-100 4xl:opacity-5" />
<div
         className="relative z-20 mt-12 flex flex-1 flex-col xl:w-1/2">
        <motion.h1 initial={{ opacity: 0, scale:0.9 }}
        animate={{ opacity: 1, scale:1 }} className="bold-52 lg:bold-88 ">
          Luxury Transportation Services <span className="bg-white/70"> Across the Rockies</span>
        </motion.h1>
        <motion.p transition={{ type: "tween", duration: 0.5 }}
        initial={{ opacity: 0, scale:0.9 }}
        animate={{ opacity: 1, scale:1 }} className="regular-16 mt-6 text-gray-30 xl:max-w-[520px]">
          Travel in luxury with our professional limousine services, offering
          seamless transfers and charters throughout the Rockies. Our expert
          chauffeurs ensure a premium experience for weddings, business events,
          and more.
        </motion.p>
        <motion.div transition={{ type: "tween", duration: 0.5, delay:1 }}
          initial={{ y: 10, opacity:0 }}
          animate={{ y: 0, opacity:1 }} className="my-11 justify-start flex w-full flex-col gap-3 sm:flex-row">
          <Link href={"/booking"}>
            <Button
              type="button"
              title="Online Booking"
              className="bg-green-600 rounded-3xl"
              size="lg"
            >BOOK NOW!</Button>
          </Link>
          <a href={`tel:+14036882023`}>
          <Button
          variant="ghost"
              type="button"
              title="Online Booking"
              className=" rounded-3xl gap-3"
              size="lg"
            >
          <Image src={"/play.svg"} alt="call" width={24} height={24} />
              CALL US
            </Button>
            </a>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale:0.9 }}
        animate={{ opacity: 1, scale:1 }} className="my-5 flex flex-wrap gap-5">
          <div className="flex items-center gap-2">
            {Array(5)
              .fill(1)
              .map((_, index) => (
                <Image
                  src="/star.svg"
                  key={index}
                  alt="star"
                  width={24}
                  height={24}
                />
              ))}
          </div>

          <p className="bold-16 lg:bold-20 text-blue-70">
            1.9k
            <span className="regular-16 lg:regular-20 ml-1">
              Excellent Reviews
            </span>
          </p>
        </motion.div>
      </div>

      <div className="relative hidden flex-1 items-start lg:my-72 ">
        <div className="relative z-20 flex w-full flex-col gap-8 rounded-3xl bg-green-90 px-7 py-8 md:w-[268px]">
          <div className="flex flex-col">
            <div className="flexBetween">
              <p className="regular-16 text-gray-20">Location</p>
              <Image src="/close.svg" alt="close" width={24} height={24} />
            </div>
            <p className="bold-20 text-white">Lake Louise</p>
          </div>

          <div className="flexBetween">
            <div className="flex flex-col">
              <p className="regular-16 block text-gray-20">Distance</p>
              <p className="bold-20 text-white">17.28 mi</p>
            </div>
            <div className="flex flex-col">
              <p className="regular-16 block text-gray-20">Passengers</p>
              <p className="bold-20 text-white">4 people</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
