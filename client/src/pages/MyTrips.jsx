import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMyTrips, deleteTrip } from '../services/api';
import { MapPin, Calendar, Users, Wallet, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { formatCurrency } from '../utils/bookingRedirects';

export default function MyTrips() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    getMyTrips()
      .then(({ data }) => setTrips(data))
      .finally(() => setLoading(false));
  }, [user]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this trip?')) return;
    setDeleting(id);
    try {
      await deleteTrip(id);
      setTrips(t => t.filter(x => x._id !== id));
    } catch (e) { alert('Failed to delete'); }
    setDeleting(null);
  };

  const budgeCategoryStyle = { budget: { bg: 'var(--surface-hover)', color: 'var(--text-muted)' }, 'mid-range': { bg: 'var(--surface-hover)', color: 'var(--text-muted)' }, luxury: { bg: 'var(--surface-hover)', color: 'var(--text)' } };

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, border: '1px solid var(--border)', background: 'var(--surface)' }} />
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', paddingTop: 90, paddingBottom: 60 }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Your Journey Log</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 5vw, 44px)', fontWeight: 800 }}>
              My <span className="gold-text">Trips</span>
            </h1>
          </div>
          <button onClick={() => navigate('/plan')} className="btn btn-gold">
            <Sparkles size={15} /> Plan New Trip
          </button>
        </div>

        {trips.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <p style={{ fontSize: 56, marginBottom: 20 }}>🗺️</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, marginBottom: 12 }}>No trips yet</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: 28 }}>Start planning your first AI-powered trip adventure!</p>
            <button onClick={() => navigate('/plan')} className="btn btn-gold">
              <Sparkles size={15} /> Plan My First Trip
            </button>
          </div>
        ) : (
          <div className="home-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 20 }}>
            {trips.map((trip, idx) => {
              const catStyle = budgeCategoryStyle[trip.budgetCategory] || budgeCategoryStyle['mid-range'];
              const date = new Date(trip.createdAt);
              const dateStr = date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

              return (
                <div
                  key={trip._id}
                  className="glass-card"
                  style={{ padding: '24px', transition: 'all 0.2s ease', cursor: 'pointer', position: 'relative' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = 'var(--text-muted)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = 'var(--border)'; }}
                  onClick={() => navigate(`/result/${trip._id}`)}
                >
                  {/* Delete button */}
                  <button
                    onClick={e => { e.stopPropagation(); handleDelete(trip._id); }}
                    disabled={deleting === trip._id}
                    style={{ position: 'absolute', top: 16, right: 16, width: 30, height: 30, borderRadius: 8, background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', zIndex: 2 }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface-hover)'; e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'var(--text-muted)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-dim)'; e.currentTarget.style.borderColor = 'var(--border)'; }}>
                    <Trash2 size={13} />
                  </button>

                  {/* Destination emoji & route */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>✈️</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700 }}>{trip.destination}</h3>
                      <span style={{ padding: '3px 8px', borderRadius: 8, fontSize: 11, fontWeight: 650, background: catStyle.bg, color: catStyle.color }}>
                        {trip.budgetCategory}
                      </span>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                      <MapPin size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                      From {trip.source}
                    </p>
                  </div>

                  {/* Stats */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
                    {[
                      { icon: <Calendar size={12} />, label: 'Duration', val: `${trip.numberOfDays} days` },
                      { icon: <Users size={12} />, label: 'People', val: `${trip.numberOfPeople}` },
                      { icon: <Wallet size={12} />, label: 'Budget', val: formatCurrency(trip.budget) },
                      { icon: null, label: 'Created', val: dateStr },
                    ].map((item, i) => (
                      <div key={i} style={{ padding: '10px 12px', borderRadius: 8, background: 'var(--bg)', border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>
                          {item.icon} {item.label}
                        </div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--cream)' }}>{item.val}</p>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: 'var(--gold)', fontWeight: 600 }}>
                    View Full Plan <ArrowRight size={14} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
