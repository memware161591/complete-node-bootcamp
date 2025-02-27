const fs = require('fs');
const express = require('express');

const app = express();

//middleware
app.use(express.json());
const basePath = '/api/v1/tours';
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
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

// // All tours
// app.get('/api/v1/tours', getAllTours);

// // A Single tour
// app.get('/api/v1/tours/:id', getTour);

// app.post('/api/v1/tours', newTour);

// // Update a tour
// //
// app.patch('/api/v1/tours/:id', updateTour);

// //Delete
// app.delete('/api/v1/tours/:id', deleteTour);


//Refactored routes
app.route('/api/v1/tours').get(getAllTours).patch(updateTour);
app.route('/api/v1/tours/:id').get(getTour).post(newTour).delete(deleteTour);

// start up a server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
