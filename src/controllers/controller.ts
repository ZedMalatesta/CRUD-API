import { IncomingMessage, ServerResponse } from "http";
import { User } from "../models/User.js";
import { UserRepo } from "../repository/repository.js";
import { parseRequest } from "../helpers/parser.js";
import { StatusCodes, ResponceMessages, Headers } from "../constants/constants.js";
import { isUUID } from "../helpers/isuuid.js";

interface IUserController {
    bdManager: UserRepo;
    getAllUsers(req:IncomingMessage, res:ServerResponse): Promise<void>;
    createUser(req:IncomingMessage, res:ServerResponse): Promise<void>;
    getUserById(req:IncomingMessage, res:ServerResponse, id:string): Promise<void>;
    updateUserById(req:IncomingMessage, res:ServerResponse, id:string): Promise<void>;
    deleteUserById(req:IncomingMessage, res:ServerResponse, id:string): Promise<void>;    
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
            if(result) this.handleResponce(res, StatusCodes.OK, JSON.stringify(result), Headers.JSON);
            else throw new Error();
        }
        catch{
            this.handleResponce(res, StatusCodes.INTERNAL_ERROR, ResponceMessages.INTERNAL_ERROR_MESSAGE, Headers.TEXT)
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
                this.handleResponce(res, StatusCodes.CREATED, JSON.stringify(result), Headers.JSON)
            }
            else this.handleResponce(res, StatusCodes.INVALID_DATA, ResponceMessages.INVALID_DATA, Headers.TEXT)
        }
        catch{
            this.handleResponce(res, StatusCodes.INTERNAL_ERROR, ResponceMessages.INTERNAL_ERROR_MESSAGE, Headers.TEXT)
        }
    } 

    getUserById = async (req: IncomingMessage, res: ServerResponse<IncomingMessage>, id: string): Promise<void> => {
        try{
            const checkUUID = isUUID(id);
            if(!checkUUID) this.handleResponce(res, StatusCodes.INVALID_DATA, ResponceMessages.INVALID_DATA, Headers.TEXT)
            else {
                const result = await this.bdManager.getById(id);
                if(result) this.handleResponce(res, StatusCodes.CREATED, JSON.stringify(result), Headers.JSON)
                else this.handleResponce(res, StatusCodes.NOT_FOUND, ResponceMessages.NOT_FOUND_ERROR_MESSAGE, Headers.TEXT);
            }
        }
        catch{
            this.handleResponce(res, StatusCodes.INTERNAL_ERROR, ResponceMessages.INTERNAL_ERROR_MESSAGE, Headers.TEXT)
        }
    }

    updateUserById = async (req: IncomingMessage, res: ServerResponse<IncomingMessage>, id: string): Promise<void> => {
        try{
            const checkUUID = isUUID(id);
            if(!checkUUID) this.handleResponce(res, StatusCodes.INVALID_DATA, ResponceMessages.INVALID_DATA, Headers.TEXT)
            else {
                const result = await this.bdManager.getById(id);
                if(result){
                    const user_string = await parseRequest(req);
                    const user_data = JSON.parse(user_string);
                    const result_json = await this.bdManager.updateUser(result.id, user_data);
                    this.handleResponce(res, StatusCodes.OK, JSON.stringify(result_json), Headers.JSON)
                }
                else this.handleResponce(res, StatusCodes.NOT_FOUND, ResponceMessages.NOT_FOUND_ERROR_MESSAGE, Headers.TEXT);
            }
        }
        catch{
            this.handleResponce(res, StatusCodes.INTERNAL_ERROR, ResponceMessages.INTERNAL_ERROR_MESSAGE, Headers.TEXT)
        }
    }

    deleteUserById = async (req: IncomingMessage, res: ServerResponse<IncomingMessage>, id: string): Promise<void> => {
        try{
            const checkUUID = isUUID(id);
            if(!checkUUID) this.handleResponce(res, StatusCodes.INVALID_DATA, ResponceMessages.INVALID_DATA, Headers.TEXT)
            else {
                const result = await this.bdManager.deleteUser(id);
                if(result){
                    this.handleResponce(res, StatusCodes.NO_CONTENT, ResponceMessages.DELETE_SUCCESS, Headers.TEXT)
                }
                else this.handleResponce(res, StatusCodes.NOT_FOUND, ResponceMessages.NOT_FOUND_ERROR_MESSAGE, Headers.TEXT);
            }
        }
        catch{
            this.handleResponce(res, StatusCodes.INTERNAL_ERROR, ResponceMessages.INTERNAL_ERROR_MESSAGE, Headers.TEXT)
        }
    }

    handleResponce(res:ServerResponse, status:number, data:string, header:string): void{
        res.setHeader('Content-Type', header)
        res.statusCode = status;
        res.end(data);
    }
}