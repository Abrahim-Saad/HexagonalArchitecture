import CartService from "../../../core/services/cart.service";
import CartRepo from "../../infrastructure/database/repositories/cart.repo";
import ItemRepo from "../../infrastructure/database/repositories/item.repo";
import UserRepo from "../../infrastructure/database/repositories/user.repo";
import { Request, Response } from 'express';

const cartRepo: CartRepo = new CartRepo()
const itemRepo: ItemRepo = new ItemRepo()
const userRepo: UserRepo = new UserRepo()
const cartService: CartService = new CartService(cartRepo, itemRepo, userRepo)

exports.addToCartController = async (req: Request, res: Response) => {
  try {
    const userId = JSON.stringify(req.query.userId);
    const itemIdToAdd = JSON.stringify(req.query.itemId);
    const quantityToAdd = parseInt(JSON.stringify(req.query.quantity));



    const cart = await cartService.addToCart(userId, itemIdToAdd, quantityToAdd);
    res.status(200).send(cart);
    
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}