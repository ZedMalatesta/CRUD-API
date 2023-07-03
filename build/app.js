import { createServer } from 'http';
import { User } from './models/User.js';
const PORT = 4000;
const PID = process.pid;
const server = createServer((req, res) => {
    let newuser = new User('Denis', 34, []);
    console.log(newuser);
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log("started");
});
server.listen(PORT, () => console.log(`server listenning on ${PORT} with ${PID} PID`));
//# sourceMappingURL=app.js.map