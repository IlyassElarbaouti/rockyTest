import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Card, CardContent } from './ui/card'
import { carType } from '@/types'
import Image from 'next/image'
import { Checkbox } from './ui/checkbox'

const CarCarouselBooking = ({cars}:{cars:carType[]}) => {
  return (
    <Carousel className="max-w-xs  ">
    <CarouselContent className="-ml-1">
      {cars.map(car => (

        <CarouselItem key={car.slug.current} className="select-none pl-1 cursor-pointer">
            <Card>
              <CardContent className={` flex flex-col aspect-square items-center justify-center p-6 relative`}>
                <Checkbox className='absolute top-4 right-4'/>
                <Image width={2000} height={2000} src={car.image} alt={car.name}/>
                <h5 className="text-2xl font-semibold">{car.name}</h5>
              </CardContent>
            </Card>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
  )
}

export default CarCarouselBooking