const request = require("supertest");
const { server } = require("../index.js");
const cafes = require('../cafes.json');

describe("Operaciones CRUD de cafes", () => {
    describe('Get', () => {
        it("Returns a status code 200", async () => {
            const response = await request(server).get("/cafes").send();
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBeGreaterThanOrEqual(1);
        });

    })

    describe('Post', () => {
        it("Adds a new coffee and returns a code 201", async () => {
            const newCafe = {
                nombre: 'Latte'
            };
            newCafe.id = Math.floor(Math.random() * 1000);
            const response = await request(server)
                .post('/cafes')
                .send(newCafe);
            expect(response.statusCode).toBe(201);
        });

    })

    describe('Put', () => {
        it("Returns a status code 400 if you try to update with a different id", async () => {
            const cafe = cafes[0];
            const newId = Math.floor(Math.random() * 1000);
            const updatedCafe = {
                id: newId,
                nombre: 'New name cafe'
            };
            const response = await request(server)
                .put(`/cafes/${cafe.id}`)
                .send(updatedCafe);
            expect(response.statusCode).toBe(400);
        });
    })

    describe('Delete', () => {
        it("Get a 404 code when trying to delete an id that does not exist", async () => {
            const nonExistentId = 999;
            const response = await request(server).delete(`/cafes/${nonExistentId}`);
            expect(response.statusCode).toBe(400);
        });
    })

});

afterAll(() => {
    server.close();
});