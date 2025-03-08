import { Router } from 'express';

import { getAllUsers, createUser, getUser, updateUser, deleteUser } from '../controllers/userContoller';

const router = Router();

router.route('/api/v1/users', router);

router.route('/').get(getAllUsers).post(createUser);
router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

export default router;
