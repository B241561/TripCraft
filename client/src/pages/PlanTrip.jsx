import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateTrip } from '../services/api';
import { MapPin, Calendar, Users, Wallet, ChevronRight, ChevronLeft, Sparkles, Loader, Check } from 'lucide-react';

const PREFERENCES = ['Adventure', 'Heritage & Culture', 'Beach', 'Mountains', 'Wildlife', 'Food & Cuisine', 'Shopping', 'Spiritual', 'Romantic', 'Family-Friendly'];

const INDIAN_CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara', 'Goa', 'Manali', 'Shimla', 'Mussoorie', 'Nainital', 'Darjeeling', 'Ooty', 'Munnar', 'Coorg', 'Gokarna', 'Rishikesh', 'Haridwar', 'Varanasi', 'Agra', 'Jodhpur', 'Udaipur', 'Pushkar', 'Amritsar', 'Chandigarh', 'Kochi', 'Thiruvananthapuram', 'Mysore', 'Hampi', 'Ladakh', 'Leh', 'Spiti', 'Andaman', 'Pondicherry'];

export default function PlanTrip() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    source: '', destination: '', budget: 15000, numberOfDays: 5,
    numberOfPeople: 2, preferences: [],
  });
  const [sourceQuery, setSourceQuery] = useState('');
  const [destQuery, setDestQuery] = useState('');

  const filteredSource = INDIAN_CITIES.filter(c => c.toLowerCase().includes(sourceQuery.toLowerCase()) && sourceQuery.length > 0).slice(0, 6);
  const filteredDest = INDIAN_CITIES.filter(c => c.toLowerCase().includes(destQuery.toLowerCase()) && destQuery.length > 0).slice(0, 6);

  const togglePref = (p) => setForm(f => ({
    ...f,
    preferences: f.preferences.includes(p) ? f.preferences.filter(x => x !== p) : [...f.preferences, p]
  }));

  const budgetLabel = form.budget < 10000 ? 'Budget Travel' : form.budget < 30000 ? 'Mid-Range' : 'Luxury';

  const handleSubmit = async () => {
    if (!form.source || !form.destination) { setError('Please fill in source and destination.'); return; }
    setError('');
    setLoading(true);
    try {
      const { data } = await generateTrip(form);
      navigate(`/result/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate trip. Please try again.');
      setLoading(false);
    }
  };

  const inputStyle = { width: '100%', padding: '14px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', fontSize: 15, outline: 'none', transition: 'border-color 0.2s' };

  return (
    <div style={{ minHeight: '100vh', paddingTop: 90, paddingBottom: 60 }}>
      <div className="container" style={{ maxWidth: 680 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>AI Travel Planner</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Plan Your <span className="gold-text">Dream Trip</span>
          </h1>
        </div>

        {/* Step Progress */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 40, gap: 0 }}>
          {[1, 2, 3].map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, background: step >= s ? 'var(--text)' : 'var(--surface)', color: step >= s ? 'var(--bg)' : 'var(--text-muted)', border: '1px solid var(--border)', transition: 'all 0.2s ease' }}>
                {s}
              </div>
              {i < 2 && <div style={{ width: 80, height: 1, background: step > s ? 'var(--text)' : 'var(--border)', transition: 'background 0.2s ease' }} />}
            </div>
          ))}
        </div>

        {/* Step Labels */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32, maxWidth: 300, margin: '0 auto 32px' }}>
          {['Route', 'Details', 'Preferences'].map((label, i) => (
            <span key={label} style={{ fontSize: 11, color: step === i + 1 ? 'var(--gold)' : 'var(--text-dim)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{label}</span>
          ))}
        </div>

        {/* Card */}
        <div className="glass-card form-card" style={{ padding: '32px' }}>

          {/* Step 1: Route */}
          {step === 1 && (
            <div style={{ animation: 'page-enter 220ms ease-out both' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, marginBottom: 28 }}>
                <MapPin size={20} color="var(--gold)" style={{ marginRight: 8, verticalAlign: 'middle' }} />
                Where are you travelling?
              </h2>

              {/* Source */}
              <div style={{ marginBottom: 20, position: 'relative' }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>From (Source City)</label>
                <input
                  style={inputStyle}
                  placeholder="e.g. Mumbai, Delhi, Bangalore..."
                  value={sourceQuery || form.source}
                  onChange={e => { setSourceQuery(e.target.value); setForm(f => ({ ...f, source: e.target.value })); }}
                  onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                  onBlur={e => { e.target.style.borderColor = 'var(--border)'; setTimeout(() => setSourceQuery(''), 200); }}
                />
                {filteredSource.length > 0 && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 100, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, marginTop: 4, overflow: 'hidden' }}>
                    {filteredSource.map(city => (
                      <div key={city} style={{ padding: '10px 16px', cursor: 'pointer', fontSize: 14, transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-hover)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        onMouseDown={() => { setForm(f => ({ ...f, source: city })); setSourceQuery(''); }}>
                        <MapPin size={13} style={{ marginRight: 8, verticalAlign: 'middle', color: 'var(--text-muted)' }} />{city}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Destination */}
              <div style={{ position: 'relative' }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>To (Destination)</label>
                <input
                  style={inputStyle}
                  placeholder="e.g. Goa, Manali, Jaipur..."
                  value={destQuery || form.destination}
                  onChange={e => { setDestQuery(e.target.value); setForm(f => ({ ...f, destination: e.target.value })); }}
                  onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                  onBlur={e => { e.target.style.borderColor = 'var(--border)'; setTimeout(() => setDestQuery(''), 200); }}
                />
                {filteredDest.length > 0 && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 100, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, marginTop: 4, overflow: 'hidden' }}>
                    {filteredDest.map(city => (
                      <div key={city} style={{ padding: '10px 16px', cursor: 'pointer', fontSize: 14, transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-hover)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        onMouseDown={() => { setForm(f => ({ ...f, destination: city })); setDestQuery(''); }}>
                        <MapPin size={13} style={{ marginRight: 8, verticalAlign: 'middle', color: 'var(--text-muted)' }} />{city}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Budget, Days, People */}
          {step === 2 && (
            <div style={{ animation: 'page-enter 220ms ease-out both' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, marginBottom: 28 }}>
                <Wallet size={20} color="var(--gold)" style={{ marginRight: 8, verticalAlign: 'middle' }} />
                Trip Details
              </h2>

              {/* Budget Slider */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Total Budget</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--gold)' }}>₹{form.budget.toLocaleString('en-IN')}</span>
                    <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: 'var(--gold-dim)', color: 'var(--gold)', fontWeight: 600 }}>{budgetLabel}</span>
                  </div>
                </div>
                <input
                  type="range" min="3000" max="200000" step="1000"
                  value={form.budget}
                  onChange={e => setForm(f => ({ ...f, budget: +e.target.value }))}
                  style={{ width: '100%', accentColor: 'var(--gold)', height: 4, cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                  <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>₹3,000</span>
                  <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>₹2,00,000</span>
                </div>
              </div>

              {/* Days & People */}
              <div className="form-two-column" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>
                    <Calendar size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Number of Days
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button onClick={() => setForm(f => ({ ...f, numberOfDays: Math.max(1, f.numberOfDays - 1) }))} style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--gold)', minWidth: 40, textAlign: 'center' }}>{form.numberOfDays}</span>
                    <button onClick={() => setForm(f => ({ ...f, numberOfDays: Math.min(30, f.numberOfDays + 1) }))} style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                  </div>
                  <p style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 6 }}>days of travel</p>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>
                    <Users size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} /> No. of People
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button onClick={() => setForm(f => ({ ...f, numberOfPeople: Math.max(1, f.numberOfPeople - 1) }))} style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--gold)', minWidth: 40, textAlign: 'center' }}>{form.numberOfPeople}</span>
                    <button onClick={() => setForm(f => ({ ...f, numberOfPeople: Math.min(20, f.numberOfPeople + 1) }))} style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                  </div>
                  <p style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 6 }}>travellers</p>
                </div>
              </div>

              {/* Summary pill */}
              <div style={{ marginTop: 24, padding: '14px 18px', borderRadius: 12, background: 'var(--gold-dim)', border: '1px solid var(--border-gold)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px 20px', fontSize: 13, color: 'var(--gold)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Wallet size={14} /> Budget per person: <strong>₹{Math.round(form.budget / form.numberOfPeople).toLocaleString('en-IN')}</strong></span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Calendar size={14} /> {form.numberOfDays} days</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Users size={14} /> {form.numberOfPeople} {form.numberOfPeople === 1 ? 'person' : 'people'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Preferences */}
          {step === 3 && (
            <div style={{ animation: 'page-enter 220ms ease-out both' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
                <Sparkles size={20} color="var(--gold)" style={{ marginRight: 8, verticalAlign: 'middle' }} />
                Your Travel Style
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 28 }}>Select preferences to personalize your AI plan (optional)</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {PREFERENCES.map(p => (
                  <button
                    key={p}
                    onClick={() => togglePref(p)}
                    style={{ padding: '8px 12px', borderRadius: 8, border: `1px solid ${form.preferences.includes(p) ? 'var(--text)' : 'var(--border)'}`, background: form.preferences.includes(p) ? 'var(--surface-hover)' : 'var(--surface)', color: form.preferences.includes(p) ? 'var(--text)' : 'var(--text-muted)', fontSize: 13, fontWeight: 500, transition: 'all 0.2s', cursor: 'pointer' }}>
                    {form.preferences.includes(p) && <Check size={13} style={{ marginRight: 6, verticalAlign: 'middle' }} />}{p}
                  </button>
                ))}
              </div>

              {/* Trip summary */}
              <div style={{ marginTop: 28, padding: '20px', borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Trip Summary</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {[
                    { label: 'From', value: form.source },
                    { label: 'To', value: form.destination },
                    { label: 'Days', value: `${form.numberOfDays} days` },
                    { label: 'Budget', value: `₹${form.budget.toLocaleString('en-IN')}` },
                    { label: 'People', value: `${form.numberOfPeople} travellers` },
                    { label: 'Style', value: form.preferences.length ? form.preferences.slice(0, 2).join(', ') : 'General' },
                  ].map(item => (
                    <div key={item.label}>
                      <p style={{ fontSize: 10, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</p>
                      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--cream)' }}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {error && <p style={{ color: 'var(--error)', fontSize: 13, marginTop: 16, textAlign: 'center' }}>{error}</p>}
            </div>
          )}

          {/* Navigation Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 36 }}>
            {step > 1 ? (
              <button onClick={() => setStep(s => s - 1)} className="btn btn-ghost" style={{ padding: '12px 22px' }}>
                <ChevronLeft size={16} /> Back
              </button>
            ) : <div />}

            {step < 3 ? (
              <button
                onClick={() => {
                  if (step === 1 && (!form.source || !form.destination)) { setError('Please enter both source and destination.'); return; }
                  setError(''); setStep(s => s + 1);
                }}
                className="btn btn-gold"
                style={{ padding: '12px 28px' }}>
                Continue <ChevronRight size={16} />
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={loading} className="btn btn-gold" style={{ padding: '12px 28px', opacity: loading ? 0.8 : 1 }}>
                {loading ? <><Loader size={16} /> Generating Plan...</> : <><Sparkles size={16} /> Generate My Trip</>}
              </button>
            )}
          </div>
          {error && step < 3 && <p style={{ color: 'var(--error)', fontSize: 13, marginTop: 12, textAlign: 'center' }}>{error}</p>}
        </div>
      </div>

      {/* Loading overlay */}
      {loading && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9000, background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, border: '1px solid var(--border)', background: 'var(--surface)' }} />
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700 }}>Crafting your <span className="gold-text">perfect trip</span>...</p>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>AI is planning your itinerary, hotels & transport</p>
        </div>
      )}

      <style>{`
        input[type=range] { -webkit-appearance: none; background: var(--border); border-radius: 4px; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 20px; height: 20px; border-radius: 8px; background: var(--text); cursor: pointer; }
      `}</style>
    </div>
  );
}
