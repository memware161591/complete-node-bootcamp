const fs = require('fs');
const express = require('express');
const tourRouter = require('./routers/toursRoute');
const userRouter = require('./routers/usersRoute');
const morgan = require('morgan');
const port = 3000;
const app = express();

//middleware
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware 😁');
  next();
});

app.use((req, reqs, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// start up a server

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports =app;