import { formSchema } from '@/app/(app)/booking/schema';
import * as React from 'react';
import { z } from 'zod';

interface EmailTemplateProps {
    values: z.infer<typeof formSchema>
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  values
}) => (
  <div>
    <h1>Booking request from {values.fullName}</h1>
    <h2>Requested car: {values.car}</h2>
    <h2>For: {values.date}</h2>
    <h1>From: {values.pickupLocation}</h1>
    <h1>To: {values.dropoffLocation}</h1>
    <h1>Service requested: {values.service}</h1>
    <h1>The passengers count is: {values.passengers}</h1>
    <p>Comments: {values.comments}</p>
    <h1>Contact the customer by email: {values.email}</h1>
    <h1>Contact the customer by phone number: {values.phone}</h1>
  </div>
);
