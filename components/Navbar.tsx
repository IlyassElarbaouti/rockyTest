"use client"
import { NAV_LINKS } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { motion } from "framer-motion"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"

const Navbar = () => {
  return (
    <motion.nav transition={{ type: "tween", duration: 0.2 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }} className="sticky py-4 top-0  w-full backdrop-blur flex-none transition-colors duration-500 z-50 border-b border-slate-900/10  bg-white supports-backdrop-blur:bg-white/95 ">
      <div className="max-container  padding-container  flexBetween">
        <Link href="/">
          <Image className="rounded-full" src="/limousine-logo.webp" alt="logo" width={54} height={29} />
        </Link>
        <ul className="hidden h-full gap-12 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link href={link.href} key={link.key} className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
              {link.label}
            </Link>
          ))}
        </ul>
        <div className="lg:flexCenter hidden">
          <Link href={"/booking"}>
            <Button
              type="button"
              className="bg-green-500 p-4 rounded-full hover:bg-green-700"
            >
              Online Booking
            </Button>
          </Link>
        </div>
        <Sheet>
          <SheetTrigger className="lg:hidden" asChild>
            <Button variant="outline">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="grid gap-4 py-4">
              {NAV_LINKS.map((link) => (
                <SheetClose key={link.key}>
                  <Link href={link.href} className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
            </div>
            <div className="flex justify-center">
              <SheetClose>
                <Link href={"/booking"}>
                  <Button
                    type="button"
                    className="bg-green-500 p-4 rounded-full hover:bg-green-700"
                  >
                    Online Booking
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.nav>
  )
}

export default Navbar