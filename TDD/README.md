# todo-tdd
Technology Workshop assignment on test-first API development.

## About

This is a web app similar to this tutorial https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai, but is
a todo list instead of book list. The front-end is made with Bootstrap 4. Note: The current version of Bootstrap 4 has a 
bug with the container element at extra small viewports.

To run tests, go to the project directory and type `npm test`. There are 6 tests, and they should all pass.

To run the web app, start the MongoDB server: `mongod --dbpath /path/to/data/directory`. Next, from the project directory,
type `node app.js`. The website is live at `localhost:3000`.

Here is a screenshot of the web app:

![Screenshot](screenshot.png)
