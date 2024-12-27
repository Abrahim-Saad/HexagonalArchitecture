import Item from "../models/item.model";

export default interface IItemRepo {

    create(item: Item): Promise<Item>;


    update(id: string, item: Partial<Item>): Promise<Item | null>;


    delete(id: string): Promise<boolean>;


    get(id: string): Promise<Item | null>;

    
    list(filters?: Record<string, any>): Promise<Item[]>;
    
}
