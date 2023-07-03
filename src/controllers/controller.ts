import { IncomingMessage, ServerResponse } from "http";
import { User } from "../models/User.js";
import { UserRepo } from "../repository/repository.js";
import { parseRequest } from "../helpers/parser.js";
import { StatusCodes, ResponceMessages } from "../constants/constants.js";
import { isUUID } from "../helpers/isuuid.js";

interface IUserController {
    bdManager: UserRepo;
    getAllUsers(req:IncomingMessage, res:ServerResponse): Promise<void>;
    createUser(req:IncomingMessage, res:ServerResponse): Promise<void>;
    getUserById(req:IncomingMessage, res:ServerResponse, id:string): Promise<void>;
    updateUserById(req:IncomingMessage, res:ServerResponse, id:string): Promise<void>;
    handleResponce(res:ServerResponse, status:number, data:string, header:string): void;
}

export class UserController implements IUserController{
    bdManager: UserRepo;

    constructor(db:UserRepo){
        this.bdManager = db;
    }


    getAllUsers = async (req:IncomingMessage, res:ServerResponse): Promise<void> =>{
        try{
            const result = await this.bdManager.getAll();
            if(result) this.handleResponce(res, StatusCodes.OK, JSON.stringify(result), 'application/json');
            else throw new Error();
        }
        catch{
            this.handleResponce(res, StatusCodes.INTERNAL_ERROR, ResponceMessages.INTERNAL_ERROR_MESSAGE, 'plain/text')
        }
    }

    createUser = async (req: IncomingMessage, res: ServerResponse<IncomingMessage>): Promise<void> => {
        try{
            const user_string = await parseRequest(req);
            const user = JSON.parse(user_string);
            const validate = User.validateUser(user);
            if(validate){
                const newUser = new User(user['username'], user['age'], user['hobbies'])
                const result = await this.bdManager.createUser(newUser);
                this.handleResponce(res, StatusCodes.CREATED, JSON.stringify(result), 'application/json')
            }
            else this.handleResponce(res, StatusCodes.INVALID_DATA, ResponceMessages.INVALID_DATA, 'plain/text')
        }
        catch{
            this.handleResponce(res, StatusCodes.INTERNAL_ERROR, ResponceMessages.INTERNAL_ERROR_MESSAGE, 'plain/text')
        }
    } 

    getUserById = async (req: IncomingMessage, res: ServerResponse<IncomingMessage>, id: string): Promise<void> => {
        try{
            const checkUUID = isUUID(id);
            if(!checkUUID) this.handleResponce(res, StatusCodes.INVALID_DATA, ResponceMessages.INVALID_DATA, 'plain/text')
            else {
                const result = await this.bdManager.getById(id);
                if(result) this.handleResponce(res, StatusCodes.CREATED, JSON.stringify(result), 'application/json')
                else this.handleResponce(res, StatusCodes.NOT_FOUND, ResponceMessages.NOT_FOUND_ERROR_MESSAGE, 'plain/text');
            }
        }
        catch{
            this.handleResponce(res, StatusCodes.INTERNAL_ERROR, ResponceMessages.INTERNAL_ERROR_MESSAGE, 'plain/text')
        }
    }

    updateUserById = async (req: IncomingMessage, res: ServerResponse<IncomingMessage>, id: string): Promise<void> => {
        try{
            const checkUUID = isUUID(id);
            if(!checkUUID) this.handleResponce(res, StatusCodes.INVALID_DATA, ResponceMessages.INVALID_DATA, 'plain/text')
            else {
                const result = await this.bdManager.getById(id);
                if(result) this.handleResponce(res, StatusCodes.CREATED, JSON.stringify(result), 'application/json')
                else this.handleResponce(res, StatusCodes.NOT_FOUND, ResponceMessages.NOT_FOUND_ERROR_MESSAGE, 'plain/text');
            }
        }
        catch{
            this.handleResponce(res, StatusCodes.INTERNAL_ERROR, ResponceMessages.INTERNAL_ERROR_MESSAGE, 'plain/text')
        }
    }

    handleResponce(res:ServerResponse, status:number, data:string, header:string): void{
        res.setHeader('Content-Type', header)
        res.statusCode = status;
        res.end(data);
    }
}