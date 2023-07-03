import { v4 as uuid } from 'uuid';
const id = uuid();
export class User {
    constructor(username, age, hobbies) {
        this.id = uuid();
        this.username = username;
        this.age = age;
        this.hobbies = hobbies;
    }
    validateUser(user) {
        return typeof user.username === "string"
            && typeof user.age === "number"
            && Array.isArray(user.hobbies);
    }
}
//# sourceMappingURL=User.js.map