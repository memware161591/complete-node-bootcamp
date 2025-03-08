import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import app from './app.js';

const DB = process.env.DATABASE_REMOTE.replace(
  '<PASSWORD>',
  process.env.DB_PASSWORD
);

mongoose.connect(DB).then(function () {
  console.log('DB connection successful!');
});

//  Create schema

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The Forest Hiker',
  rating: 4.7,
  price: 497,
});

testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log('ERROR: ', err);
  });

const port = process.env.Port || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
