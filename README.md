# Task Manager
RESTful API managing personal tasks and events implemented in Node.js, Express and MongoDB. 

## Features

* Authentication with JWT
* Authorization middleware with admin layer
* Error handling with file logging
* Email verification with SendGrid API upon successful registration
* Validation with Joi

more routes and functionalities will be added in the near future.

## Requirements

* Node installed
* MongoDB configuration for localhost development
* SendGrid API key 

## Scripts

1) At first, download the project

2) After downloading the project, navigate in the project directory and run:

### `npm i`

3) After downloading the packages, rename the .env.example file to .env and fill the values with your credentials.

e.g.

```
TASKMANAGER_MONGO_DB=mongodb://db...
```

4) Finally, in order to start the server just run:

### `npm start`

The application is being served on:

```
http://localhost:3000/api/...
```
Application routes located in the routes folder. Every route implementation is located in controllers folder.
