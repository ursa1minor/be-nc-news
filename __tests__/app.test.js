const app = require("../app")
const request = require("supertest")
const db = require("../db/connection")
const data = require("../db/data/test-data/index")
const seed = require("../db/seeds/seed")

beforeEach(() => {
    return seed(data); 
})

afterAll(() => {
    return db.end();
})

describe('api/topics', () => {
        it('should respond with 200 if array of objects with correct properties found', () => {
            return request(app)
            .get('/api/topics')
            .expect(200)
            .then((result) => {
        expect(Array.isArray(result.body.topics)).toBe(true);  
        expect(result.body.topics[0]).toHaveProperty('slug');
        expect(result.body.topics[0]).toHaveProperty('description');
        expect(result.body.topics.length).toBe(3);
        })
    })   
    it('should respond with 404 if items not found', () => {
        return request(app)
        .get('/api/pictures')
        .expect(404)
        .then((result) => {
        expect(result.status).toBe(404);
        }) 
    })  
})







