
import { app } from "../build/app.js";
import request from "supertest";

describe('Adding and deleting new user', () => {
    afterAll((done)=> {
        app.close();
        done();
    })
    
    it("empty array of users", async () => {
        await request(app).get("/api/users").expect(200, []);
    })
})