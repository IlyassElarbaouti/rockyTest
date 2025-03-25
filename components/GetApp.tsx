import React from 'react'
import ActionButton from './ui/ActionButton'
import Link from 'next/link'
import { Button } from './ui/button'
import Image from 'next/image'

const GetApp = () => {
  return (
    <section  className="flexCenter w-full flex-col pb-[100px]">
      <div className="get-app">
        <div className="z-20 flex w-full flex-1 flex-col items-start justify-center gap-12">
          <h2 className="bold-40 lg:bold-64 xl:max-w-[320px]">Ready to Book Your Ride?</h2>
          {/* <p className="regular-16 text-gray-10">Choose Your Booking Method:</p> */}
          <div  className="my-11 justify-center items-center flex w-full flex-col gap-3 sm:flex-row">
          <Link href={"/booking"}>
            <Button
              type="button"
              title="Online Booking"
              className="bg-green-600 rounded-3xl"
              size="lg"
            >BOOK NOW!</Button>
          </Link>
          <a href={`tel:+18668467720`}>
          <Button
          variant="ghost"
              type="button"
              title="Online Booking"
              className=" rounded-3xl bg-white text-black gap-3"
              size="lg"
            >
          <Image src={"/play.svg"} alt="call" width={24} height={24} />
              CALL US
            </Button>
            </a>
        </div>
        </div>
      </div>
    </section>
  )
}

export default GetApp