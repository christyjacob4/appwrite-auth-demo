import { Client, Account } from 'appwrite';

const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);

export class AppwriteService {
    public static async getAccount(): Promise<any> {
        return account.get();
    }

    public static async createAccount(email: string, password: string, name?: string): Promise<any> {
        return account.create('unique()', email, password, name);
    }

    public static async createEmailSession(email: string, password: string): Promise<any> {
        return account.createEmailSession(email, password);
    }

    public static async deleteSession(): Promise<any> {
        return account.deleteSession('current');
    }

    /** Phone Authentication endpoints */
    public static async createPhoneSession(number: string): Promise<any> {
        return account.createPhoneSession('unique()', number);
    }

    public static async updatePhoneSession(userId: string, secret: string): Promise<any> {
        return account.updatePhoneSession(userId, secret);
    }

    public static async updatePhone(number: string, password: string): Promise<any> {
        return account.updatePhone(number, password);
    }

    public static async createPhoneVerification(): Promise<any> {
        return account.createPhoneVerification();
    }

    public static async updatePhoneVerification(userId: string, secret: string): Promise<any> {
        return account.updatePhoneVerification(userId, secret);
    }
}