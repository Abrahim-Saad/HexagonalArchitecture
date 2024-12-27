import Cart from "../models/cart.model";


export default interface ICartRepo {

    create(cart: Cart): Promise<Cart>;


    addToCart(userId: string, itemId: string, quantity: Number): Promise<Cart>;


    removeFromCart(userId: string, itemId: string, quantity: Number): Promise<Cart>;


    resetCart(userId: string): Promise<Cart>;


    delete(id: string): Promise<boolean>;


    get(userId: string): Promise<Cart>;

    
    list(filters?: Record<string, any>): Promise<Cart[]>;
    
}
