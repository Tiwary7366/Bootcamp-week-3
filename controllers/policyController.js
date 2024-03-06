const Policy = require('../models/policyModel');
const User = require('../models/userModel')
// Create a new policy
const createPolicy = async (req, res) => {
  try {
    const newPolicy = new Policy(req.body);
    await newPolicy.save();
    res.status(201).json(newPolicy);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all policies
const getPolicies = async (req, res) => {
  try {
    const policies = await Policy.find();
    res.json(policies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single policy by ID
const getPolicyById = async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);
    if (!policy) {
      return res.status(404).json({ message: 'Policy not found' });
    }
    res.json(policy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all policies by user id
const getAllPoliciesByUser = async (req, res) => {
  try{
    const user = await User.findById(req.params.id);
    if(!user) {
      throw new Error('User not found');
    }
    return user.policies;
  } catch (err){
    throw new Error("Error:" + err);
  }
};

// Update a policy by ID
const updatePolicy = async (req, res) => {
  try {
    const policy = await Policy.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!policy) {
      return res.status(404).json({ message: 'Policy not found' });
    }
    res.json(policy);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a policy by ID
const deletePolicy = async (req, res) => {
  try {
    const policy = await Policy.findByIdAndDelete(req.params.id);
    if (!policy) {
      return res.status(404).json({ message: 'Policy not found' });
    }
    res.json({ message: 'Policy deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPolicy,
  getPolicies,
  getPolicyById,
  updatePolicy,
  deletePolicy,
};
