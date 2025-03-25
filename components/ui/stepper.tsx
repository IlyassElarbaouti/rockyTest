
import { Car, Check, LocateIcon, Send, User } from 'lucide-react';
import React from 'react'

const Stepper = () => {

    const WORK_STEPS = [
        {
            id: 1,
            title: "Personal details",
            description: "Enter your personal information including name, contact number, and email address. This helps us to keep you informed about your booking.",
            Icon: () => <User />,
        },
        {
            id: 2,
            title: "Service",
            description: "Select the type of transportation service you require, such as airport transfer, private tour, or long-distance travel. Specify any additional preferences or special requests.",
            Icon: () => <LocateIcon />,
        },
        {
            id: 3,
            title: "Car",
            description: "Choose the car that best suits your needs from our fleet. You can select from a variety of options.",
            Icon: () => <Car />,
        },
        {
            id: 4,
            title: "Confirm",
            description: "Review all the details you have provided and confirm your booking. One of our agents will contact you as soon as possible to finalize the booking.",
            Icon: () => <Send />,
        },
    ] as const;


    return (
        <section id='work' className="text-gray-600 body-font py-24">
                  <div className="padding-container max-container w-full ">
        <p className="uppercase regular-18 -mt-1 mb-3 text-green-50">
          How do we work?
        </p>
        <div className="flex flex-wrap justify-between gap-5 lg:gap-10">
          <h2 className="bold-40 lg:bold-64 xl:max-w-[390px]">Our Online Booking Process</h2>
        </div>
      </div>
            <div className="container px-5  mx-auto flex flex-wrap">

                {
                    WORK_STEPS.map(step => (
                        <React.Fragment key={step.id}>
                            <div className="flex relative pt-10 pb-20 sm:items-center md:w-2/3 mx-auto">
                                <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                                    <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                                </div>
                                <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-green-500 text-white relative z-10 title-font font-medium text-sm">{step.id}</div>
                                <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                                    <div className="flex-shrink-0 w-24 h-24 bg-green-100 text-green-500 rounded-full inline-flex items-center justify-center">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-12 h-12" viewBox="0 0 24 24">
                                            <step.Icon />
                                        </svg>
                                    </div>
                                    <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                                        <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">{step.title}</h2>
                                        <p className="leading-relaxed">{step.description}</p>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    ))
                }
            </div>
        </section>
    )
}

export default Stepper