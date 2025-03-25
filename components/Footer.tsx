import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="flexCenter mb-24 mt-12">
      <div className="padding-container max-container flex w-full flex-col gap-14">
        <div className="flex flex-col items-start justify-center gap-[10%] md:flex-row">
          <Link href="/" className="mb-10">
            <Image src="/limousine-logo.webp" alt="logo" className='rounded-full' width={74} height={29} />
          </Link>

          <div className='flex flex-wrap gap-10 sm:justify-between md:flex-1'>
            <div className=""></div>

            <div className="flex flex-col gap-5">
              <FooterColumn title={FOOTER_CONTACT_INFO.title}>

                <a
                  href={`tel:+18668467720`}
                  className="flex gap-4 md:flex-col lg:flex-row"
                >
                  <p className="whitespace-nowrap">
                    Our Phone:
                  </p>
                  <p className="medium-14 whitespace-nowrap text-blue-70">
                    {`+ 1 (866) 8467-720`}
                  </p>
                </a>
                <a
                 href= "mailto:info@rmlimo.ca"
                  className="flex gap-4 md:flex-col lg:flex-row"
                >
                  <p className="whitespace-nowrap">
                    Our Email:
                  </p>
                  <p className="medium-14 whitespace-nowrap text-blue-70">
                    {`info@rmlimo.ca`}
                  </p>
                </a>
              </FooterColumn>
            </div>

            <div className="flex flex-col gap-5">
              <FooterColumn title={SOCIALS.title}>
                <ul className="regular-14 flex gap-4 text-gray-30">
                 
                    <a target='_blank' href="https://www.instagram.com/rockymountainlimo" >
                      <Image src={'/instagram.svg'} alt="logo" width={24} height={24} />
                    </a>
                    <a target='_blank' href="whatsapp://send?text=Hello World!&phone=+14036882023" >
                      <Image src={'/whatsapp.svg'} alt="logo" width={24} height={24} />
                    </a>
                    <a target='_blank' href="https://x.com/rmlimo_canada" >
                      <Image src={'/x.svg'} alt="logo" width={24} height={24} />
                    </a>
                  
                </ul>
              </FooterColumn>
            </div>
          </div>
        </div>

        <div className="border bg-gray-20" />
        <p className="regular-14 w-full text-center text-gray-30">2024 Rocky mountain limo | All rights reserved</p>
      </div>
    </footer>
  )
}

type FooterColumnProps = {
  title: string;
  children: React.ReactNode;
}

const FooterColumn = ({ title, children }: FooterColumnProps) => {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="bold-18 whitespace-nowrap">{title}</h4>
      {children}
    </div>
  )
}

export default Footer