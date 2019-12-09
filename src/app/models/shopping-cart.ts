import { Product } from './product';
import { CartItem } from './cart-item';

export class ShoppingCart {
    items: CartItem[] = [];
    constructor(public itemsMap: { [productId: string]: CartItem }) {
        // tslint:disable-next-line: forin
        for (let productId in itemsMap) {
            let item = itemsMap[productId];
            this.items.push(new CartItem(item.product, item.quantity));
        }
    }

    get totalItemsCount() {
        let shoppingCartCount = 0;
        // tslint:disable-next-line: forin
        for (const productId in this.items) {
            shoppingCartCount += this.items[productId].quantity;
        }
        return shoppingCartCount;
    }

    get productIds() {
        return Object.keys(this.items);
    }

    get totalPrice() {
        let sum = 0;
        // tslint:disable-next-line: forin
        for (let productId in this.items) {
            sum += this.items[productId].totalPrice;
        }
        return sum;
    }
    getQuantity(product: Product) {
        const item = this.itemsMap[product.key];
        return item ? item.quantity : 0;
    }
}
