import React from 'react'
import Cards from './Cards'
import { getFullServices } from '@/sanity/sanity-utils'
export const revalidate = 60

export default async function Services() {
const data = await getFullServices() 
    return (
    <Cards data={data}/>
  )
}
