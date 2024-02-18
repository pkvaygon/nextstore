"use client";
import { Button, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import React from "react";
import { Icon } from '@iconify/react';
import SidebarDrawer from "@/components/shop/SidebarDrawer";
import FilterWrapper from "@/components/shop/FilterWrapper";
import ShopCards from "@/components/shop/ProductSection/ShopCards";
import { selectSortOption } from "@/localdata";
import  products  from '@/nextstore.shoes.json';


export default  function Shop() {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isHidden, setIsHidden] = React.useState(false);
  return (
    <div className="w-full h-auto px-2 lg:px-6">
    <div className="flex gap-x-6">
      <SidebarDrawer isOpen={isOpen} onOpenChange={onOpenChange}>
          <FilterWrapper />
      </SidebarDrawer>
      <div className="w-full flex-1 flex-col">
        <section className="relative z-20 flex flex-col gap-2 rounded-medium bg-default-50 px-4 pb-3 pt-2 md:pt-3">
          <div className="flex items-center gap-1 md:hidden md:gap-2">
            <h2 className="text-large font-medium text-white">Shoes</h2>
            <span className="text-small text-default-400">(1240)</span>
          </div>
          <div className="flex  items-center justify-between gap-2 ">
            <div className="flex flex-row gap-2">
              <Button
                className="flex border-default-200 sm:hidden"
                startContent={
                  <Icon
                    className="text-default-500"
                    height={16}
                    icon="solar:filter-linear"
                    width={16}
                  />
                }
                variant="bordered"
                onClick={onOpen}
              >
                Filters
              </Button>
              <div className="hidden items-center gap-1 md:flex">
                <h2 className="text-medium font-medium text-white">Shoes</h2>
                <span className="text-small text-default-400">(1240)</span>
              </div>
            </div>
            <Select
              aria-label="Sort by"
              classNames={{
                base: "items-center justify-end text-white",
                label:
                  "hidden lg:block text-tiny text-white whitespace-nowrap md:text-small text-default-400",
                mainWrapper: "max-w-xs",
              }}
              defaultSelectedKeys={["most_popular"]}
              label="Sort by"
              labelPlacement="outside-left"
              placeholder="Select an option"
              variant="bordered"
            >
                {
                  selectSortOption.map((item) => (
                    <SelectItem key={item.key} value={item.value} color="secondary" className="text-white">
                    {item.label}
                  </SelectItem>
                    ))
                }
            </Select>
          </div>
        </section>
        <section className="mt-4 h-auto w-full px-1">
          <div className="block  rounded-medium border-medium border-dashed border-divider">
            <ShopCards/>
          </div>
        </section>
      </div>
    </div>
  </div>
  );
}
