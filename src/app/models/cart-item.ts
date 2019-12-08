import { Product } from 'src/app/models/product';
export interface CartItem {
    product: Product;
    quantity: number;
}
