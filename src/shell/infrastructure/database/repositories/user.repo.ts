// infrastructure/repositories/UserRepo.ts
import IUserRepo from "../../../../core/repositories/IUser.repo";
import User from "../../../../core/models/user.model";

export default class UserRepo implements IUserRepo {
    private users: Map<string, User>;
    constructor() {
        this.users = new Map<string, User>();
    }

    async create(user: User): Promise<User> {
        if (this.users.has(user.getId())) {
            throw new Error("User with this ID already exists.");
        }
        this.users.set(user.getId(), user);
        return user;
    }

    async update(id: string, userData: User): Promise<User | null> {
        const user = this.users.get(id);
        if (!user) {
            return null;
        }

        // Update only the provided fields
        if (userData.getName()) {
            user.setName(userData.getName());
        }
        if (userData.getEmail()) {
            user.setEmail(userData.getEmail());
        }
        
        this.users.set(id, user);
        return user;
    }

    async delete(id: string): Promise<boolean> {
        if (this.users.has(id)) {
            this.users.delete(id);
            return true;
        }
        return false;
    }

    async get(id: string): Promise<User | null> {
        return this.users.get(id) || null;
    }

    async list(filters?: Record<string, any>): Promise<User[]> {
        let userList = Array.from(this.users.values());

        // Apply filters if provided
        if (filters) {
            if (filters.name) {
                userList = userList.filter((user) => user.getName() === filters.name);
            }
            if (filters.email) {
                userList = userList.filter((user) => user.getEmail() === filters.email);
            }
        }

        return userList;
    }
}
