const express = require('express');
const router = express.Router();
const claimController = require('../controllers/claimController');

// Routes for claims
router.post('/claims', claimController.createClaim);
router.get('/claims', claimController.getClaims);
router.get('/claims/:id', claimController.getClaimById);
router.put('/claims/:id', claimController.updateClaim);
router.patch('/claims/:id', claimController.updateClaim);
router.delete('/claims/:id', claimController.deleteClaim);

module.exports = router;
