import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Card, CardContent } from './ui/card'
import { carType } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

const CarCarousel = ({cars}:{cars:carType[]}) => {
  return (
    <Carousel className="w-full max-w-xs md:max-w-2xl lg:max-w-3xl 2xl:max-w-4xl">
    <CarouselContent className="-ml-1">
      {cars.map(car => (

        <CarouselItem key={car.slug.current} className="select-none pl-1 md:basis-1/2">
          <Link href={`/cars/${car.slug.current}`} className="p-1">
            <Card>
              <CardContent className={` flex flex-col aspect-square items-center justify-center p-6 relative`}>
                <Image width={2000} height={2000} src={car.image} alt={car.name}/>
                <h5 className="text-2xl font-semibold">{car.name}</h5>
              </CardContent>
            </Card>
          </Link>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
  )
}

export default CarCarousel