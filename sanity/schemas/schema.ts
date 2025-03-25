import { type SchemaTypeDefinition } from 'sanity'
import cars from './cars'
import services from './services'
import booking from './bookings'
import gallery from './gallery'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [cars, services,booking,gallery],
}
