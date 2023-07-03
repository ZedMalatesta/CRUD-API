import { IncomingMessage } from "http";

export const parseRequest = async (req:IncomingMessage):Promise<any> => {
  return new Promise((resolve, reject) => {
    let string = ``
    req.on(`data`, data => (string += data));
    req.on(`end`, () => resolve(string));
    req.on(`error`, e => reject(e));
  })
};