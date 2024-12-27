// infrastructure/repositories/ItemRepo.ts
import IItemRepo from "../../../../core/repositories/IItem.repo";
import Item from "../../../../core/models/item.model";

export default class ItemRepo implements IItemRepo {
    private items: Map<string, Item>;

    constructor() {
        this.items = new Map<string, Item>();
    }

    async create(item: Item): Promise<Item> {
        if (this.items.has(item.getId())) {
            throw new Error("Item with this ID already exists.");
        }
        this.items.set(item.getId(), item);
        return item;
    }

    async update(id: string, itemData: Item): Promise<Item | null> {
        const item = this.items.get(id);
        if (!item) {
            return null;
        }

        // Update only the provided fields
        if (itemData.getName()) {
            item.setName(itemData.getName());
        }
        if (itemData.getQuantity() !== undefined) {
            item.setQuantity(itemData.getQuantity());
        }
        if (itemData.getPrice() !== undefined) {
            item.setPrice(itemData.getQuantity());
        }

        this.items.set(id, item);
        return item;
    }

    async delete(id: string): Promise<boolean> {
        if (this.items.has(id)) {
            this.items.delete(id);
            return true;
        }
        return false;
    }

    async get(id: string): Promise<Item | null> {
        return this.items.get(id) || null;
    }

    async list(filters?: Record<string, any>): Promise<Item[]> {
        let itemList = Array.from(this.items.values());

        // Apply filters if provided
        if (filters) {
            if (filters.name) {
                itemList = itemList.filter((item) => item.getName() === filters.name);
            }
            if (filters.minQuantity !== undefined) {
                itemList = itemList.filter((item) => item.getQuantity() >= filters.minQuantity);
            }
            if (filters.maxPrice !== undefined) {
                itemList = itemList.filter((item) => item.getPrice() <= filters.maxPrice);
            }
        }

        return itemList;
    }
}
