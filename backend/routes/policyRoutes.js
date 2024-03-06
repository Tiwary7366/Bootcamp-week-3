const express = require('express');
const router = express.Router();
const policyController = require('../controllers/policyController');

// Routes for policies
router.post('/policies', policyController.createPolicy);
router.get('/policies', policyController.getPolicies);
router.get('/policies/:id', policyController.getPolicyById);
router.put('/policies/:id', policyController.updatePolicy);
router.delete('/policies/:id', policyController.deletePolicy);

module.exports = router;
