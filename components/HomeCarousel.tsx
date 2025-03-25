import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { getGallery } from '@/sanity/sanity-utils'
import Image from 'next/image'
import { Card, CardContent } from './ui/card'
export const revalidate = 60

export default async function HomeCarousel() {
  const  images= await  getGallery()
  console.log(images)
  return (
    <section className='max-container relative md:py-36 padding-container'>
    <p className="regular-18 -mt-1 mb-3 uppercase text-green-50">
          Photo Gallery
        </p>
        <div className="flex flex-wrap justify-between gap-5 lg:gap-10">
          <h2 className="bold-40 lg:bold-64 xl:max-w-lg">
            Check our photo gallery
          </h2>
          </div>
    <div className="w-full flex justify-center my-6">
    <Carousel className='w-full max-w-xl'>
  <CarouselContent >
    {images.map(({image}:{image:string})=>(
      <CarouselItem className='flex justify-center' key={images.indexOf(image)}>
     <div className="p-1 max-w-xl">
              <Card className='flex h-full rounded-lg overflow-hidden relative'>
            <Image src={image} width={2000} className='max-h-full object-cover' height={2000} alt="gallery image"/>
              </Card>
            </div>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
      <CarouselNext />
</Carousel>
    </div>
    </section>
  )
}
