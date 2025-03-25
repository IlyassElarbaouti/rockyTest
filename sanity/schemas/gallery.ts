const gallery = {
    name: "gallery",
    type: "document",
    title: "Gallery",
    fields: [
        {
            name: "image",
            type: "image",
            title: "Image",
            options: {
              hotspot: true, // Enables image cropping
            },
          },
    ],
  };
  export default gallery;
  