const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/users', userController.createUser);
router.get('/users', authMiddleware.authenticateUser, userController.getAllUsers);
router.get('/users/:id', authMiddleware.authenticateUser, userController.getUserById);
router.patch('/users/:id', userController.updateUser);
router.put('/users', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.patch('/users/:id/delete-policy', userController.deletePolicyFromUser);


// Define other routes for users
module.exports = router;
