import { validate } from "uuid";

export const isUUID = (uuid:string):boolean => {
    return validate(uuid);
};

