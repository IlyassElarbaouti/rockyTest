import { groq } from "next-sanity";
import { client } from "./lib/client";
import createImageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "./env";


const imageBuilder = createImageUrlBuilder({ projectId, dataset });

export const urlForImage = (source: any) => {
  return imageBuilder.image(source).auto("format").fit("max");
};

export async function getCars() {
  return client.fetch(
    groq`*[_type == "car" ]{passengers,slug,"image": image.asset->url,name,bagCapacity,iphoneCharger,surroundSound,bluetoothConnection}`
  );
}

export async function getCar(slug: string) {
  return client.fetch(
    groq`*[_type == "car" && slug.current == "${slug}" ][0]{passengers,slug,"image": image.asset->url,name,bagCapacity,iphoneCharger,surroundSound,bluetoothConnection,additionalInformation,}`
  );
}
export async function getGallery() {
  return client.fetch(
    groq`*[_type == "gallery"  ]{"image": image.asset->url,}`
  );
}


export async function getServices() {
  return client.fetch(groq`*[_type == "service" ]{name,slug,"image": image.asset->url,}`);
}
export async function getFullServices() {
  return client.fetch(groq`*[_type == "service" ]{name,slug,"image": image.asset->url,description}`);
}



