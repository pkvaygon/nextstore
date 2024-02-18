"use client";


import React from "react";
import {Button, Divider, Input} from "@nextui-org/react";
import OrderSummaryItem from "./OrderSummaryItem";
import { ReduxItemsProps } from "@/storage/cartSlice";


export type OrderSummaryProps = React.HTMLAttributes<HTMLDivElement> & {
  hideTitle?: boolean;
  items: ReduxItemsProps[];
  totalPrice: number
};

export default function OrderSummary({totalPrice, hideTitle, items, ...props }: OrderSummaryProps) {
  return (
    <div {...props}>
      {!hideTitle && (
        <>
          <h2 className="font-medium text-default-500">Your Order</h2>
          <Divider className="mt-4" />
        </>
      )}
      <h3 className="sr-only">Items in your cart</h3>
      <ul>
        {items?.map((item) => (
          <OrderSummaryItem item={item} key={item._id.$oid} />
        ))}
      </ul>
      <div>
        <form className="mb-4 mt-6 flex items-end gap-2" onSubmit={(e) => e.preventDefault()}>
          <Input
            classNames={{
              label: "text-default-700",
              inputWrapper: "bg-background",
            }}
            color="primary"
            label="Coupon code"
            labelPlacement="outside"
            placeholder="Enter coupon code"
            variant="bordered"
          />
          <Button type="submit">Apply</Button>
        </form>
        <dl className="flex flex-col gap-4 py-4">
          <div className="flex justify-between">
            <dt className="text-small text-default-500">Subtotal</dt>
            <dd className="text-small font-semibold text-default-700">${totalPrice.toFixed(2)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-small text-default-500">Delivery</dt>
            <dd className="text-small font-semibold text-default-700">$0.00</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-small text-default-500">Tax</dt>
            <dd className="text-small font-semibold text-default-700">$23.99</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-small text-default-500">Discount</dt>
            <dd className="text-small font-semibold text-success"> - $10.99</dd>
          </div>
          <Divider />
          <div className="flex justify-between">
            <dt className="text-small font-semibold text-default-500">Total</dt>
            <dd className="text-small font-semibold text-default-700">${totalPrice.toFixed(2)}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
