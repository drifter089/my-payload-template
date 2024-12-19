import React from 'react';
import Image from 'next/image';
import { Media } from '@/payload-types';

interface PlatformIconLinkProps {
  image?: string | Media | null;
  link: string;
}

const PlatformIconLink: React.FC<PlatformIconLinkProps> = ({ image, link }) => {

  const imageUrl = typeof image === 'string' ? image : image?.url || '/default-icon.png';

  return (
    <div className="items-center justify-center w-[9rem] h-[9rem] bg-gray-100 rounded-full hover:bg-gray-200 transition">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-full h-full flex items-center justify-center"
      >
        {typeof image !== 'string' && image?.url && (
          <div className="relative w-full h-full">
            <Image
              src={image.url}
              alt={image.alt || 'Image description'}
              fill
              className="object-contain"
            />
          </div>
        )}
      </a>
    </div>


  );
};

export default PlatformIconLink;