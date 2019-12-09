import { CartItem } from './cart-item';

export class ShoppingCart {
    constructor(public items: CartItem[]) { }

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
}
