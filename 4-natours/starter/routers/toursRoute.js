import { Router } from 'express';

import { getAllTours, newTour, getTour, updateTour, deleteTour, checkId, checkBody } from '../controllers/tourController';

const router = Router();

router.route('/api/v1/tours', router);

router.param('id',checkId);

//Create a checkBody middleware
// Check if body contains tha name and price property
// If not, send back 400 (bad request)

router.route('/').get(getAllTours).post(checkBody,newTour);
router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

export default router;
