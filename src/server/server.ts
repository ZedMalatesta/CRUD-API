import { IncomingMessage, ServerResponse } from "http";
import { router } from "../router/router.js"

export const server = () => {
    console.log("server started")
    return async (req:IncomingMessage, res:ServerResponse) => {
        router(req,res)
    }
}