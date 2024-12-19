import React from 'react';

interface TextSectionProps {
  heading: string
  paragraph: string
  backgroundColor: string
}

const TextSection: React.FC<TextSectionProps> = ({ heading, paragraph, backgroundColor }) => {
  return (
    <div
      className={`${backgroundColor === 'secondary' ? 'bg-secondary' : 'bg-background'} w-full text-center default-x-padding pt-6 pb-3`}
    >
      <p className="text-paragraph-primary">{paragraph}</p>
      <h2 className="text-subheading">{heading}</h2>
    </div>
  )
}

export default TextSection;