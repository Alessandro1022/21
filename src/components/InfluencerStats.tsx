import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase inställningar
const SUPABASE_URL = 'https://puztaocorkofidniafvu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1enRhb2NvcmtvZmlkbmlhZnZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5NzMwNzMsImV4cCI6MjA4OTU0OTA3M30.ZxOgAj_F_VtJG8gzMZwNafRV-sAJqMI1CD4adcNMHvE';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

interface Payment {
  user_id: string;
  amount: number;
  date: string;
}

interface InfluencerStatsProps {
  influencerId: string;
}

const InfluencerStats: React.FC<InfluencerStatsProps> = ({ influencerId }) => {
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalPaying, setTotalPaying] = useState<number>(0);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Hämta användare
        const { data: users, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('influencer_id', influencerId);
        if (userError) throw userError;

        // Hämta betalningar
        const { data: paymentsData, error: paymentError } = await supabase
          .from('payments')
          .select('*')
          .eq('influencer_id', influencerId)
          .order('date', { ascending: false });
        if (paymentError) throw paymentError;

        setTotalUsers(users.length);
        setPayments(paymentsData);
        setTotalPaying(paymentsData.length);
        setTotalRevenue(paymentsData.reduce((sum, p) => sum + p.amount, 0));
      } catch (err) {
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [influencerId]);

  if (loading) return <p>Laddar statistik...</p>;

  const conversionRate = totalUsers > 0 ? ((totalPaying / totalUsers) * 100).toFixed(2) : '0';

  return (
    <div>
      <h3>Influencer Statistik</h3>
      <ul>
        <li>Influencer: {influencerId}</li>
        <li>Totalt användare: {totalUsers}</li>
        <li>Betalande abonnenter: {totalPaying}</li>
        <li>Total intäkt: {totalRevenue} SEK</li>
        <li>Konverteringsgrad: {conversionRate}%</li>
      </ul>

      <h3>Betalningar</h3>
      <ul>
        {payments.map((p) => (
          <li key={p.user_id + p.date}>
            {new Date(p.date).toLocaleDateString()}: {p.amount} SEK (User: {p.user_id})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfluencerStats;
