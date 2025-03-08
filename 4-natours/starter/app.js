import fs from 'fs';
import express, { json} from 'express';
import tourRouter from './routers/toursRoute';
import userRouter from './routers/usersRoute';
import morgan from 'morgan';
const port = 3000;
const app = express();

//middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(json());
app.use(app.static(`${__dirname}/public`));

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

export default app;
