const express = require('express');

const {
  getAllTours,
  newTour,
  getTour,
  updateTour,
  deleteTour,
  checkId
} = require('../controllers/tourController');

const router = express.Router();

router.route('/api/v1/tours', router);

router.param('id',checkId);

router.route('/').get(getAllTours).post(newTour);
router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

module.exports = router;
