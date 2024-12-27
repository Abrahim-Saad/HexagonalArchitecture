import Item from './item.model'

export default class Cart {
    private id: string;
    private userId: string;
    private items: Array<Item>;
    private total: number;

    constructor(id: string, userId: string, items: Array<Item>, total: number) {
        this.id = id;
        this.userId = userId;
        this.items = items;
        this.total = total;
    }


    public getCartId(): string {
        return this.id;
    }

    public getUserId(): string {
        return this.userId;
    }

    public getCartItems(): Array<Item> {
        return this.items;
    }

    public setTotal(total: number): void {
        this.total = total;
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
