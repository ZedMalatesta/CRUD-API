import { IncomingMessage, ServerResponse } from "http";
import { router } from "../router/router.js"
import { UserRepo } from "../repository/repository.js";

export const server = () => {
    console.log("server started")
    const inmemoryDB = new UserRepo([]);
    return async (req:IncomingMessage, res:ServerResponse) => {
        await router(req,res, inmemoryDB);
    }
}