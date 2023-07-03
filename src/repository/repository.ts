import { User } from "../models/User.js";

interface IUserRepo {
    storage: Array<User>;
    getAll(): Promise<Array<User>>;
    
}

export class UserRepo implements IUserRepo{
    storage: Array<User>;

    constructor(storage:Array<User>){
        this.storage = storage;
    }

    async getAll(): Promise<Array<User>>{
        return this.storage;
    }
    /*
    async getById(id:string): Promise<User>{
        try{
            return this.storage.find((elem)=>{
                return elem.id===id;
            })!;
        }
        catch{
            return new User();

        }
    }*/
}