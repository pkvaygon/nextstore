"use client";

import { Accordion, AccordionItem, Button, Card, CardBody, Chip, Image } from '@nextui-org/react';
import React from 'react'
import { Icon } from '@iconify/react';
import { cn } from '@/utils';

interface ProductListItemColorProps{
  color: string,
  color2: string,
  hex: string,
  hex2: string,
  images: {
    main: string,
    additional: string[]
  }
}

interface ProductListItemProps{
  label: string,
  price: number,
  rating: number[],
  description: string,
  colors: ProductListItemColorProps[]
}

export default function ProductListItem({label, price, rating, colors, description}: ProductListItemProps) {
  function generateRandomRating() {
    const randomRating = Math.floor(Math.random() * 3) + 3;
    return Array.from({ length: randomRating }, (_, index) => index + 1);
  }
  const newRating = rating.length > 0 ? rating : generateRandomRating();
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  return (
    <Card>
      <CardBody className='flex flex-col gap-3'>
        <div>
        <Image isZoomed src={colors[currentImageIndex].images.main} alt={label} />
        </div>
        <div className='flex justify-between'>
        <h2 className='max-h-[54px] h-[54px]'>{label}</h2>
          <h3>${price}</h3>
        </div>
        <div className='w-full flex flex-wrap justify-start gap-3'>
        {
  colors.map((color, index) => (
    <span
    className={`max-w-7 w-7 h-7 rounded-full ${currentImageIndex === index ? 'outline outline-offset-2 outline-purple-500' : ''}`}
      key={index}
      style={{
        background: `linear-gradient(to right, ${color.hex} 50%, ${color.hex2} 50%)`,
      }}
      onClick={() => setCurrentImageIndex(index)}
    >
    </span>
  ))
}
        </div>
        <div className="flex justify-between items-center">
        <div className='flex'>
        {
          newRating.map((star, index) => (
    <Icon
      color='secondary'
      key={index}
      className={cn(
        "pointer-events-none transition-transform-colors text-yellow-400",
      )}
      icon="solar:star-bold"
      width="10"
    />
  ))
}
        </div>
          <Button variant='shadow' color='secondary'>Overview</Button>
        </div>
    </CardBody>
    </Card>
    )
}