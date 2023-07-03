import { parse } from "url"; 
import { UserController } from "../controllers/controller.js";
import { IncomingMessage, ServerResponse } from "http";
import { UserRepo } from "../repository/repository.js";

export const router = async (req: IncomingMessage, res: ServerResponse<IncomingMessage>, repo: UserRepo) => {
    const controller = new UserController(repo);
    res.setHeader("Access-Control-Allow-Origin", "*")
    const parsed = parse(req.url!, true)
    const reqUrl = parsed.pathname;
    console.log(parsed, reqUrl, 'watta')
    try{
        switch(req.method){
            case "GET":{
                if (reqUrl == "/api/users") {
                    await controller.getAllUsers(req, res);
                }
                else if (reqUrl == "/api/users/id") {
                    await controller.getAllUsers(req, res);
                }
                else {
                    throw new Error();
                }
            }
            case "POST":{

            }
        }
    }
    catch{
        controller.handleResponce(res, 404, 'Not found 2')
        res.statusCode=404;
        res.end();
    }
}
