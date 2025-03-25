"use client"
import { SERVICES } from "@/constants";
import Image from "next/image";
import React from "react";
import { motion, useScroll, useTransform  } from "framer-motion";
import { useRef } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Services = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <motion.section style={{ scale: scaleProgress }}
    ref={ref} id="services" className="flex-col flexCenter overflow-hidden lg:bg-feature-bg lg:bg-center lg:bg-no-repeat py-24">
      <div className="max-container padding-container relative w-full flex justify-end">
        <div className="z-20 flex w-full flex-col lg:w-[60%]">
          <div className="relative">
            <h2 className="bold-40 lg:bold-64">Our Services</h2>
          </div>
          <ul className="mt-10 grid gap-10 md:grid-cols-2 lg:mg-20 lg:gap-20">
            {SERVICES.map((service) => (
              <ServiceItem
                key={service.title}
                title={service.title}
                icon={service.icon}
                description={service.description}
              />
            ))}
          </ul>
        </div>
      </div>
      <Link href={"/services"} scroll={false}>
        <Button>View all Services</Button>
      </Link>
    </motion.section>
  );
};

type ServiceItem = {
  title: string;
  icon: string;
  description: string;
};

const ServiceItem = ({ title, icon, description }: ServiceItem) => {
  return (
    <li className="flex w-full flex-1 flex-col items-start">
      <div className="rounded-full p-4 lg:p-7 bg-green-50">
        <Image src={icon} alt="map" width={28} height={28} />
      </div>
      <h2 className="bold-20 lg:bold-32 mt-5 capitalize">{title}</h2>
      <p className="regular-16 mt-5 bg-white/80 text-gray-30 lg:mt-[30px] lg:bg-none">
        {description}
      </p>
    </li>
  );
};

export default Services;
