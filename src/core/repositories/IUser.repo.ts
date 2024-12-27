import User from "../models/user.model";

export default interface IUserRepo {

    create(user: User): Promise<User>;


    update(id: string, user: Partial<User>): Promise<User | null>;


    delete(id: string): Promise<boolean>;


    get(id: string): Promise<User | null>;

    
    list(filters?: Record<string, any>): Promise<User[]>;

}
