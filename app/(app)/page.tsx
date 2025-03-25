import Camp from "@/components/Camp";
import Cars from "@/components/Cars";
import GetApp from "@/components/GetApp";
import Guide from "@/components/Guide";
import Hero from "@/components/Hero";
import HomeCarousel from "@/components/HomeCarousel";
import Services from "@/components/Services";
import Stepper from "@/components/ui/stepper";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="h-1 bg-slate-50 " />
      <Services />
      <div className="h-1 bg-slate-50 " />
      <Cars />
      <div className="h-1 bg-slate-50 " />
      <Guide />
      <div className="h-1 bg-slate-50 " />
      <Stepper/>
      <div className="h-1 bg-slate-50 " />
      <Camp />
      <div className="h-1 bg-slate-50 " />
      <HomeCarousel/>
      <div className="h-1 bg-slate-50 " />
      <GetApp />
    </>
  )
}
