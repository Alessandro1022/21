import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Supabase inställningar
const SUPABASE_URL = 'https://puztaocorkofidniafvu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1enRhb2NvcmtvZmlkbmlhZnZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5NzMwNzMsImV4cCI6MjA4OTU0OTA3M30.ZxOgAj_F_VtJG8gzMZwNafRV-sAJqMI1CD4adcNMHvE';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Funktion för att rendera influencer-statistik och betalningar
export default async function renderInfluencerDashboard(influencerId) {
  try {
    // Hämta användare
    const { data: users, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('influencer_id', influencerId);
    if (userError) throw userError;

    // Hämta betalningar
    const { data: payments, error: paymentError } = await supabase
      .from('payments')
      .select('*')
      .eq('influencer_id', influencerId)
      .order('date', { ascending: false });
    if (paymentError) throw paymentError;

    const totalUsers = users.length;
    const totalPaying = payments.length;
    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
    const conversionRate = totalUsers > 0 ? ((totalPaying / totalUsers) * 100).toFixed(2) : 0;

    // Rendera statistik
    const statsContainer = document.getElementById('dashboard-stats');
    statsContainer.innerHTML = `
      <h3>Influencer Statistik</h3>
      <ul>
        <li>Influencer: ${influencerId}</li>
        <li>Totalt användare: ${totalUsers}</li>
        <li>Betalande abonnenter: ${totalPaying}</li>
        <li>Total intäkt: ${totalRevenue} SEK</li>
        <li>Konverteringsgrad: ${conversionRate}%</li>
      </ul>
    `;

    // Rendera betalningar
    const paymentsContainer = document.getElementById('dashboard-payments');
    let paymentsHTML = `<h3>Betalningar</h3><ul>`;
    payments.forEach(p => {
      paymentsHTML += `<li>${new Date(p.date).toLocaleDateString()}: ${p.amount} SEK (User: ${p.user_id})</li>`;
    });
    paymentsHTML += `</ul>`;
    paymentsContainer.innerHTML = paymentsHTML;

  } catch (err) {
    console.error('Dashboard error:', err);
    const statsContainer = document.getElementById('dashboard-stats');
    statsContainer.innerHTML = `<p>Det gick inte att ladda statistik.</p>`;
  }
}

// Kör direkt exempel på influencer "jannica"
renderInfluencerDashboard('jannica');
