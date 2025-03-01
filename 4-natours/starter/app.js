const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

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

const basePath = '/api/v1/tours';
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Route handlers
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};

const getTour = (req, res) => {
  const { id } = req.params;
  console.log(req.params);

  const tour = tours.find((el) => el.id === parseInt(id));
  console.log(tour);
  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};
const newTour = (req, res) => {
  //console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  const { id } = req.params;
  if (parseInt(id) > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updated tour here>',
    },
  });
};

const deleteTour = (req, res) => {
  const { id } = req.params;
  if (parseInt(id) > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

//Refactored routes
const tourRouter = express.Router();
app.route('/api/v1/tours', tourRouter);

const userRouter = express.Router();
app.route('/api/v1/users', userRouter);

tourRouter.route('/').get(getAllTours).post(newTour);
tourRouter
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

//app.route('/api/v1/tours').get(getAllTours).post(newTour);
// app
//   .route('/api/v1/tours/:id')
//   .get(getTour)
//   .patch(updateTour)
//   .delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

//app.route('/api/v1/users').get(getAllUsers).post(createUser);
// app
//   .route('api/v1/users/:id')
//   .get(getUser)
//   .patch(updateUser)





//   .delete(deleteUser);

// start up a server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
