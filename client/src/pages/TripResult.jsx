import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTripById } from '../services/api';
import { formatCurrency } from '../utils/bookingRedirects';
import ItineraryTab from '../components/Results/ItineraryTab';
import HotelsTab from '../components/Results/HotelsTab';
import TransportTab from '../components/Results/TransportTab';
import PlacesTab from '../components/Results/PlacesTab';
import { ArrowLeft, Calendar, Users, Wallet, MapPin, Lightbulb, ChevronRight } from 'lucide-react';

const TABS = [
  { id: 'itinerary', label: '🗓️ Itinerary', desc: 'Day-by-day plan' },
  { id: 'transport', label: '🚌 Transport', desc: 'Compare options' },
  { id: 'hotels', label: '🏨 Hotels', desc: 'Best stays' },
  { id: 'places', label: '📍 Top Places', desc: 'Must visits' },
];

export default function TripResult() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('itinerary');
  const [error, setError] = useState('');

  useEffect(() => {
    getTripById(id)
      .then(({ data }) => setTrip(data))
      .catch(() => setError('Trip not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, border: '1px solid var(--border)', background: 'var(--surface)' }} />
      <p style={{ color: 'var(--text-muted)' }}>Loading your trip plan...</p>
    </div>
  );

  if (error) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
      <p style={{ fontSize: 48 }}>😕</p>
      <p style={{ color: 'var(--text-muted)' }}>{error}</p>
      <button onClick={() => navigate('/plan')} className="btn btn-gold">Plan New Trip</button>
    </div>
  );

  if (!trip) return null;

  const { generatedPlan: plan, source, destination, budget, numberOfDays, numberOfPeople, budgetCategory } = trip;

  return (
    <div style={{ minHeight: '100vh', paddingTop: 68 }}>
      {/* Hero Header */}
      <div style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)', padding: '36px 0 0' }}>
        <div className="container">
          {/* Back button */}
          <button onClick={() => navigate('/plan')} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: 14, background: 'none', border: 'none', cursor: 'pointer', marginBottom: 24, transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
            <ArrowLeft size={16} /> Plan another trip
          </button>

          {/* Route title */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap', marginBottom: 24 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Your AI-Generated Trip</span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 5vw, 48px)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                {source} <span style={{ color: 'var(--text-dim)' }}>→</span> <span className="gold-text">{destination}</span>
              </h1>
              {plan?.bestTimeToVisit && (
                <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 6 }}>🌤️ Best time: {plan.bestTimeToVisit}</p>
              )}
            </div>

            {/* Total cost badge */}
            {plan?.totalEstimatedCost && (
              <div style={{ padding: '16px 20px', borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--border)', textAlign: 'center', flexShrink: 0 }}>
                <p style={{ fontSize: 11, color: 'var(--gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Estimated Total</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--gold)' }}>{formatCurrency(plan.totalEstimatedCost)}</p>
                <p style={{ fontSize: 11, color: 'var(--cream-muted)' }}>for {numberOfPeople} {numberOfPeople === 1 ? 'person' : 'people'}</p>
              </div>
            )}
          </div>

          {/* Trip info pills */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
            {[
              { icon: <MapPin size={13} />, text: `${source} → ${destination}` },
              { icon: <Calendar size={13} />, text: `${numberOfDays} Days` },
              { icon: <Users size={13} />, text: `${numberOfPeople} ${numberOfPeople === 1 ? 'Traveller' : 'Travellers'}` },
              { icon: <Wallet size={13} />, text: `${formatCurrency(budget)} Budget` },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', borderRadius: 8, background: 'var(--surface)', border: '1px solid var(--border)', fontSize: 13, color: 'var(--text-muted)' }}>
                <span style={{ color: 'var(--text-muted)' }}>{item.icon}</span> {item.text}
              </div>
            ))}
          </div>

          {/* Cost breakdown */}
          {plan?.costBreakdown && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
              {Object.entries(plan.costBreakdown).filter(([, v]) => v > 0).map(([key, val]) => (
                <div key={key} style={{ fontSize: 12, padding: '4px 8px', borderRadius: 8, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}: <strong style={{ color: 'var(--cream)' }}>{formatCurrency(val)}</strong>
                </div>
              ))}
            </div>
          )}

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 2, marginTop: 8, overflowX: 'auto', paddingBottom: 2 }}>
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{ padding: '12px 16px', background: 'none', border: 'none', cursor: 'pointer', borderBottom: `2px solid ${activeTab === tab.id ? 'var(--text)' : 'transparent'}`, color: activeTab === tab.id ? 'var(--text)' : 'var(--text-muted)', fontSize: 14, fontWeight: activeTab === tab.id ? 600 : 400, transition: 'all 0.2s', whiteSpace: 'nowrap', fontFamily: 'var(--font-body)' }}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="container" style={{ paddingTop: 36, paddingBottom: 36 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 28, alignItems: 'start' }} className="result-grid">
          {/* Main content */}
          <div key={activeTab} style={{ animation: 'page-enter 220ms ease-out both' }}>
            {activeTab === 'itinerary' && <ItineraryTab itinerary={plan?.itinerary} />}
            {activeTab === 'transport' && <TransportTab transport={plan?.transport} source={source} destination={destination} numberOfPeople={numberOfPeople} />}
            {activeTab === 'hotels' && <HotelsTab hotels={plan?.hotels} destination={destination} />}
            {activeTab === 'places' && <PlacesTab places={plan?.topPlaces} />}
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }} className="result-sidebar">
            {/* Tips */}
            {plan?.tips?.length > 0 && (
              <div className="glass-card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <Lightbulb size={16} color="var(--text-muted)" />
                  <h3 style={{ fontWeight: 700, fontSize: 15 }}>Travel Tips</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {plan.tips.map((tip, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      <span style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: 1 }}>→</span>
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Local Cuisine */}
            {plan?.localCuisine?.length > 0 && (
              <div className="glass-card" style={{ padding: '20px' }}>
                <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>🍛 Must-Try Food</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {plan.localCuisine.map((dish, i) => (
                    <span key={i} style={{ padding: '5px 8px', borderRadius: 8, background: 'var(--surface)', border: '1px solid var(--border)', fontSize: 12, color: 'var(--text-muted)' }}>
                      {dish}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quick nav */}
            <div className="glass-card" style={{ padding: '20px' }}>
              <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>Quick Navigate</h3>
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 8, background: activeTab === tab.id ? 'var(--surface-hover)' : 'transparent', border: 'none', cursor: 'pointer', marginBottom: 4, color: activeTab === tab.id ? 'var(--text)' : 'var(--text-muted)', fontSize: 13, fontWeight: activeTab === tab.id ? 600 : 400, transition: 'all 0.2s', fontFamily: 'var(--font-body)', textAlign: 'left' }}>
                  <span>{tab.label}</span>
                  <ChevronRight size={14} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .result-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
