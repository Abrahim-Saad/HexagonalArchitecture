import Item from './item.model'

export default class Cart {
    private id: string;
    private userId: string;
    private items: Array<Item>;
    private total: Number;

    constructor(id: string, userId: string, items: Array<Item>, total: Number) {
        this.id = id;
        this.userId = userId;
        this.items = items;
        this.total = total;
    }

    public getCartItems(): Array<Item> {
        return this.items;
    }

    public getCartInfo(): object {
        return {
            id: this.id,
            userId: this.userId,
            items: this.items,
            total: this.total,
        };
    }
}
