"use client"

import { Accordion, AccordionItem, Button, Checkbox, CheckboxGroup, Chip } from "@nextui-org/react";
import PriceSlider from "./PriceSlider/PriceSlider"
import { allColors, allSizes,allCategories,allGenders,allBrands } from "@/utils";
import { useReduxFunction } from "@/utils/filter-functions";
import { ProductColorsProps, ProductItemProps } from "@/types";
export default function FilterWrapper() {
  type ChangeHandler = (value: string[]) => void;
  const { minPrice, maxPrice,selectColorFC, selectSizeFC, reduxSizes, reduxColors,selectPriceRangeFC,reduxCategories,selectCategoryFC } = useReduxFunction()
    return (
        <section className="flex flex-col gap-2">
        <div className=" flex flex-col gap-2">
      <h3 className="text-medium font-medium leading-8 text-default-600">Price Range</h3>
          <PriceSlider
          onChangeEnd={(values)=>selectPriceRangeFC(values)}
            aria-label="Pricing Filter"
            range={{
          min: minPrice,
          defaultValue: [minPrice, maxPrice],
          max: maxPrice,
          step: 1,
        }}
      />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-medium font-medium leading-8 text-default-600">Sizes</h3>
          <div className="grid grid-cols-5 grid-flow-row gap-2">
          {
                allSizes.map((size,index)=>(
                  <Chip
                    onClick={()=>selectSizeFC(size)}
                    radius="sm"
                    size="lg"
                    key={index}
                    className={`text-foreground cursor-pointer ${reduxSizes.includes(size) ? "bg-purple-400" : "bg-default-400"}`}
                  >
                  {size}
                  </Chip>
                  ))               
            } 
          </div>
        </div>
        <div className="flex flex-col gap-2">
        <h3 className="text-medium font-medium leading-8 text-default-600">
          Colors
        </h3>
        <div className="flex flex-wrap gap-3">
          {allColors.map((color, index) => (
            <button
              key={index}
              className={`rounded-full w-8 h-8 ${reduxColors.includes(color) ? "ring-4 ring-purple-500 ring-offset-1": ""}`}
              style={{
                background: `linear-gradient(to right, ${color.hex} 50%, ${color.hex2} 50%)`,
              }}
              onClick={()=>selectColorFC(color)}
            ></button>
          ))}
          </div>
        </div>
        <Accordion>
          <AccordionItem  key={0} title="Category">
            <div  className="flex flex-col gap-2">
            {
              allCategories.map((category) => (
                <Checkbox onClick={()=> selectCategoryFC(category)} isSelected={reduxCategories.includes(category) ? true : false} value={category}  color="secondary" key={category} title={category}>
                   {category.charAt(0).toUpperCase() + category.slice(1)}
              </Checkbox>
                ))
            }
            </div>
          </AccordionItem>
        </Accordion>
        <Accordion>
          <AccordionItem className="flex flex-col" key={1} title="Gender">
            <div className="flex flex-col gap-2">
            {
              allGenders.map((gender) => (
                <Checkbox color="secondary" key={gender} title={gender}>
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
              </Checkbox>
                ))
            }
            </div>
          </AccordionItem>
        </Accordion>
        <Accordion>
          <AccordionItem className="flex flex-col" key={2} title="Brand">
            <div className="flex flex-col gap-2">
            {
              allBrands.map((brand) => (
                <Checkbox color="secondary" key={brand} title={brand}>
                  {brand.charAt(0).toUpperCase() + brand.slice(1)}
              </Checkbox>
                ))
            }
            </div>
          </AccordionItem>
        </Accordion>
        </section>
    )
}