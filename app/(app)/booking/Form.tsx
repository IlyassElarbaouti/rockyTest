/* eslint-disable react/no-unescaped-entities */
"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { carType, servicesType } from "@/types";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { PhoneInput } from "@/components/Phone-input";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import Image from "next/image";
import { onSubmit } from "./onSubmit";
import { formSchema } from "./schema";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { Textarea } from "@/components/ui/textarea";

export default function BookingForm({ cars, services }: { services: servicesType[], cars: carType[] }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            date: "",
            service: "",
            dropoffLocation: "",
            pickupLocation: "",
            passengers: 1,
            car: "",
            comments:""
        },
    })
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    const [isSubmitted, setIsSubmitted] = useState(false)
    const handleSubmit = async (params: z.infer<typeof formSchema>) => {
        try {
            toast.loading("Requesting quotation",{id:"request"})
            await onSubmit(params)
            setIsSubmitted(true)
            toast.success("Request sent succesfully",{id:"request"})
            form.reset()
            await setTimeout(() => {
                setIsSubmitted(false)
                
            }, 7000);
        }
        catch (e) {
            toast.error("Could not send request",{id:"request"})
            console.log(e)
        }
    }
    const { width, height } = useWindowSize()
    return (
        <Form  {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className=" my-4 relative flex flex-col items-center">
                {isSubmitted && <Confetti
                    width={width}
                    height={height}
                />}
                <Toaster />
                <div className="contact w-full">
                    <h2>Contact information:</h2>
                    <div className="my-4">
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full name</FormLabel>
                                        <FormControl>
                                            <Input  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>)} />
                    </div>
                    <div className="my-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>)} />
                    </div>
                    <div className="my-4">
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <PhoneInput defaultCountry="CA" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>)} />
                    </div>
                </div>
                <div className="reservation w-full ">
                    <h2>Reservation information:</h2>
                    <div className="w-full overflow-hidden my-4">
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Reservation date</FormLabel>
                                    <FormControl>
                                        <Input className="min-w-full" {...field} type="date" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>)} />
                    </div>
                    <div className="my-4">
                        <FormField
                            control={form.control}
                            name="passengers"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Passengers count:</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} min={1} max={30} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>)} />
                    </div>
                    <div className="w-full my-4">
                        <FormField
                            control={form.control}
                            name="pickupLocation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pick up location</FormLabel>
                                    <FormControl>
                                        <Input className="min-w-full" type="text" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Location's full address
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>)} />
                    </div>
                    <div className="w-full my-4">
                        <FormField
                            control={form.control}
                            name="dropoffLocation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Drop off location</FormLabel>
                                    <FormControl>
                                        <Input className="min-w-full" type="text" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Location's full address
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>)} />
                    </div>
                    <div className="services my-4">
                        <FormField
                            control={form.control}
                            name="service"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Service</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select your service" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {services.map((service) => (
                                                    <SelectItem value={service.slug.current} key={service.name}>{service.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>)} />
                    </div>
                    <div className="cars">
                        <FormField
                            control={form.control}
                            name="car"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Car</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select your car" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {cars.map((car) => (
                                                    <SelectItem className="flex flex-row " value={car.slug.current} key={car.slug.current}>
                                                        <Image className="w-9 inline mx-5" src={car.image} alt={car.name} width={200} height={200} />
                                                        <span>{car.name}</span>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>)} />
                    </div>
                    <div className="w-full my-4">
                        <FormField
                            control={form.control}
                            name="comments"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Comments</FormLabel>
                                    <FormControl>
                                    <Textarea className="min-w-full" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>)} />
                    </div>
                </div>
                <Button className="m-4 my-8 w-full py-8 bg-green-600 hover:bg-green-800">Request quotation</Button>
            </form>
        </Form>
    )
}
