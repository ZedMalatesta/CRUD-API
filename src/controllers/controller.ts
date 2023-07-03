import { IncomingMessage, ServerResponse } from "http";
import { User } from "../models/User.js";
import { UserRepo } from "../repository/repository.js";
import { parserJSON } from "../helpers/parser.js";

interface IUserController {
    bdManager: UserRepo;
    getAllUsers(req:IncomingMessage, res:ServerResponse): Promise<void>;
    getUserById(req:IncomingMessage, res:ServerResponse): Promise<void>;
    handleResponce(res:ServerResponse, status:number, data:string): void;
}

export class UserController implements IUserController{
    bdManager: UserRepo;

    constructor(db:UserRepo){
        this.bdManager = db;
    }

    getUserById(req: IncomingMessage, res: ServerResponse<IncomingMessage>): Promise<void> {
        throw new Error("Method not implemented.");
    }

    getAllUsers = async (req:IncomingMessage, res:ServerResponse) =>{
        try{
            const result = await this.bdManager.getAll();
            if(result) this.handleResponce(res, 200, JSON.stringify(result));
        }
        catch{
            this.handleResponce(res, 500, 'Internal server error')
        }
    }

    handleResponce(res:ServerResponse, status:number, data:string): void{
        res.statusCode = status;
        res.end(data);
    }
}