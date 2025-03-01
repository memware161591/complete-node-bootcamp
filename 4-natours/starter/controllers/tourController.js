const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
//

exports.checkId = (req, res, next, val) => {
  console.log(`Tour id is ${val}`);
  if (parseInt(val) > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!('name' in req.body) || !('price' in req.body)) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }

  next();
};

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};

exports.newTour = (req, res) => {
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

exports.getTour = (req, res) => {
  const { id } = req.params;
  console.log(req.params);

  const tour = tours.find((el) => el.id === parseInt(id));
  console.log(tour);
  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};

exports.updateTour = (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updated tour here>',
    },
  });
};

exports.deleteTour = (req, res) => {
  const { id } = req.params;

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
