import conf from '../conf/conf'

import { Account, Client, ID } from 'appwrite'

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.projectId);
        this.account = new Account(this.client)

    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                return this.login({ email, password })
            } else {
                return userAccount;
            }
        } catch (error) {
            console.log('appwrite service :: createAccount :: error', error)
            return false
        }
    };

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.log('appwrite service :: login :: error', error)
            return false
        }
    };

    async getCurrentUser(){
        try {
           return await this.account.get(); 
        } catch (error) {
            console.log('appwrite service :: getCurrentUser :: error', error)
            return false
        }
    };

    async logout(){
        try {
           await this.account.deleteSessions(); 
        } catch (error) {
           console.log('appwrite service :: logout :: error', error)
           return false
        }
    }
}

const authService = new AuthService;

export default authService