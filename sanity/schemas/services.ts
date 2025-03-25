const page = {
  name: "service",
  type: "document",
  title: "Services",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      validation: (Rule: any) => Rule.required(),
      options: {
        source: "name",
        maxLength: 200, // will be ignored if slugify is set
      },
    },
    {
      name: "image",
      type: "image",
      title: "Image",
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: "Description",
      name: "description",
      type: "array",
      of: [
        {
          type: "block",
          marks: {
            annotations: [
              {
                name: "link",
                type: "object",
                title: "External link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                  {
                    title: "Open in new tab",
                    name: "blank",
                    description:
                      "Read https://css-tricks.com/use-target_blank/",
                    type: "boolean",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
              description: "Important for SEO and accessiblity.",
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
