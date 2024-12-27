export default class User {
    private id: string;
    private name: string;
    private email: string;
    private password: string;

    constructor(id: string, name: string, email: string, password: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    // Getters
    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getEmail(): string {
        return this.email;
    }

    // Note: Avoid providing a getter for the password for security reasons.

    // Setters
    public setName(name: string): void {
        this.name = name;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    // A utility method for displaying user info (excluding the password)
    public getUserInfo(): object {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
        };
    }
}
