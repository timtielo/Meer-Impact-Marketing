import React from 'react';

interface RichImageProps {
  image: {
    data: {
      target: {
        sys: {
          id: string;
        };
        fields: {
          title: string;
          description?: string;
          file: {
            url: string;
            details: {
              image?: {
                width: number;
                height: number;
              };
            };
            fileName: string;
            contentType: string;
          };
        };
      };
    };
  };
}

export default function RichImage({ image }: RichImageProps) {
  const { fields } = image.data.target;
  const imageDetails = fields.file.details.image;
  const aspectRatio = imageDetails ? imageDetails.width / imageDetails.height : 16/9;

  return (
    <figure className="my-12 max-w-3xl mx-auto">
      <div 
        className="relative rounded-lg overflow-hidden shadow-lg bg-gray-100"
        style={{ paddingBottom: `${(1 / aspectRatio) * 100}%` }}
      >
        <img
          src={`https:${fields.file.url}?w=1200`}
          alt={fields.title}
          className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          width={imageDetails?.width}
          height={imageDetails?.height}
          loading="lazy"
        />
        {fields.description && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <p className="text-white text-sm md:text-base">
              {fields.description}
            </p>
          </div>
        )}
      </div>
      <figcaption className="mt-4 text-center text-sm text-gray-600 italic">
        {fields.title}
      </figcaption>
    </figure>
  );
}