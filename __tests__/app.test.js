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
    it('should generate 404 if items not found', () => {
        return request(app)
        .get('/api/pictures')
        .expect(404)
        .then((result) => {
        expect(result.body).toEqual({ message: 'Item not found' });
        }) 
    })  
})

describe('api/articles', () => {
    it('should respond with 200 if array of objects found', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then((result) => {
        expect(Array.isArray(result.body.articles)).toBe(true);  
        expect(result.body.articles[0]).toHaveProperty('title');
        expect(result.body.articles[0]).toHaveProperty('topic');
        expect(result.body.articles[0]).toHaveProperty('author');
        expect(result.body.articles[0]).toHaveProperty('body');
        expect(result.body.articles[0]).toHaveProperty('created_at');
        expect(result.body.articles[0]).toHaveProperty('votes');
        expect(result.body.articles.length).toBe(12);
        })
    }) 
})  

describe('api/articles/:article_id', () => {
    it('should respond with 200 if array of objects found', () => {
        return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then((result) => {
            expect(result.body.article).toEqual({
                article_id: 1,
                title: "Living in the shadow of a great man",
                topic: "mitch",
                author: "butter_bridge",
                body: "I find this existence challenging",
                created_at: expect.any(String),
                votes: 100
              })
            })
        })
    })

    it('should generate 404 if items not found', () => {
        return request(app)
        .get('/api/articles/20')
        .expect(404)
        .then((result) => {
        expect(result.body).toEqual({ message: 'Item not found' });
        })
    }) 
    it('should generate 400 if user has made a bad request', () => {
        return request(app)
        .get('/api/articles/fridge')
        .expect(400)
        .then ((result) => {
        expect(result.body).toEqual({message: 'Bad request'})
   
    })
})
