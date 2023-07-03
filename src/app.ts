import { createServer } from 'http';
import { User } from './models/User.js'
import { server } from './server/server.js';

const PORT = 4000;
const PID = process.pid;

const app = createServer(server())
/*
const server = createServer((req,res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*")
    console.log("started");
});*/

app.listen(PORT, () =>   {
    let newuser = new User('Denis', 34, []);
    console.log(newuser)
	console.log(`server listenning on ${PORT} with ${PID} PID`)
});
