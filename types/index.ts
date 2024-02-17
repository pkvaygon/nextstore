export interface NavLinkProps{
    id: number,
    key: string,
    label: string,
    href: string
}
export type ProductItem = {
    id: string;
    name: string;
    href: string;
    price: number;
    color: string;
    size: string;
    isNew?: boolean;
    rating?: number;
    availableColors?: ProductListItemColor[];
    ratingCount?: number;
    description?: string;
    imageSrc: string;
};
export type ProductListItemColor = {
    name: string;
    hex: string;
};
export type LoginModalProps = {
    isOpen: boolean,
    onClose: ()=> void,
    onOpen?: () => void,
    onOpenChange?: ()=> void
}
 export interface ProductColorsProps {
    color: string;
    color2: string;
    hex: string;
    hex2: string;
    images: string[];
  }
  
 export interface ProductItemProps {
    _id: {
      $oid: string;
    };
    label: string;
    description: string;
    style: string;
    lace_type: string;
    info: string[];
    sizes: string[];
    price: number;
    old_price?: number;
    in_stock: boolean;
    gender: string;
    category: string;
    brand: string;
    rating: number[]; // You may need to define the structure of rating
    reviews: any[]; // You may need to define the structure of reviews
    colors: ProductColorsProps[];
  }