/* eslint-disable react/no-unescaped-entities */
"use client"
import Image from "next/image";
import React from "react";
import { motion, useScroll, useTransform  } from "framer-motion";
import { useRef } from "react";
import { ImagesSliderDemo } from "./ImageSlider";
const Guide = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
  
  return (
    <section id="tours"  className="flexCenter my-5 flex-col">
      <div className="padding-container max-container w-full pb-24">
        <p className="regular-18 -mt-1 mb-3 uppercase text-green-50">
          We are here for you
        </p>
        <div className="flex flex-wrap justify-between gap-5 lg:gap-10">
          <h2 className="bold-40 lg:bold-64 xl:max-w-[390px]">
            Guide You to Private Tours
          </h2>
          <motion.p style={{ scale: scaleProgress, opacity: opacityProgress }}
    ref={ref} className="regular-16 text-gray-30 xl:max-w-[520px]">
            Explore the stunning landscapes of the Canadian Rockies in style and
            comfort with our exclusive private tours. Whether you're visiting
            Banff, Canmore, Lake Louise, Jasper, Calgary, or Kananaskis, our
            tailored tours provide a personalized and luxurious travel
            experience. Enjoy the flexibility to create your own itinerary,
            ensuring you see the sights that matter most to you, all while being
            chauffeured by our professional and knowledgeable drivers. Our fleet
            of top-of-the-line vehicles guarantees a smooth and enjoyable
            journey.
          </motion.p>
        </div>
      </div>

      <div className="flexCenter max-container relative w-full">
        {/* <Image
          src="/mountain.png"
          alt="boat"
          width={1440}
          height={580}
          className="w-full object-cover object-center 2xl:rounded-5xl"
        /> */}
        <ImagesSliderDemo/>
        <div className="absolute hidden gap-3 rounded-3xl border bg-white py-8 pl-5 pr-7 shadow-md md:left-[5%] lg:top-20 lg:flex">
          <Image
            src="/meter.svg"
            alt="meter"
            width={16}
            height={158}
            className="h-full w-auto"
          />
          <div className="flexBetween flex-col">
            <div className="flex w-full flex-col">
              <div className="flexBetween w-full gap-2">
                <p className="regular-16 text-gray-20">Destination</p>
                <p className="bold-16 text-green-50"> 2h 48 min</p>
              </div>
              <p className="bold-20 mt-2">Jasper</p>
            </div>

            <div className="flex w-full flex-col">
              <p className="regular-16 text-gray-20">Start track</p>
              <h4 className="bold-20 mt-2 whitespace-nowrap">Canmore</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guide;
