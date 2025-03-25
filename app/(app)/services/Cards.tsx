"use client";
import { Card, Carousel } from "@/components/apple-card-carousel";
import { servicesType } from "@/types";
import Image from "next/image";
import React, { useEffect } from "react";
export const revalidate = 60

 
export function Cards({data}:{data:servicesType[]}) {
  const cards = data.map((card, index) => (
    <Card key={card.slug.current} card={card} index={index} />
  ));
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="max-container h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Get to know our services.
      </h2>
      <Carousel items={cards} />
    </div>
  );
}
 


export default Cards;