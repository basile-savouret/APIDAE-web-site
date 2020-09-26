import {createUser} from "../src/User/userAgreggateService";
import {CreateUserCommand, User} from "model/User"
import {connectDatabase, clearDatabase, closeDatabase} from "./dbTestEnv"

const dotenv = require("dotenv")
const mongoose = require("mongoose")

describe('User', () => {

    /**
     * Connect to a new in-memory database before running any tests.
     */
    beforeAll(async () => await connectDatabase());

    /**
     * Clear all test data after every test.
     */
    afterEach(async () => await clearDatabase());

    /**
     * Remove and close the db and server.
     */
    afterAll(async () => await closeDatabase());

    it('should be created',() => {
        const command: CreateUserCommand = {
            email: "test@test.fr",
            firstname: "test",
            lastname: "test",
            roles: ["student"]
        }
        createUser(command).then((userCreated) => {
            expect(userCreated.email).toBe("test@test.fr")
        })
    })
})