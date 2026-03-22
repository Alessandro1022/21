// ===== Imports =====
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Din befintliga modeller
const User = require('./user');
const Payment = require('./payment');

const app = express();
app.use(bodyParser.json());

// ===== MongoDB Connection =====
mongoose.connect('mongodb://localhost:27017/empire_ai', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// ===== Registrering / Logga in med influencer-id =====
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const influencerId = req.body.influencer_id || null;

    const newUser = new User({
      email,
      password,
      influencer_id: influencerId
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered', user: newUser });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// ===== Skapa betalning kopplad till influencer =====
app.post('/api/payment', async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const influencerId = user.influencer_id || null;

    const payment = new Payment({
      user_id: userId,
      influencer_id: influencerId,
      amount,
      date: new Date()
    });

    await payment.save();

    const influencerShare = influencerId ? amount * 0.1 : 0;

    res.status(201).json({ message: 'Payment saved', influencerShare, payment });
  } catch (err) {
    console.error('Payment error:', err);
    res.status(500).json({ error: 'Payment failed' });
  }
});

// ===== Statistik per influencer =====
app.get('/api/influencer/:influencer_id', async (req, res) => {
  const influencerId = req.params.influencer_id;
  if (!influencerId) return res.status(400).json({ error: 'Influencer ID krävs' });

  try {
    const totalUsers = await User.countDocuments({ influencer_id: influencerId });
    const totalPaying = await Payment.countDocuments({ influencer_id: influencerId });
    const totalRevenueAgg = await Payment.aggregate([
      { $match: { influencer_id: influencerId } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalRevenue = totalRevenueAgg[0] ? totalRevenueAgg[0].total : 0;
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

// ===== Lista alla betalningar för influencer =====
app.get('/api/influencer/:influencer_id/payments', async (req, res) => {
  const influencerId = req.params.influencer_id;
  if (!influencerId) return res.status(400).json({ error: 'Influencer ID krävs' });

  try {
    const payments = await Payment.find({ influencer_id: influencerId }).sort({ date: -1 });
    res.json({ influencer_id: influencerId, payments });
  } catch (err) {
    console.error('Error fetching influencer payments:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ===== Starta server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
