// backend/influencerStats.js
const express = require('express');
const router = express.Router();
const User = require('./user');       // Din befintliga User model
const Payment = require('./payment'); // Din befintliga Payment model

// ============================
// Hämta statistik för en influencer
// ============================
router.get('/:influencer_id', async (req, res) => {
  const influencerId = req.params.influencer_id;

  if (!influencerId) {
    return res.status(400).json({ error: 'Influencer ID krävs' });
  }

  try {
    // Totalt antal användare som kom via denna influencer
    const totalUsers = await User.countDocuments({ influencer_id: influencerId });

    // Totalt antal betalande abonnenter
    const totalPaying = await Payment.countDocuments({ influencer_id: influencerId });

    // Total intäkt (summa av alla betalningar via denna influencer)
    const totalRevenueAgg = await Payment.aggregate([
      { $match: { influencer_id: influencerId } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalRevenue = totalRevenueAgg[0] ? totalRevenueAgg[0].total : 0;

    // Valfri: returnera även procent av användare som betalade
    const conversionRate = totalUsers > 0 ? ((totalPaying / totalUsers) * 100).toFixed(2) : 0;

    res.json({
      influencer_id: influencerId,
      totalUsers,
      totalPaying,
      totalRevenue,
      conversionRate: `${conversionRate}%`
    });

  } catch (err) {
    console.error('Error fetching influencer stats:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ============================
// Optional: Hämta lista med alla betalningar för en influencer
// ============================
router.get('/:influencer_id/payments', async (req, res) => {
  const influencerId = req.params.influencer_id;

  if (!influencerId) {
    return res.status(400).json({ error: 'Influencer ID krävs' });
  }

  try {
    const payments = await Payment.find({ influencer_id: influencerId }).sort({ date: -1 });
    res.json({ influencer_id: influencerId, payments });
  } catch (err) {
    console.error('Error fetching influencer payments:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
