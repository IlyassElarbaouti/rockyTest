export type carType = {
    name:string,
    title:string,
    slug:{current:string},
    image:string,
    passengers:number,
    bagCapacity:number,
    iphoneCharger:boolean,
    surroundSound:boolean,
    bluetoothConnection:boolean,
    additionalInformation?:any,
}

export type locationsType = {
    name:string,
    slug:{current:string},
}
export type servicesType = {
    name:string,
    slug:{current:string},
    image?:string,
    description?:any,
}

  