import { createServer } from 'http';
import { User } from './models/User.js'
import { server } from './server/server.js';
import "dotenv/config";

const PORT = process.env.PORT;
const PID = process.pid;

const app = createServer(server())
/*
const server = createServer((req,res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*")
    console.log("started");
});*/

app.listen(PORT, () =>   {
	console.log(`server listenning on ${PORT} with ${PID} PID`)
});
