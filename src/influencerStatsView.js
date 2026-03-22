// src/influencerStatsView.js
async function showInfluencerStats(influencerId) {
  const res = await fetch(`/api/influencer/${influencerId}`);
  const stats = await res.json();

  document.getElementById('stats').innerHTML = `
    <p>Influencer: ${stats.influencer_id}</p>
    <p>Totalt användare: ${stats.totalUsers}</p>
    <p>Betalande abonnenter: ${stats.totalPaying}</p>
    <p>Total intäkt: ${stats.totalRevenue} SEK</p>
  `;
}

// Exempel: kör för influencer 'jannica'
showInfluencerStats('jannica');
