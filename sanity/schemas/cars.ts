const page = {
    name: "car",
    type: "document",
    title: "Car",
    fields: [
      {
        name: "name",
        type: "string",
        title: "Name",
        validation: (Rule:any) => Rule.required(),
      }, 
      {
        title: "Slug",
        name: "slug",
        type: "slug",
        validation: (Rule:any) => Rule.required(),
        options: {
          source: "name",
          maxLength: 200, // will be ignored if slugify is set
        },
      },
      {
        name: "image",
        type: "image",
        title: "Image",
        validation: (Rule:any) => Rule.required(),
      },
      {
        name: "passengers",
        type: "number",
        title: "Passengers",
        validation: (Rule:any) => Rule.required(),
      },
   
      {
        title: "Bag Capacity",
        type: "number",
        name: "bagCapacity",
        validation: (Rule:any) => Rule.required(),
      },
      {
        title: "Iphone charger",
        type: "boolean",
        name: "iphoneCharger",
        validation: (Rule:any) => Rule.required(),
      },
      {
        title: "Surround sound",
        type: "boolean",
        name: "surroundSound",
        validation: (Rule:any) => Rule.required(),
      },
      {
        title: "Bluethoot connection",
        type: "boolean",
        name: "bluetoothConnection",
        validation: (Rule:any) => Rule.required(),
      },
     
      {
        title: "Additional information",
        name: "additionalInformation",
        type: "array",
        of: [
          { type: "block",marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'External link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL'
                  },
                  {
                    title: 'Open in new tab',
                    name: 'blank',
                    description: 'Read https://css-tricks.com/use-target_blank/',
                    type: 'boolean'
                  }
                ]
               },]}},
               {
                type: 'image',
                  fields: [
                    {
                      name: 'alt',
                      type: 'string',
                      title: 'Alternative text',
                      description: 'Important for SEO and accessiblity.',
                        options: {
                          isHighlighted: true,
                      },
                    },
                  ],
              },
        ],
       },
    ],
  };
  export default page;