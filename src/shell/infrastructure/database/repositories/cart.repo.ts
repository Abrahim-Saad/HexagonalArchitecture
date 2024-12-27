// infrastructure/repositories/CartRepo.ts
import ICartRepo from "../../../../core/repositories/ICart.repo";
import Cart from "../../../../core/models/cart.model";
import Item from "../../../../core/models/item.model";

export default class CartRepo implements ICartRepo {
  private carts: Map<string, Cart>; // In-memory storage for carts

  constructor() {
    this.carts = new Map<string, Cart>();
  }


  async create(cart: Cart): Promise<Cart> {
    this.carts.set(cart.getCartId(), cart);
    return cart;
  }


  async addToCart(userId: string, itemId: string, quantity: number): Promise<Cart> {
    const cart = this.carts.get(userId) || new Cart(userId, userId, [], 0);

    // Check if the item already exists in the cart
    const existingItem = cart.getCartItems().find(item => item.getId() === itemId);

    if (existingItem) {
      const existingQuantity = existingItem.getQuantity();
      existingItem.setQuantity(existingQuantity + quantity);
    } else {
      const newItem = new Item(itemId, "Sample Item Name", quantity, 10); // Replace with real item lookup
      cart.getCartItems().push(newItem);
    }

    // Update the total price
    const cartTotal: number = cart.getCartItems().reduce((sum, item) => sum + item.getPrice() * item.getQuantity(), 0)
    cart.setTotal(cartTotal);

    this.carts.set(userId, cart);
    return cart;
  }

  async removeFromCart(userId: string, itemId: string, quantity: number): Promise<Cart> {
    const cart = this.carts.get(userId);

    if (!cart) {
      throw new Error("Cart not found");
    }

    const items = cart.getCartItems();
    const itemIndex = items.findIndex(item => item.getId() === itemId);

    if (itemIndex === -1) {
      throw new Error("Item not found in cart");
    }

    const item = items[itemIndex];
    if (item.getQuantity() > quantity) {
      item.setQuantity(item.getQuantity() - quantity); // No warning here
    } else {
      items.splice(itemIndex, 1); // Remove item completely if quantity is less or equal
    }

    // Update the total price
    const cartTotal: number = items.reduce((sum, item) => sum + item.getPrice() * item.getQuantity(), 0);
    cart.setTotal(cartTotal)
    this.carts.set(userId, cart);

    return cart;
  }


  async resetCart(userId: string): Promise<Cart> {
    const cart = new Cart(userId, userId, [], 0);
    this.carts.set(userId, cart);
    return cart;
  }

  async delete(id: string): Promise<boolean> {
    return this.carts.delete(id);
  }

  async get(userId: string): Promise<Cart> {
    const cart = this.carts.get(userId);

    if (!cart) {
      throw new Error("Cart not found");
    }

    return cart;
  }

  async list(filters?: Record<string, any>): Promise<Cart[]> {
    let carts = Array.from(this.carts.values());

    if (filters) {
      if (filters.userId) {
        carts = carts.filter(cart => cart.getUserId() === filters.userId);
      }
    }

    return carts;
  }
}
