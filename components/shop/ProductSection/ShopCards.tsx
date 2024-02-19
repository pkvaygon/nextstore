"use client";
import products from '@/nextstore.shoes.json'
import { ScrollShadow } from '@nextui-org/react';
import ProductListItem from './ProductListItem';
import { useAppSelector } from '@/storage/redux-hooks';

export default function ShopCards() {
  const filterState = useAppSelector(state => state.filter);
  const filteredProducts = products.filter((product) => {
    const meetsPriceCondition =
      filterState.priceRange == null ||
      (typeof filterState.priceRange === 'number' && product.price <= filterState.priceRange) ||
      (Array.isArray(filterState.priceRange) &&
        product.price >= filterState.priceRange[0] &&
        product.price <= filterState.priceRange[1]);

    const meetsSizesCondition =
      filterState.selectedSizes.length === 0 ||
      filterState.selectedSizes.some((size) => product.sizes.includes(size));

    const meetsColorsCondition =
      filterState.selectedColors.length === 0 ||
      filterState.selectedColors.some((selectedColor) =>
        product.colors.some((productColor) =>
          selectedColor.color === productColor.color &&
          selectedColor.color2 === productColor.color2 &&
          selectedColor.hex === productColor.hex &&
          selectedColor.hex2 === productColor.hex2
        )
      );

    const meetsCategoriesCondition =
      filterState.selectedCategories.length === 0 ||
      filterState.selectedCategories.includes(product.category);

    const meetsGendersCondition =
      filterState.selectedGenders.length === 0 ||
      filterState.selectedGenders.includes(product.gender);

    const meetsBrandsCondition =
      filterState.selectedBrands.length === 0 ||
      filterState.selectedBrands.includes(product.brand);

    return (
      meetsPriceCondition &&
      meetsSizesCondition &&
      meetsColorsCondition &&
      meetsCategoriesCondition &&
      meetsGendersCondition &&
      meetsBrandsCondition
    );
  });

  return (
    <div className="my-auto flex w-full max-w-full flex-col items-start gap-2">
      <ScrollShadow
        className="h-auto  w-full  max-w-full snap-x grid grid-cols-3 grid-flow-row max-sm:grid-cols-1 gap-6 py-5"
        orientation="horizontal"
        size={20}
      >
        {filteredProducts.map((product) => (
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
  );
}
