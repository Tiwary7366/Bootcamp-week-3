const Claim = require('../models/claimModel');
const User = require('../models/userModel');

// Create a new claim
const createClaim = async (req, res) => {
  try {
    const newClaim = new Claim(req.body);
    // await newClaim.save();
    const user = await User.findById(newClaim.userId);
    const policyIndex = user.policies.findIndex(policy => policy.policy.toString() === newClaim.policyId.toString());
    if(newClaim.claimAmount > user.policies[policyIndex].leftAmount){
      newClaim.status = "Rejected"
      // return res.status(404).json({message: 'Claim amount is bigger than left amount'})
    }
    await newClaim.save();
    res.status(201).json(newClaim);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all claims
const getClaims = async (req, res) => {
  try {
    const claims = await Claim.find();
    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single claim by ID
const getClaimById = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);
    if (!claim) {
      return res.status(404).json({ message: 'Claim not found' });
    }
    res.json(claim);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a claim by ID
const updateClaim = async (req, res) => {
  try {
    const claim = await Claim.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!claim) {
      return res.status(404).json({ message: 'Claim not found' });
    }
    if(claim.status === "Approved"){
      const user = await User.findById(claim.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const policyIndex = user.policies.findIndex(policy => policy.policy.toString() === claim.policyId.toString());
      if (policyIndex !== -1) {
        user.policies[policyIndex].leftAmount -= claim.claimAmount;
      }
      else{
        return res.status(404).json({message: 'policy not found'});
      }
      await user.save();
    }
    res.json(claim);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a claim by ID
const deleteClaim = async (req, res) => {
  try {
    const claim = await Claim.findByIdAndDelete(req.params.id);
    if (!claim) {
      return res.status(404).json({ message: 'Claim not found' });
    }
    res.json({ message: 'Claim deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createClaim,
  getClaims,
  getClaimById,
  updateClaim,
  deleteClaim,
};
