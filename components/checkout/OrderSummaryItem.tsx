"use client";

import React from "react";
import {Button, Image, Link, Tooltip} from "@nextui-org/react";
import {Icon} from "@iconify/react";

import {cn} from "@/utils";
import { ReduxItemsProps } from "@/storage/cartSlice";

type OrderSummaryItemProps = {
  className?: string,
  item: ReduxItemsProps
}
export default function OrderSummaryItem({className, item}: OrderSummaryItemProps) {
  return(
  <li
    className={cn("flex items-center gap-x-4 border-b-small border-divider py-4", className)}
  >
    <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center">
      <Image alt={item.label} src={item.image} />
    </div>
    <div className="flex flex-1 flex-col">
      <h4 className="text-small">
        <div className="font-medium text-foreground">
          {item.label}
        </div>
      </h4>
      <div className="flex items-center gap-3">
        <p>
          <span className="text-small text-default-500">Color: </span>
          <span className="text-small font-medium capitalize text-default-700">{item.colors[0].color}</span>
        </p>
        <p>
          <span className="text-small text-default-500">Size: </span>
          <span className="text-small font-medium text-default-700">{item.sizes[0]}</span>
        </p>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-small font-semibold text-default-700">${item.price}</span>
        <span className="text-small text-default-500">x {item.quantity}</span>
      </div>
    </div>
    <Tooltip
      classNames={{
        content: "text-white p-2",
      }}
      content="Remove"
      placement="top"
    >
      <Button isIconOnly className="h-7 w-7 min-w-[1.5rem]" radius="full" variant="flat">
        <Icon icon="lucide:x" width={14} />
      </Button>
    </Tooltip>
  </li>
)
}

