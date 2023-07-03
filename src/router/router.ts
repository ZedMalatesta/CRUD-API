import { parse } from "url"; 
import { UserController } from "../controllers/controller.js";
import { IncomingMessage, ServerResponse } from "http";
import { UserRepo } from "../repository/repository.js";
import { StatusCodes, ResponceMessages } from "../constants/constants.js";
import { getIdFromUrl } from "../helpers/getid.js";

export const router = async (req: IncomingMessage, res: ServerResponse<IncomingMessage>, repo: UserRepo) => {
    const controller = new UserController(repo);
    res.setHeader("Access-Control-Allow-Origin", "*")
    const parsed = parse(req.url!, true)
    const reqUrl = parsed.pathname;
    try{
        if(!reqUrl) throw new Error();
        else if(req.method === 'GET'){
            if (reqUrl == "/api/users") {
                await controller.getAllUsers(req, res);

                reqUrl.split("/").length=3;
            }
            else if (getIdFromUrl(reqUrl!)) {
                await controller.getUserById(req, res, getIdFromUrl(reqUrl!));
            }
            else {
                throw new Error();
            }
        }
        else if(req.method === 'POST'){
            if (reqUrl == "/api/users") {
                await controller.createUser(req, res);
            }
            else {
                throw new Error();
            }
        }
        else if(req.method === 'PUT'){
            if (getIdFromUrl(reqUrl!)) {
                await controller.updateUserById(req, res, getIdFromUrl(reqUrl!));
            }
            else {
                throw new Error();
            }
        }
        else if(req.method === 'DELETE'){
            if (getIdFromUrl(reqUrl!)) {
                await controller.deleteUserById(req, res, getIdFromUrl(reqUrl!));
            }
            else {
                throw new Error();
            }
        }
    }
    catch(e){
        controller.handleResponce(res, StatusCodes.NOT_FOUND, ResponceMessages.NOT_FOUND_ERROR_MESSAGE, 'plain/text')
    }
}
