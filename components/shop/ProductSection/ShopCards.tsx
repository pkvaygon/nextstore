"use client";
import products from '@/nextstore.shoes.json'
import { ScrollShadow } from '@nextui-org/react';
import ProductListItem from './ProductListItem';


const productsWithRatingsAndDescription = products.map((product) => ({
    ...product,
    rating: Math.floor(Math.random() * 5) < 4 ? 4 : 5,
    ratingCount: Math.floor(Math.random() * 1000),
    description: product.description
  }));

export default function ShopCards() {
    return (
        <div className="my-auto flex w-full max-w-full flex-col items-start gap-2">
        <ScrollShadow
          className="h-auto  w-full  max-w-full snap-x grid grid-cols-3 grid-flow-row max-sm:grid-cols-1 gap-6 py-5"
          orientation="horizontal"
          size={20}
        >
          {products.map((product) => (
              <ProductListItem
                  key={product._id.$oid}
                  label={product.label}
                  price={product.price}
                  description={product.description}
                  colors={product.colors}
              rating={product.rating}
              id={product._id.$oid}
                />
          ))}
            </ScrollShadow>
        </div>
        )
}