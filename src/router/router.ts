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
        console.log('req')
        console.log(req.method)
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
                console.log("route4")
                await controller.createUser(req, res);
            }
            else {
                console.log("route5")
                throw new Error();
            }
        }
        else if(req.method === 'POST'){
            if (reqUrl == "/api/users") {
                console.log("route4")
                await controller.createUser(req, res);
            }
            else {
                console.log("route5")
                throw new Error();
            }
        }
    }
    catch(e){
        console.log('error route')
        controller.handleResponce(res, StatusCodes.NOT_FOUND, ResponceMessages.NOT_FOUND_ERROR_MESSAGE, 'plain/text')
    }
}
