export default class Item {
    private id: string;
    private name: string;
    private quantity: Number;
    private price: Number;

    constructor(id: string, name: string, quantity: Number, price: Number) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }

    // Getters
    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getQuantity(): Number {
        return this.quantity;
    }


    // Setters
    public setName(name: string): void {
        this.name = name;
    }

    public setQuantity(quantity: Number): void {
        this.quantity = quantity;
    }

    public setPrice(price: Number): void {
        this.price = price;
    }

    public getItemInfo(): object {
        return {
            id: this.id,
            name: this.name,
            quantity: this.quantity,
            price: this.price,
        };
    }
}
