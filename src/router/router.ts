import { parse } from "url"; 

export const router = (req: any, res: any) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    const parsed = parse(req.url, true)
    const reqUrl = parsed.pathname
    if (req.method == "GET") {
        if (reqUrl == "/") {
            // Send a JSON version of our URL query
            res.write("Hello, you sent\n" +  JSON.stringify(parsed.query))
            res.end()
        }
    } else if (req.method == "POST") {
        if (reqUrl == "/hello") {
            res.write("hello world")
            res.end()
        }
    }
    console.log("start")
}
