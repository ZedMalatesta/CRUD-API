import { v4 as uuid } from 'uuid';
const id: string = uuid();

interface IUser {
    readonly id: string;
    username: string;
    age: number;
    hobbies: Array<string>;
    validateUser(user:Partial<User>): boolean;
}

export class User implements IUser{
    readonly id: string;
    username: string;
    age: number;
    hobbies: [];

    constructor(username:string, age:number, hobbies:[]){
        this.id = uuid();
        this.username = username;
        this.age = age;
        this.hobbies = hobbies;
    }

    validateUser(user: Partial<User>): boolean{
        return typeof user.username === "string"
        && typeof user.age === "number"
        && Array.isArray(user.hobbies)
    }
}