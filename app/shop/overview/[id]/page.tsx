"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  Chip,
  Image,
  Link,
  RadioGroup,
  ScrollShadow,
} from "@nextui-org/react";
import {Icon} from "@iconify/react";

import {cn} from "@/utils";
import concret from '@/nextstore.shoes.json'
import { shippingAndReturns } from "@/localdata";
import { useAppDispatch } from "@/storage/redux-hooks";
import { ReduxItemsProps, addToCart } from "@/storage/cartSlice";
import { ProductItemProps } from "@/types";

interface ParamsProps{
    params: {
    id: string
    }
}

export default function OverviewProduct({ params }:ParamsProps) {
  const id = params.id
  const dispatch = useAppDispatch()
    const product =concret.find(product => product._id.$oid === id)
  const [isStarred, setIsStarred] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [currentColorIndex, setCurrentColorIndex] = React.useState(0)
  const [selectedSizes, setSelectedSizes] = React.useState<Set<string>>(new Set());
        const newRating =  [1,2,3,4,5]
    if (!product) {
        return <div>Product not found</div>;
  }
  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
  };
  const handleColorClick = (index: number) => {
  setCurrentColorIndex(index)
  }
  const convertToReduxFormat = (item: ProductItemProps): ReduxItemsProps => {
    return {
      _id: item._id,
      label: item.label,
      sizes: Array.from(selectedSizes),
      price: item.price,
      colors: item.colors.map((color) => ({
        color: color.color,
        color2: color.color2,
        hex: color.hex,
        hex2: color.hex2,
      })),
      image: item.colors[0].images[0],
      quantity: item.quantity || 1,
    };
  };
  const handleAddCart = (item: ProductItemProps) => {
    const reduxItem = convertToReduxFormat(item);
    dispatch(addToCart(reduxItem));
  };
  
  const handleSizeClick = (size: string) => {
    setSelectedSizes((prevSelectedSizes) => {
      const newSelectedSizes = new Set(prevSelectedSizes);
      if (newSelectedSizes.has(size)) {
        newSelectedSizes.delete(size);
      } else {
        newSelectedSizes.add(size);
      }
      return newSelectedSizes;
    });
  };
    return (
        <section className="container h-auto lg:h-auto overflow-hidden p-4">
      <div
        className={cn(
          "relative w-full h-auto flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8",
        )}
      >
        {/* Product Gallery */}
        <div className="relative h-full w-full flex-none">
            <Chip
              className="absolute left-3 top-3 z-20 h-10 gap-1 bg-background/60 pl-3 pr-2 text-foreground/90 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50"
              size="lg"
              startContent={<Icon icon="solar:star-bold" />}
            >
              Popular
            </Chip>
          {/* Main Image */}
          <Image isZoomed src={product.colors[currentColorIndex].images[currentImageIndex]} alt={product?.label} className="h-full w-full" radius="lg"  />
          {/* Image Gallery */}
          <ScrollShadow
            className="-mx-2 -mb-4 mt-4 flex w-full max-w-full gap-4 px-2 pb-4 pt-2"
            orientation="horizontal"
                    >
            {product?.colors[currentColorIndex].images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                className="relative h-24 w-24 flex-none cursor-pointer items-center justify-center rounded-medium ring-offset-background transition-shadow data-[selected=true]:outline-none data-[selected=true]:ring-2 data-[selected=true]:ring-focus data-[selected=true]:ring-offset-2"
                data-selected={index}
                onClick={() => handleImageClick(index)}
              >
                <Image
                  src={image}
                  removeWrapper
                  alt="sd"
                  classNames={{
                    img: "h-full w-full",
                  }}
                  radius="lg"
                />
              </button>
            ))}
          </ScrollShadow>
        </div>

        {/* Product Info */}
        <div className="flex flex-col text-white gap-3">
          <h1 className="text-2xl font-bold tracking-tight">{product?.label}</h1>
          <h2 className="sr-only">Product information</h2>
          <div className="my-2 flex items-center gap-2">
          <div className='flex'>
        {
          newRating.map((_, index) => (
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
            <p className="text-small text-default-400">
              669 reviews
            </p>
          </div>
          <p className="text-xl font-medium tracking-tight">${product?.price}</p>
          <div className="mt-4">
            <p className="sr-only">Product description</p>
            <p className="line-clamp-3 text-medium text-default-500">{product?.description}</p>
          </div>
          <div className='w-full flex flex-wrap justify-start gap-3 mt-5'>
        {
  product.colors.map((color, index) => (
    <span
      onClick={()=>handleColorClick(index)}
       className={`max-w-7 w-7 h-7 rounded-full
    transition-transform group-data-[pressed=true]:scale-90 ${currentColorIndex === index ?
          'outline outline-offset-2 outline-purple-500' : ''}`}
      key={index}
      style={{
        background: `linear-gradient(to right, ${color.hex} 50%, ${color.hex2} 50%)`,
      }}
    >
    </span>
  ))
}
        </div>
          <div className="mt-6 flex flex-col gap-1">
            <div className="mb-4 flex items-center gap-2 text-default-700">
              <Icon icon="carbon:delivery" width={24} />
              <p className="text-small font-medium">Free shipping and 30 days return</p>
            </div>
            <div className="flex flex-wrap justify-start items-center gap-2">
            {
                product.sizes.map((size,index)=>(
                    <Chip
                        radius="sm"
                        size="lg"
                        key={index}
                        className={`text-foreground ${selectedSizes.has(size) ? 'bg-purple-500' : ''}`}
                    onClick={() => handleSizeClick(size)}
                    >{size}</Chip>
                    ))                
            }                
            </div>
            <Link isExternal className="my-2 text-default-400" href="#" size="sm">
              See guide
              <Icon className="[&>path]:stroke-[2px]" icon="solar:arrow-right-up-linear" />
            </Link>
          </div>
          <Accordion
            className="-mx-1 mt-2"
            itemClasses={{
              title: "text-default-400",
              content: "pt-0 pb-6 text-base text-default-500",
            }}
            // items={product.info}
            selectionMode="multiple"
            >
              <AccordionItem key={0} title={'Information'}>
                
                <ul className="list-inside list-disc flex flex-col gap-2">
                  <li className="text-default-500">
                    Lace type : {product.lace_type}
                  </li>
                  {
                    product?.info.map((info, index) => (
                        <li key={index} className="text-default-500">
                          {info}
                        </li>
                      ))
                  }
                    </ul>
              </AccordionItem>
              <AccordionItem key={1} title={'Shipping & Returns'}>
                <ul className="list-inside list-disc flex flex-col">
                  {shippingAndReturns.map((info, index) => (
                    <li className="text-default-500" key={index}>
                      {info}
                  </li>
                  ))
                  }
                </ul>
              </AccordionItem>
          </Accordion>
          <div className="mt-2 flex gap-2">
              <Button
                onClick={()=> handleAddCart(product)}
              fullWidth
              className="text-medium font-medium"
              color="primary"
              size="lg"
              startContent={<Icon icon="solar:cart-large-2-bold" width={24} />}
            >
              Add to cart
            </Button>
            <Button
              isIconOnly
              className="text-default-600"
              size="lg"
              variant="flat"
              onPress={() => setIsStarred(!isStarred)}
            >
              {isStarred ? (
                <Icon icon="solar:heart-bold" width={24} />
              ) : (
                <Icon icon="solar:heart-linear" width={24} />
              )}
            </Button>
          </div>
        </div>
            </div>
            </section>
    )
};