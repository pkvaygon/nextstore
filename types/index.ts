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