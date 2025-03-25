const booking = {
  name: "booking",
  type: "document",
  title: "Bookings",
  fields: [
    {
      title: "Date/Time of quotation request (UTC)",
      name: "submittionDateTime",
      type: "string",
    },
    {
      title: "Full name",
      name: "fullName",
      type: "string",
    },
    {
      title: "Email",
      name: "email",
      type: "string",
    },
    {
      title: "Phone number",
      name: "phone",
      type: "string",
    },
    {
      title: "Booked date",
      name: "bookedDate",
      type: "string",
    },
    {
      title: "Car",
      name: "car",
      type: "string",
    },
    {
      title: "Service",
      name: "service",
      type: "string",
    },
    {
      title: "Passengers",
      name: "passengers",
      type: "number",
    },
    {
      title: "Pick up location",
      name: "pickupLocation",
      type: "string",
    },
    {
      title: "Drop off location",
      name: "dropoffLocation",
      type: "string",
    },
    {
      title: "Comments",
      name: "comments",
      type: "string",
    },
    {
        title: "Is costumer contacted",
        type: "boolean",
        name: "isContacted",
      },
    {
        title: "Is confirmed",
        type: "boolean",
        name: "isConfirmed",
      },
    {
        title: "Is paid",
        type: "boolean",
        name: "isPaid",
      },
  ],
};
export default booking;
