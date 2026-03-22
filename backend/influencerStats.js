// backend/influencerStats.js
const express = require('express');
const router = express.Router();
const User = require('./user');       // Din befintliga user model
const Payment = require('./payment'); // Din befintliga payment model

// Hämta statistik för en influencer
router.get('/:influencer_id', async (req, res) => {
  const influencerId = req.params.influencer_id;

  try {
    const totalUsers = await User.countDocuments({ influencer_id: influencerId });
    const totalPaying = await Payment.countDocuments({ influencer_id: influencerId });
    const totalRevenueAgg = await Payment.aggregate([
      { $match: { influencer_id: influencerId } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const totalRevenue = totalRevenueAgg[0] ? totalRevenueAgg[0].total : 0;

    res.json({
      influencer_id: influencerId,
      totalUsers,
      totalPaying,
      totalRevenue
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
