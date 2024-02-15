"use client"

import PriceSlider from "./PriceSlider/PriceSlider"

export default function FilterWrapper() {

    return (
        <>
        <div className="my-auto flex flex-col gap-2">
      <h3 className="text-medium font-medium leading-8 text-default-600">Price Range</h3>
      <PriceSlider
        aria-label="Pricing Filter"
        range={{
          min: 0,
          defaultValue: [100, 500],
          max: 1000,
          step: 1,
        }}
        className="glassmorphism"
      />
    </div>
    
        </>
    )
}