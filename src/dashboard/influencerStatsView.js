// src/dashboard/influencerStatsView.js
export default function renderInfluencerDashboard(influencerId) {
  fetch(`/api/influencer/${influencerId}`)
    .then(res => res.json())
    .then(stats => {
      const container = document.getElementById('dashboard-stats');
      container.innerHTML = `
        <h3>Influencer Statistik</h3>
        <ul>
          <li>Influencer: ${stats.influencer_id}</li>
          <li>Totalt användare: ${stats.totalUsers}</li>
          <li>Betalande abonnenter: ${stats.totalPaying}</li>
          <li>Total intäkt: ${stats.totalRevenue} SEK</li>
        </ul>
      `;
    });
}

// Exempel: Använd i dashboard
renderInfluencerDashboard('jannica');
