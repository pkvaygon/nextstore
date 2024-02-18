"use client";

import React from "react";
import {Button, Image, Link, Tooltip} from "@nextui-org/react";
import {Icon} from "@iconify/react";

import {cn} from "@/utils";
import { ReduxItemsProps, decrementItem, incrementItem, removeFromCart } from "@/storage/cartSlice";
import { useAppDispatch } from "@/storage/redux-hooks";

type OrderSummaryItemProps = {
  className?: string,
  item: ReduxItemsProps
}
export default function OrderSummaryItem({ className, item }: OrderSummaryItemProps) {
  const dispatch = useAppDispatch()
  const handleRemoveItem = (id: string)=>{
  dispatch(removeFromCart(id))
  }
  return(
  <li
    className={cn("flex items-center gap-x-4 border-b-small border-divider py-4", className)}
  >
    <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center">
      <Image alt={item.label} src={item.image} />
    </div>
    <div className="flex flex-1 flex-col gap-2">
      <h4 className="text-small">
        <div className="font-medium text-foreground">
          {item.label}
        </div>
      </h4>
      <div className="flex items-center max-sm:flex-col max-sm:items-start gap-3">
        <p>
          <span className="text-small text-default-500">Color: </span>
          <span className="text-small font-medium capitalize text-default-700 border-dashed border-1 px-1">{item.colors[0].color} / {item.colors[0].color2} </span>
        </p>
        <p>
          <span className="text-small text-default-500">Size: </span>
          <span className="text-small font-medium text-default-700">{item.sizes[0]}</span>
        </p>
      </div>
      <div className="mt-2 flex justify-between items-center gap-2">
          <span className="text-small font-semibold text-default-700">${item.price}</span>
          <div className="flex gap-2 justify-center items-center">
          <Button onClick={()=> dispatch(decrementItem(item._id.$oid))}  isIconOnly className="h-7 w-7 min-w-[1.5rem]" radius="full" variant="flat">
        <Icon icon="mdi:decrement" width={22} />
      </Button>
            <span className="text-small px-3 text-white ">x {item.quantity}</span>
            <Button onClick={()=> dispatch(incrementItem(item._id.$oid))} isIconOnly className="h-7 w-7 min-w-[1.5rem]" radius="full" variant="flat">
        <Icon icon="mdi:increment" width={22} />
      </Button>
          </div>
      </div>
    </div>
    <Tooltip
      classNames={{
        content: "text-white p-2",
      }}
      content="Remove"
      placement="top"
    >
      <Button onClick={()=>handleRemoveItem(item._id.$oid)} isIconOnly className="h-7 w-7 min-w-[1.5rem]" radius="full" variant="flat">
        <Icon icon="lucide:x" width={14} />
      </Button>
    </Tooltip>
  </li>
)
}

