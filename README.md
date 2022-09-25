Welcome to Ursula's Northcoders News API, hosted on Heroku at https://ursula-nc.herokuapp.com/api

Project Description:

Northcoders News API interacts with a PSQL database using node-postgres.

The database, which was provided by Northcoders, comprises users, articles, topics and comments tables. 

Responding to an ordered series of Kanban tickets, I created endpoints which may be used to interact with the database. 

The endpoints were developed using a Test Driven Development workflow, i.e. tests were written first, red-green refactoring was carried out and app.js, controller.js and model.js were updated in response to the test feedback. 

The endpoints.json file provides a list of available endpoints, plus example responses.

The API includes comprehensive error-handling to make the API as functional and user-friendly as possible.

Project Setup:

The API may be cloned fron https://github.com/ursa1minor/nc-news

Please run npm install after cloning to install dependencies and development dependencies, which are listed in package.json.

Database names are accessed via environment variable files called
.env.test
.env.development

.env.test should contain PGDATABASE=nc_news_test
.env.development should contain PGDATABASE=nc_news

Please make sure these environment variables are added to .gitignore to prevent them from being added to GitHub.

Minimum Requirements:

The following versions of node.js and postgres are needed:

node: v16.16.0 
postgres: v14.5

