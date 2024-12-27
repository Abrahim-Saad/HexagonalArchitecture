export default class Item {
    private id: string;
    private name: string;
    private quantity: number;
    private price: number;

    constructor(id: string, name: string, quantity: number, price: number) {
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

    public getQuantity(): number {
        return this.quantity;
    }

    public getPrice(): number {
        return this.price;
    }


    // Setters
    public setName(name: string): void {
        this.name = name;
    }

    public setQuantity(quantity: number): void {
        this.quantity = quantity;
    }

    public setPrice(price: number): void {
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
