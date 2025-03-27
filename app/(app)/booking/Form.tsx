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
import { Calendar, Car, Clock, MapPin, Users, MessageSquare, Mail, Phone, User, Check, Info, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
            comments: ""
        },
    });
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [activeTab, setActiveTab] = useState("contact");
    const [selectedCar, setSelectedCar] = useState<carType | null>(null);
    const [bookingStep, setBookingStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [timeSelected, setTimeSelected] = useState("10:00");
    const [showDateTimeHelp, setShowDateTimeHelp] = useState(false);
    
    const handleSubmit = async (params: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);
            toast.loading("Processing your request...", { id: "request" });
            await onSubmit({...params, time: timeSelected});
            setIsLoading(false);
            setIsSubmitted(true);
            toast.success("Booking request sent successfully!", { id: "request" });
            form.reset();
            await setTimeout(() => {
                setIsSubmitted(false);
            }, 7000);
        } catch (e) {
            setIsLoading(false);
            toast.error("Could not process your request. Please try again.", { id: "request" });
            console.log(e);
        }
    };
    
    const { width, height } = useWindowSize();
    
    // Handle car selection update
    useEffect(() => {
        const carValue = form.watch("car");
        if (carValue) {
            const selected = cars.find(car => car.slug.current === carValue) || null;
            setSelectedCar(selected);
        } else {
            setSelectedCar(null);
        }
    }, [form.watch("car"), cars]);

    // Form progress calculation
    const contactFieldsFilled = Boolean(
        form.getValues("fullName") && 
        form.getValues("email") && 
        form.getValues("phone")
    );
    
    const reservationFieldsFilled = Boolean(
        form.getValues("date") && 
        form.getValues("passengers") && 
        form.getValues("pickupLocation") && 
        form.getValues("dropoffLocation")
    );
    
    const serviceFieldsFilled = Boolean(
        form.getValues("service") && 
        form.getValues("car")
    );

    // Calculate overall progress
    const totalFields = 9; // Excluding comments which is optional
    const filledFields = [
        form.getValues("fullName"), form.getValues("email"), form.getValues("phone"),
        form.getValues("date"), form.getValues("passengers"), form.getValues("pickupLocation"),
        form.getValues("dropoffLocation"), form.getValues("service"), form.getValues("car")
    ].filter(Boolean).length;
    
    const progress = Math.round((filledFields / totalFields) * 100);
    
    // Popular pickup locations
    const popularLocations = [
        "Toronto Pearson International Airport (YYZ)",
        "Billy Bishop Toronto City Airport (YTZ)",
        "Union Station, Toronto",
        "CN Tower, Toronto",
        "Royal York Hotel, Toronto"
    ];
    
    // Time options for booking
    const timeOptions = [
        "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", 
        "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
        "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
        "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
        "20:00", "20:30", "21:00", "21:30", "22:00"
    ];
    
    // Summary information
    const bookingSummary = {
        contact: form.getValues("fullName") ? {
            name: form.getValues("fullName"),
            email: form.getValues("email"),
            phone: form.getValues("phone")
        } : null,
        trip: form.getValues("date") ? {
            date: form.getValues("date"),
            time: timeSelected,
            passengers: form.getValues("passengers"),
            pickup: form.getValues("pickupLocation"),
            dropoff: form.getValues("dropoffLocation")
        } : null,
        selection: (form.getValues("service") && form.getValues("car")) ? {
            service: services.find(s => s.slug.current === form.getValues("service"))?.name || "",
            car: selectedCar?.name || "",
            comments: form.getValues("comments") || "None"
        } : null
    };

    // Get today's date for the date input's min attribute
    const today = new Date().toISOString().split('T')[0];
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="relative max-w-4xl mx-auto">
                {isSubmitted && <Confetti width={width} height={height} recycle={false} numberOfPieces={500} />}
                <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
                
                {/* Header with progress steps */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Book Your Premium Transportation</h1>
                    <p className="text-gray-600 mb-6">Complete the form below to request a quote for our luxury transportation services.</p>
                    
                    <div className="relative">
                        <div className="flex mb-2">
                            {[1, 2, 3, 4].map((step) => (
                                <div 
                                    key={step} 
                                    className={cn(
                                        "flex-1 text-center relative z-10",
                                        bookingStep >= step ? "text-green-700" : "text-gray-400"
                                    )}
                                >
                                    <div 
                                        className={cn(
                                            "w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-1 border-2 transition-all duration-200",
                                            bookingStep > step 
                                                ? "bg-green-600 border-green-600 text-white" 
                                                : bookingStep === step 
                                                    ? "border-green-600 bg-white text-green-600" 
                                                    : "border-gray-300 bg-white text-gray-400"
                                        )}
                                    >
                                        {bookingStep > step ? <Check className="w-4 h-4" /> : step}
                                    </div>
                                    <div className={cn(
                                        "text-xs font-medium transition-all duration-200",
                                        bookingStep >= step ? "text-green-700" : "text-gray-400"
                                    )}>
                                        {step === 1 ? "Contact" : 
                                         step === 2 ? "Trip Details" : 
                                         step === 3 ? "Vehicle" : "Confirm"}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-200">
                            <div 
                                className="h-full bg-green-600 transition-all duration-500 ease-in-out" 
                                style={{ width: `${(bookingStep - 1) * 33.33}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
                
                {/* Step 1: Contact Information */}
                {bookingStep === 1 && (
                    <Card className="border shadow-lg rounded-xl overflow-hidden animate-fadeIn">
                        <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                            <CardTitle className="text-xl font-semibold flex items-center text-white">
                                <User className="mr-2 h-5 w-5" />
                                Contact Information
                            </CardTitle>
                        </CardHeader>
                        
                        <CardContent className="p-6 space-y-6">
                            <div className="grid gap-6">
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 font-medium">
                                                <User className="inline mr-2 h-4 w-4 text-green-600" />
                                                Full Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="e.g. John Smith" 
                                                    className="focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all" 
                                                    {...field} 
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} 
                                />
                                
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 font-medium">
                                                <Mail className="inline mr-2 h-4 w-4 text-green-600" />
                                                Email Address
                                            </FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="your.email@example.com" 
                                                    className="focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all" 
                                                    {...field} 
                                                />
                                            </FormControl>
                                            <FormDescription className="text-xs">
                                                We'll send your booking confirmation to this email
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )} 
                                />
                                
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 font-medium">
                                                <Phone className="inline mr-2 h-4 w-4 text-green-600" />
                                                Phone Number
                                            </FormLabel>
                                            <FormControl>
                                                <PhoneInput 
                                                    defaultCountry="CA" 
                                                    className="focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all" 
                                                    {...field} 
                                                />
                                            </FormControl>
                                            <FormDescription className="text-xs">
                                                Your driver may contact you on this number
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )} 
                                />
                            </div>
                            
                            <div className="flex justify-end mt-8">
                                <Button 
                                    type="button" 
                                    className="bg-green-600 hover:bg-green-700 transition-all py-2 px-6"
                                    onClick={() => {
                                        if (contactFieldsFilled) {
                                            setBookingStep(2);
                                        } else {
                                            form.trigger(["fullName", "email", "phone"]);
                                        }
                                    }}
                                >
                                    Continue to Trip Details
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
                
                {/* Step 2: Trip Details */}
                {bookingStep === 2 && (
                    <Card className="border shadow-lg rounded-xl overflow-hidden animate-fadeIn">
                        <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                            <CardTitle className="text-xl font-semibold flex items-center text-white">
                                <MapPin className="mr-2 h-5 w-5" />
                                Trip Details
                            </CardTitle>
                        </CardHeader>
                        
                        <CardContent className="p-6 space-y-6">
                            <div className="grid gap-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="date"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel className="text-gray-700 font-medium flex items-center">
                                                        <Calendar className="mr-2 h-4 w-4 text-green-600" />
                                                        Booking Date
                                                        <button
                                                            type="button"
                                                            className="ml-1 text-gray-400 hover:text-gray-600"
                                                            onClick={() => setShowDateTimeHelp(!showDateTimeHelp)}
                                                        >
                                                            <Info className="h-4 w-4" />
                                                        </button>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input 
                                                            type="date"
                                                            min={today}
                                                            className="focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                                                            {...field} 
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} 
                                        />
                                        
                                        {showDateTimeHelp && (
                                            <div className="bg-blue-50 p-3 rounded-md mt-2 text-sm text-blue-700">
                                                <p>Please book at least 4 hours in advance. For short notice bookings, please call us directly.</p>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div>
                                        <FormLabel className="text-gray-700 font-medium flex items-center">
                                            <Clock className="mr-2 h-4 w-4 text-green-600" />
                                            Pickup Time
                                        </FormLabel>
                                        <Select value={timeSelected} onValueChange={setTimeSelected}>
                                            <SelectTrigger className="w-full focus:ring-2 focus:ring-green-500 focus:border-green-500">
                                                <SelectValue placeholder="Select time" />
                                            </SelectTrigger>
                                            <SelectContent className="max-h-56">
                                                {timeOptions.map(time => (
                                                    <SelectItem key={time} value={time}>
                                                        {time}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                
                                <FormField
                                    control={form.control}
                                    name="passengers"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 font-medium flex items-center">
                                                <Users className="mr-2 h-4 w-4 text-green-600" />
                                                Number of Passengers
                                            </FormLabel>
                                            <FormControl>
                                                <div className="flex">
                                                    <Button 
                                                        type="button"
                                                        variant="outline"
                                                        size="icon"
                                                        className="rounded-r-none"
                                                        onClick={() => {
                                                            const current = Number(field.value);
                                                            if (current > 1) {
                                                                field.onChange(current - 1);
                                                            }
                                                        }}
                                                    >
                                                        -
                                                    </Button>
                                                    <Input 
                                                        type="number" 
                                                        min={1} 
                                                        max={30} 
                                                        className="rounded-none text-center focus:ring-2 focus:ring-green-500 focus:border-green-500 w-16"
                                                        {...field} 
                                                    />
                                                    <Button 
                                                        type="button"
                                                        variant="outline"
                                                        size="icon"
                                                        className="rounded-l-none"
                                                        onClick={() => {
                                                            const current = Number(field.value);
                                                            if (current < 30) {
                                                                field.onChange(current + 1);
                                                            }
                                                        }}
                                                    >
                                                        +
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormDescription className="text-xs">
                                                This helps us suggest the right vehicle for your group
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )} 
                                />
                                
                                <FormField
                                    control={form.control}
                                    name="pickupLocation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 font-medium flex items-center">
                                                <MapPin className="mr-2 h-4 w-4 text-green-600" />
                                                Pick-up Location
                                            </FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="Enter full address" 
                                                    className="focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                                                    {...field} 
                                                />
                                            </FormControl>
                                            <FormDescription className="text-xs">
                                                <div className="flex flex-wrap gap-1 mt-2">
                                                    <span className="font-medium">Popular locations:</span>
                                                    {popularLocations.map(location => (
                                                        <button
                                                            type="button"
                                                            key={location}
                                                            onClick={() => field.onChange(location)}
                                                            className="text-green-600 hover:text-green-800 hover:underline transition-colors"
                                                        >
                                                            {location.split(" ")[0]}
                                                        </button>
                                                    ))}
                                                </div>
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )} 
                                />
                                
                                <FormField
                                    control={form.control}
                                    name="dropoffLocation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 font-medium flex items-center">
                                                <MapPin className="mr-2 h-4 w-4 text-green-600" />
                                                Drop-off Location
                                            </FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="Enter full address" 
                                                    className="focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                                                    {...field} 
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} 
                                />
                            </div>
                            
                            <div className="flex justify-between mt-8">
                                <Button 
                                    type="button" 
                                    variant="outline"
                                    onClick={() => setBookingStep(1)}
                                    className="border-gray-300"
                                >
                                    Back
                                </Button>
                                <Button 
                                    type="button" 
                                    className="bg-green-600 hover:bg-green-700 transition-all py-2 px-6"
                                    onClick={() => {
                                        if (reservationFieldsFilled) {
                                            setBookingStep(3);
                                        } else {
                                            form.trigger(["date", "passengers", "pickupLocation", "dropoffLocation"]);
                                        }
                                    }}
                                >
                                    Continue to Vehicle Selection
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
                
                {/* Step 3: Vehicle and Service Selection */}
                {bookingStep === 3 && (
                    <Card className="border shadow-lg rounded-xl overflow-hidden animate-fadeIn">
                        <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                            <CardTitle className="text-xl font-semibold flex items-center text-white">
                                <Car className="mr-2 h-5 w-5" />
                                Choose Your Vehicle & Service
                            </CardTitle>
                        </CardHeader>
                        
                        <CardContent className="p-6 space-y-6">
                            <div className="grid gap-6">
                                <FormField
                                    control={form.control}
                                    name="service"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 font-medium">Service Type</FormLabel>
                                            <FormControl>
                                                <RadioGroup 
                                                    className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2"
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                >
                                                    {services.map((service) => (
                                                        <div key={service.slug.current} className="relative">
                                                            <RadioGroupItem
                                                                value={service.slug.current}
                                                                id={service.slug.current}
                                                                className="peer sr-only"
                                                            />
                                                            <label
                                                                htmlFor={service.slug.current}
                                                                className="flex flex-col h-full p-4 border-2 rounded-lg cursor-pointer peer-checked:border-green-600 peer-checked:bg-green-50 hover:bg-gray-50 transition-all"
                                                            >
                                                                <span className="font-medium text-gray-900">{service.name}</span>
                                                                <span className="text-xs text-gray-500 mt-1">
                                                                    {service.description || "Premium service option"}
                                                                </span>
                                                            </label>
                                                        </div>
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} 
                                />
                                
                                <div className="pt-4">
                                    <FormField
                                        control={form.control}
                                        name="car"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 font-medium flex items-center">
                                                    <Car className="mr-2 h-4 w-4 text-green-600" />
                                                    Select Your Vehicle
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                        {cars.map((car) => (
                                                            <div key={car.slug.current} className="relative">
                                                                <input
                                                                    type="radio"
                                                                    id={car.slug.current}
                                                                    name="car-selection"
                                                                    className="peer sr-only"
                                                                    checked={field.value === car.slug.current}
                                                                    onChange={() => field.onChange(car.slug.current)}
                                                                />
                                                                <label
                                                                    htmlFor={car.slug.current}
                                                                    className="flex flex-col h-full border-2 rounded-lg overflow-hidden cursor-pointer peer-checked:border-green-600 peer-checked:ring-2 peer-checked:ring-green-200 hover:bg-gray-50 transition-all"
                                                                >
                                                                    <div className="h-32 bg-gray-100 relative">
                                                                        <Image
                                                                            src={car.image}
                                                                            alt={car.name}
                                                                            fill
                                                                            className="object-contain p-2"
                                                                        />
                                                                    </div>
                                                                    <div className="p-3">
                                                                        <div className="font-medium text-sm">{car.name}</div>
                                                                        <div className="text-xs text-gray-500 mt-1">
                                                                            {car.description || `Seats up to ${Math.min(Number(form.getValues("passengers")) + 2, 8)} passengers`}
                                                                        </div>
                                                                    </div>
                                                                </label>
                                                                {field.value === car.slug.current && (
                                                                    <div className="absolute top-2 right-2 bg-green-600 text-white rounded-full p-1">
                                                                        <Check className="h-4 w-4" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} 
                                    />
                                </div>
                                
                                <FormField
                                    control={form.control}
                                    name="comments"
                                    render={({ field }) => (
                                        <FormItem className="mt-4">
                                            <FormLabel className="text-gray-700 font-medium flex items-center">
                                                <MessageSquare className="mr-2 h-4 w-4 text-green-600" />
                                                Special Requests (Optional)
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea 
                                                    placeholder="Any special requirements or additional information for your trip?"
                                                    className="min-h-24 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                                                    {...field} 
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} 
                                />
                            </div>
                            
                            <div className="flex justify-between mt-8">
                                <Button 
                                    type="button" 
                                    variant="outline"
                                    onClick={() => setBookingStep(2)}
                                    className="border-gray-300"
                                >
                                    Back
                                </Button>
                                <Button 
                                    type="button" 
                                    className="bg-green-600 hover:bg-green-700 transition-all py-2 px-6"
                                    onClick={() => {
                                        if (serviceFieldsFilled) {
                                            setBookingStep(4);
                                        } else {
                                            form.trigger(["service", "car"]);
                                        }
                                    }}
                                >
                                    Review & Confirm
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
                
                {/* Step 4: Review and Confirmation */}
                {bookingStep === 4 && (
                    <Card className="border shadow-lg rounded-xl overflow-hidden animate-fadeIn">
                        <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                            <CardTitle className="text-xl font-semibold flex items-center text-white">
                                <Check className="mr-2 h-5 w-5" />
                                Review & Confirm Your Booking
                            </CardTitle>
                        </CardHeader>
                        
                        <CardContent className="p-6">
                            <div className="space-y-6">
                                {/* Booking summary sections */}
                                <div className="grid gap-6 md:grid-cols-2">
                                    {/* Contact Information */}
                                    <Card className="border border-gray-200 shadow-sm">
                                        <CardHeader className="bg-gray-50 py-3 px-4">
                                            <CardTitle className="text-sm font-medium flex items-center">
                                                <User className="mr-2 h-4 w-4 text-gray-500" />
                                                Contact Information
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="py-3 px-4">
                                            {bookingSummary.contact && (
                                                <div className="space-y-2 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500">Name:</span>
                                                        <span className="font-medium">{bookingSummary.contact.name}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500">Email:</span>
                                                        <span>{bookingSummary.contact.email}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500">Phone:</span>
                                                        <span>{bookingSummary.contact.phone}</span>
                                                    </div>
                                                </div>
                                            )}
                                            <Button 
                                                type="button" 
                                                variant="ghost" 
                                                size="sm" 
                                                className="mt-2 text-green-600 hover:text-green-700 hover:bg-green-50 p-0 h-auto"
                                                onClick={() => setBookingStep(1)}
                                            >
                                                Edit
                                            </Button>
                                        </CardContent>
                                    </Card>

                                    {/* Trip Details */}
                                    <Card className="border border-gray-200 shadow-sm">
                                        <CardHeader className="bg-gray-50 py-3 px-4">
                                            <CardTitle className="text-sm font-medium flex items-center">
                                                <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                                                Trip Details
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="py-3 px-4">
                                            {bookingSummary.trip && (
                                                <div className="space-y-2 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500">Date:</span>
                                                        <span className="font-medium">{bookingSummary.trip.date}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500">Time:</span>
                                                        <span>{bookingSummary.trip.time}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500">Passengers:</span>
                                                        <span>{bookingSummary.trip.passengers}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500">Pick-up:</span>
                                                        <span className="truncate max-w-40">{bookingSummary.trip.pickup}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500">Drop-off:</span>
                                                        <span className="truncate max-w-40">{bookingSummary.trip.dropoff}</span>
                                                    </div>
                                                </div>
                                            )}
                                            <Button 
                                                type="button" 
                                                variant="ghost" 
                                                size="sm" 
                                                className="mt-2 text-green-600 hover:text-green-700 hover:bg-green-50 p-0 h-auto"
                                                onClick={() => setBookingStep(2)}
                                            >
                                                Edit
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Service and Vehicle Selection */}
                                <Card className="border border-gray-200 shadow-sm">
                                    <CardHeader className="bg-gray-50 py-3 px-4">
                                        <CardTitle className="text-sm font-medium flex items-center">
                                            <Car className="mr-2 h-4 w-4 text-gray-500" />
                                            Vehicle & Service
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="py-3 px-4">
                                        {bookingSummary.selection && (
                                            <div className="md:flex justify-between gap-4">
                                                <div className="space-y-2 text-sm flex-1">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500">Service:</span>
                                                        <span className="font-medium">{bookingSummary.selection.service}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500">Vehicle:</span>
                                                        <span>{bookingSummary.selection.car}</span>
                                                    </div>
                                                    {bookingSummary.selection.comments && (
                                                        <div>
                                                            <span className="text-gray-500 block mb-1">Special Requests:</span>
                                                            <p className="text-gray-700 bg-gray-50 p-2 rounded text-xs">
                                                                {bookingSummary.selection.comments}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="mt-4 md:mt-0 max-w-36">
                                                    {selectedCar && (
                                                        <div className="h-20 relative">
                                                            <Image
                                                                src={selectedCar.image}
                                                                alt={selectedCar.name}
                                                                fill
                                                                className="object-contain"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                        <Button 
                                            type="button" 
                                            variant="ghost" 
                                            size="sm" 
                                            className="mt-2 text-green-600 hover:text-green-700 hover:bg-green-50 p-0 h-auto"
                                            onClick={() => setBookingStep(3)}
                                        >
                                            Edit
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Payment and Terms */}
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm">
                                    <div className="flex items-start space-x-2">
                                        <div className="mt-1">
                                            <Info className="h-4 w-4 text-amber-500" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-700">Important Information</p>
                                            <ul className="mt-2 space-y-1 text-gray-600 list-disc pl-4">
                                                <li>Your booking will be confirmed after we review your request.</li>
                                                <li>A confirmation email will be sent with price details.</li>
                                                <li>Payment can be made securely after confirmation.</li>
                                                <li>24-hour cancellation policy applies to all bookings.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <Button 
                                        type="button" 
                                        variant="outline"
                                        onClick={() => setBookingStep(3)}
                                        className="border-gray-300"
                                    >
                                        Back
                                    </Button>
                                    <Button 
                                        type="submit" 
                                        className="bg-green-600 hover:bg-green-700 transition-all py-6 px-8 text-lg font-medium"
                                        disabled={isLoading || !form.formState.isValid}
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <CreditCard className="mr-2 h-5 w-5" />
                                                Request Quotation
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Success message after submission */}
                {isSubmitted && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md mx-auto">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                    <Check className="h-8 w-8 text-green-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Request Sent!</h2>
                                <p className="text-gray-600 mb-6">We've received your booking request and will contact you shortly with a confirmation and quote.</p>
                                <Button 
                                    className="bg-green-600 hover:bg-green-700 w-full"
                                    onClick={() => setIsSubmitted(false)}
                                >
                                    Close
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </Form>
    )
}