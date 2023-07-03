import { IncomingMessage } from "http";

export const parserJSON = (req:IncomingMessage):Promise<Object> => {
    return new Promise((resolve, reject) => {
      let string = ``;
      req.on(`data`, data => (string += data));
      req.on(`end`, () => resolve(JSON.parse(string)));
      req.on(`error`, e => reject(e));
    })
};