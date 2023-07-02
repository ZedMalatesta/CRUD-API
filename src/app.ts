import { createServer } from 'http';

const PORT = 4000;
const PID = process.pid;
const server = createServer((req,res)=>{
    console.log("started");
});

server.listen(PORT, () =>
	console.log(`server listenning on ${PORT} with ${PID} PID`)
);
