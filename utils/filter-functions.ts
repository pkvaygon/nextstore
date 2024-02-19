"use client";

import { SelectedColorProps, reduxSelectedColors,reduxSelectedSizes,reduxPriceRange,reduxSelectedCategories, reduxSelectedGenders, reduxSelectedBrands } from "@/storage/filterSlice";
import { useAppDispatch, useAppSelector } from "@/storage/redux-hooks";
import  products  from '@/nextstore.shoes.json';
import React from "react";



export const useReduxFunction =()=> {
    const dispatch = useAppDispatch()
    const allPrices: number[] = products.map((product: any) => product.price);
    const minPrice: number = Math.min(...allPrices);
    const maxPrice: number = Math.max(...allPrices);
const reduxColors = useAppSelector(state=> state.filter.selectedColors)
const reduxSizes = useAppSelector(state=> state.filter.selectedSizes)
const reduxCategories = useAppSelector(state=> state.filter.selectedCategories)
const reduxGenders = useAppSelector(state=> state.filter.selectedGenders)
const reduxBrands = useAppSelector(state=> state.filter.selectedBrands)
    React.useEffect(() => {
        dispatch(reduxPriceRange([minPrice, maxPrice]))
    },[minPrice,maxPrice, dispatch])
    function selectColorFC(color: SelectedColorProps) {
    dispatch(reduxSelectedColors(color))
    }
    function selectSizeFC(size: string) {
    dispatch(reduxSelectedSizes(size))
    }
    function selectPriceRangeFC(range: number |number[]) {
        dispatch(reduxPriceRange(range))
    }
    function selectCategoryFC(category: string) {
    dispatch(reduxSelectedCategories(category))
    }
    function selectGenderFC(gender: string) {
    dispatch(reduxSelectedGenders(gender))
    }
    function selectBrandFC(brand: string) {
    dispatch(reduxSelectedBrands(brand))
    }
    return {
        minPrice,
        maxPrice,
        reduxColors,
        reduxSizes,
        reduxCategories,
        reduxGenders,
        reduxBrands,
        selectColorFC,
        selectSizeFC,
        selectPriceRangeFC,
        selectCategoryFC,
        selectGenderFC,
        selectBrandFC
    }
    
}
