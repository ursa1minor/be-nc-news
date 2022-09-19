const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const data = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");

beforeEach(() => {
    return seed(data); 
});

afterAll(() => {
    return db.end();
});

describe('GET Topics: api/topics', () => {
        it('should respond with 200 if array of objects with correct properties found', () => {
            return request(app)
            .get('/api/topics')
            .expect(200)
            .then((result) => {
        expect(Array.isArray(result.body.topics)).toBe(true);  
        expect(result.body.topics[0]).toHaveProperty('slug');
        expect(result.body.topics[0]).toHaveProperty('description');
        expect(result.body.topics.length).toBe(3);
        });
    });  
    it('should generate 404 if items not found', () => {
        return request(app)
        .get('/api/notTopics')
        .expect(404)
        .then((result) => {
        expect(result.body).toEqual({ message: 'Item not found' });
        }); 
    }); 
});

describe('GET Articles: api/articles', () => {
    it('should respond with 200 if array of article objects found with properties title, topic, author, created_at, votes and comment_count, with comment_count in descending order', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then((result) => {
        expect(Array.isArray(result.body.articles)).toBe(true);  
        expect(result.body.articles[0]).toHaveProperty('title');
        expect(result.body.articles[0]).toHaveProperty('topic');
        expect(result.body.articles[0]).toHaveProperty('author');
        expect(result.body.articles[0]).toHaveProperty('created_at');
        expect(result.body.articles[0]).toHaveProperty('votes');
        expect(result.body.articles[0]).toHaveProperty('comment_count');
        expect(result.body.articles.length).toBe(12);
        expect(result.body.articles).toBeSortedBy('comment_count', {descending: true})
        });
    });
    it('should generate 404 if articles not found', () => {
        return request(app)
        .get('/api/notArticles')
        .expect(404)
        .then((result) => {
        expect(result.body).toEqual({ message: 'Item not found' });
        });
    });   
    it('should respond with 200 and return articles from specified topic cats', () => {
        return request(app)
        .get("/api/articles?topic=cats")
        .expect(200)
        .then(({ body }) => {
            expect(body.articles.length).toBeGreaterThan(0);
            body.articles.forEach((article) => {
                expect(article.topic).toBe("cats");});
        });
    }); 
    it('should respond with 200 and return articles from specified topic mitch', () => {
        return request(app)
        .get("/api/articles?topic=mitch")
        .expect(200)
        .then(({ body }) => {
            expect(body.articles.length).toBeGreaterThan(0);
            body.articles.forEach((article) => {
                expect(article.topic).toBe("mitch");});
        });
    }); 
    it('should respond with 404 if specified topic not found', () => {
        return request(app)
        .get("/api/articles?topic=roundabouts")
        .expect(404)
        .then((result) => {
            expect(result.body).toEqual({ message: 'Topic not found'});
        });
    });
}); 

describe('GET ArticleId: api/articles/:article_id', () => {
    it('should respond with 200 if object found with correct comment count', () => {
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
                votes: 100,
                comment_count: 11
                });
            });
        });
    });
    it('should respond with 200 if object found with comment count 0', () => {
        return request(app)
        .get('/api/articles/2')
        .expect(200)
        .then((result) => {
            expect(result.body.article).toHaveProperty('article_id');
            expect(result.body.article).toHaveProperty('comment_count');
            expect(result.body.article.article_id).toBe(2);
            expect(result.body.article.comment_count).toBe(0);
         });
    });
       
    it('should generate 404 if item not found', () => {
        return request(app)
        .get('/api/articles/20')
        .expect(404)
        .then((result) => {
        expect(result.body).toEqual({ message: 'Article not found' });
        });
    }); 
    it('should generate 400 if user has made a bad request', () => {
        return request(app)
        .get('/api/articles/fridge')
        .expect(400)
        .then ((result) => {
        expect(result.body).toEqual({message: 'Bad request'}) 
        });
    });

describe('GET Comments: /api/articles/:article_id/comments', () => {
    it('should respond with 200 if comments found', () => {
        return request(app)
        .get('/api/articles/1/comments')
        .expect(200)
        .then((result) => {
            expect(result.body.comments[0]).toHaveProperty('comment_id');
            expect(result.body.comments[0]).toHaveProperty('author');
            expect(result.body.comments[0]).toHaveProperty('body');
            expect(result.body.comments[0]).toHaveProperty('created_at');
            expect(result.body.comments[0]).toHaveProperty('votes');          
        });
    });
    it('should generate 404 if no comments are found for existing article', () => {
        return request(app)
        .get('/api/articles/2/comments')
        .expect(404)
        .then((result) => {
        expect(result.body).toEqual({ message: 'Comments not found' });
        });
    }); 
    it('should generate 404 if article not found', () => {
        return request(app)
        .get('/api/articles/20/comments')
        .expect(404)
        .then((result) => {
        expect(result.body).toEqual({ message: 'Article not found' });
        });
    });
    it('should generate 404 if passed id which is not a number', () => {
        return request(app)
        .get('/api/articles/2/celery')
        .expect(404)
        .then ((result) => {
            expect(result.body).toEqual({message: 'Item not found'}) 
        });
    })
});

describe('GET Users: api/users', () => {
    it('should return array of users', () => {
        return request(app)
        .get('/api/users')
        .expect(200)
        .then((result) => {
            expect(Array.isArray(result.body.users)).toBe(true);  
            expect(result.body.users[0]).toHaveProperty('username');
            expect(result.body.users[0]).toHaveProperty('name');
            expect(result.body.users[0]).toHaveProperty('avatar_url');
        });
    });
    it('should generate 404 if item not found', () => {
        return request(app)
        .get('/api/notUsers')
        .expect(404)
        .then((result) => {
        expect(result.body).toEqual({ message: 'Item not found' });
        }); 
    });  
});



describe('PATCH article_id: api/articles/:article_id', () => {
    it('should update the article vote property by given amount which is a positive number', () => {
        const testInput = {inc_votes: 10}
        return request(app)
        .patch('/api/articles/1')
        .send(testInput)
        .expect(200)
        .then((result) => {
            expect(result.body.article.votes).toBe(110)
            });
        });
    });
    it('should update the article vote property by given amount which is a negative number', () => {
        const testInput = {inc_votes: -10}
        return request(app)
        .patch('/api/articles/2')
        .send(testInput)
        .expect(200)
        .then((result) => {
            expect(result.body.article.votes).toBe(-10)
            });
        });
    it('should not update the article vote property if the votecount passed in is 0', () => {
        const testInput = {inc_votes: 0}
        return request(app)
        .patch('/api/articles/3')
        .send(testInput)
        .expect(200)
        .then((result) => {
            expect(result.body.article.votes).toBe(0)
            });
        });
    it('should update the article vote property by given amount and return the updated article', () => {
        const testInput = {inc_votes: -10}
        return request(app)
        .patch('/api/articles/1')
        .send(testInput)
        .expect(200)
        .then((result) => {
            expect(result.body.article).toEqual({
                article_id: 1,
                title: "Living in the shadow of a great man",
                topic: "mitch",
                author: "butter_bridge",
                body: "I find this existence challenging",
                created_at: expect.any(String),
                votes: 90
                });
            });
    });
    it('should generate 404 if item not found', () => {
        return request(app)
        .patch('/api/articles/20')
        .expect(404)
        .then((result) => {
        expect(result.body).toEqual({ message: 'Item not found' });
        });
    }); 
    it('should generate 400 if user has made a bad request', () => {
        return request(app)
        .patch('/api/articles/fridge')
        .expect(400)
        .then ((result) => {
        expect(result.body).toEqual({message: 'Bad request'})  
        });
    });
    it('should generate 400 if vote value does not contain a number', () => {
        const testInput = {inc_votes: 'hello'}
        return request(app)
        .patch('/api/articles/5')
        .send(testInput)
        .expect(400)
        .then((result) => {
            expect(result.body).toEqual({message: 'Bad request'})
        });
    });
    it('should generate 400 if vote object does not contain a key of inc_vote', () => {
        const testInput = {votes: 5}
        return request(app)
        .patch('/api/articles/6')
        .send(testInput)
        .expect(400)
        .then((result) => {
            expect(result.body).toEqual({message: 'Bad request'})
        });
    });
 
