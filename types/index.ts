export interface NavLinkProps{
    id: number,
    key: string,
    label: string,
    href: string
}

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
    rating: number[];
    reviews: any[]; 
   colors: ProductColorsProps[];
   quantity?: number;
  }