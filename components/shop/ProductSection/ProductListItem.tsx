"use client";

import { Card, CardBody, Image } from '@nextui-org/react';
import React from 'react'

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
  rating: number,
  description: string,
  colors: ProductListItemColorProps[]
}

export default function ProductListItem({label, price, rating, colors, description}: ProductListItemProps) {

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
    </CardBody>
    </Card>
    )
}