import { User } from "../models/User.js";

interface IUserRepo {
    storage: Array<User>;
    getAll(): Promise<Array<User>> | undefined;
    getById(id:string): Promise<User | undefined>;
    createUser(user:User): Promise<User>;
    updateUser(id:string, credentials:any): Promise<User>;
    deleteUser(id:string): Promise<boolean>;
}

export class UserRepo implements IUserRepo{
    storage: Array<User>;

    constructor(storage:Array<User>){
        this.storage = storage;
    }

    async getAll(): Promise<Array<User>>{
        return this.storage;
    }

    async getById(id:string): Promise<User | undefined>{
        return this.storage.find((elem)=>{
            return elem.id===id;
        });
    }

    async createUser(user:User): Promise<User>{
        this.storage.push(user);
        return user;
    }

    async updateUser(id:string, credentials:any): Promise<User>{
        const index = this.storage.findIndex((elem)=>{
            return elem.id===id;
        });
        if(credentials.hasOwnProperty('username')) this.storage[index]['username'] = credentials['username'];
        if(credentials.hasOwnProperty('age')) this.storage[index]['age'] = credentials['age'];
        if(credentials.hasOwnProperty('hobbies')) this.storage[index]['hobbies'] = credentials['hobbies'];
        return this.storage[index];
    }

    async deleteUser(id:string): Promise<boolean>{
        const index = this.storage.findIndex((elem)=>{
            return elem.id===id;
        });
        if (index > -1) { 
            this.storage.splice(index, 1);
            return true;
        }
        else{
            return false;
        }
    }
}