import { getCars, getServices } from "@/sanity/sanity-utils";
import Form from "./Form";

export const revalidate = 60
export const dynamic = "force-dynamic";

export default async function Booking() {
  const cars = await getCars();
  const services = await getServices();
  
  return (
    <div className="max-container my-6 prose relative  padding-container">
      <h1 className="">Book your ride now </h1>
      <Form cars={cars} services={services} />
    </div>
  )
}
