import { v4 as uuid } from 'uuid';
const id: string = uuid();

interface IUser {
    readonly id: string;
    username: string;
    age: number;
    hobbies: Array<string>;
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

    static validateUser(user: any): boolean{
        return user['username']
        && typeof user.username === "string"
        && user['age']
        && typeof user.age === "number"
        && user['hobbies']
        && Array.isArray(user.hobbies)
    }
}