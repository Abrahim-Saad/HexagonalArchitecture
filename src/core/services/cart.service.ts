import ICartRepo from '../repositories/ICart.repo';
import IItemRepo from '../repositories/IItem.repo';
import IUserRepo from '../repositories/IUser.repo';
import Cart from '../models/cart.model';
import Item from '../models/item.model';
import User from '../models/user.model';

export default class CartService {
    private cartPort: ICartRepo;
    private itemPort: IItemRepo;
    private userPort: IUserRepo;

    constructor(cartPort: ICartRepo, itemPort: IItemRepo, userPort: IUserRepo) {
        this.cartPort = cartPort;
        this.itemPort = itemPort;
        this.userPort = userPort;
    }


    async addToCart(userId: string, itemIdToAdd: string, quantityToAdd: number): Promise<Cart> {

        const user: User | null = await this.userPort.get(userId);
        if (!user) throw new Error('User not found.');


        const item: Item | null = await this.itemPort.get(itemIdToAdd);
        if (!item) throw new Error('Item not found.');

        const itemQuantity = item.getQuantity()
        if (itemQuantity < quantityToAdd) throw new Error('Insufficient stock for the item.');

        return this.cartPort.addToCart(userId, itemIdToAdd, quantityToAdd);
    }


    async removeFromCart(userId: string, itemIdToRemove: string, quantityToRemove: number): Promise<Cart> {
        const user: User | null = await this.userPort.get(userId);
        if (!user) {
            throw new Error('User not found.');
        }


        const item: Item | null = await this.itemPort.get(itemIdToRemove);
        if (!item) throw new Error('Item not found.');
        

        const cart: Cart | null = await this.cartPort.get(userId);
        if (!cart) throw new Error('Cart not found.');
        

        const cartItems = cart.getCartItems();
        const cartItem = cartItems.find((cartItem) => cartItem.getId() === itemIdToRemove);

        if (!cartItem) throw new Error('Item not found in the cart.');
        

        const itemQuantity = item.getQuantity()
        if (itemQuantity < quantityToRemove) throw new Error('Quantity to remove exceeds the quantity in the cart.');
        
        return this.cartPort.removeFromCart(userId, itemIdToRemove, quantityToRemove);
    }


    async getCart(userId: string): Promise<Cart> {
        return this.cartPort.get(userId);
    }
}
