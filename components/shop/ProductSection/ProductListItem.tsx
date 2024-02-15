"use client";

import { Accordion, AccordionItem, Card, CardBody, Chip, Image } from '@nextui-org/react';
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
  return (
    <Card>
      <CardBody className='flex flex-col gap-3'>
        <div>
        <Image isZoomed src={colors[0].images.main} alt={label} />
        </div>
        <div className='flex justify-between'>
        <h2>{label}</h2>
          <h3>${price}</h3>
        </div>
        <div className='w-full flex flex-wrap justify-start gap-3'>
        {
  colors.map((color, index) => (
    <span
      className='w-7 h-7 rounded-full'
      key={color.color}
      style={{
        background: `linear-gradient(to right, ${color.hex} 50%, ${color.hex2} 50%)`,
      }}
    >
    </span>
  ))
}
        </div>
        <div className='grid grid-cols-5 grid-rows-1'>
        {
          newRating.map((star, index) => (
    <Icon
      color='secondary'
      key={index}
      className={cn(
        "pointer-events-none transition-transform-colors text-yellow-400",
      )}
      icon="solar:star-bold"
      width="32"
    />
  ))
}
        </div>
    </CardBody>
    </Card>
    )
}