"use server";
import { z } from "zod";
import { formSchema } from "./schema";
import { dataset, projectId } from "@/sanity/env";
import moment from "moment";
// import { saveBooking } from "@/sanity/sanity-utils"
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";
const resend = new Resend("re_LCZtd8go_EDHHiEnVWBfCSteBqpni6gNd");

export const saveBooking = async (bookingData: z.infer<typeof formSchema>) => {
  try {
    const response = await fetch(
      `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_SECRET_KEY}`,
        },
        body: JSON.stringify({
          mutations: [
            {
              create: {
                _type: "booking", // Replace with your document type in Sanity
                submittionDateTime: moment(),
                fullName: bookingData.fullName,
                email: bookingData.email,
                phone: bookingData.phone,
                bookedDate: bookingData.date,
                car: bookingData.car,
                service: bookingData.service,
                passengers: bookingData.passengers,
                pickupLocation: bookingData.pickupLocation,
                dropoffLocation: bookingData.dropoffLocation,
                comments: bookingData.comments,
              },
            },
          ],
        }),
      },
    );
    return response;
  } catch (error) {
    console.error("Error creating document:", error);
  }
};

export async function onSubmit(values: z.infer<typeof formSchema>) {
  try {
    await saveBooking(values);
    const { data, error } = await resend.emails.send({
      from: "RMLimo website <onboarding@resend.dev>",
      // to: ["mrfixer59@gmail.com"],
      to: ['info@rmlimo.ca'],
      subject: "RMLimo quotation request via website",
      react: EmailTemplate({ values }),
    });
  } catch (e) {
    console.log(e);
  }
}
