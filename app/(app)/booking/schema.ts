import { z } from "zod";

export const formSchema = z.object({
    fullName: z.string().min(3, {
        message: "FullName must be at least 2 characters.",
    }),
    email: z.string().email({ message: "Email is required" }),
    phone: z.string(),
    car: z.string(),
    date: z.string(),
    passengers: z.number().min(1),
    service: z.string(),
    pickupLocation: z.string().min(4),
    dropoffLocation: z.string().min(4),
    comments: z.string(),

});