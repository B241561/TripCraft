import { useNavigate } from 'react-router-dom';
import { Sparkles, Map, Star, ArrowRight, Plane, Train, Bus, Hotel } from 'lucide-react';

const destinations = [
  { name: 'Goa', tag: 'Beach Paradise', emoji: '🏖️', color: '#4ECDC4' },
  { name: 'Manali', tag: 'Mountain Escape', emoji: '🏔️', color: '#748FFC' },
  { name: 'Jaipur', tag: 'Royal Heritage', emoji: '🏰', color: '#F8A858' },
  { name: 'Kerala', tag: "God's Own Country", emoji: '🌴', color: '#68D391' },
  { name: 'Varanasi', tag: 'Spiritual Journey', emoji: '🕌', color: '#FC8181' },
  { name: 'Ladakh', tag: 'High Altitude', emoji: '🗻', color: '#63B3ED' },
];

const features = [
  { icon: <Sparkles size={22} />, title: 'AI-Powered Plans', desc: 'Groq crafts your perfect day-by-day itinerary in seconds' },
  { icon: <Map size={22} />, title: 'Smart Comparisons', desc: 'Compare hotels, trains, buses and flights side by side' },
  { icon: <Star size={22} />, title: 'Top 10 Places', desc: 'Curated must-visit spots for every destination' },
  { icon: <ArrowRight size={22} />, title: 'One-Click Booking', desc: 'Redirects to RedBus, RailYatri, MakeMyTrip instantly' },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {/* Animated background orbs */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <div style={{ position: 'absolute', top: '15%', left: '10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)', animation: 'float 8s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', bottom: '20%', right: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,179,237,0.06) 0%, transparent 70%)', animation: 'float 10s ease-in-out infinite reverse' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.03) 0%, transparent 60%)' }} />

          {/* Grid lines */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.03 }} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: 100 }}>
          <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 100, border: '1px solid var(--border-gold)', background: 'var(--gold-dim)', marginBottom: 32, animation: 'fadeIn 0.6s ease both' }}>
              <Sparkles size={13} color="var(--gold)" />
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>AI-Powered Travel Planning</span>
            </div>

            {/* Headline */}
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(42px, 7vw, 84px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 24, animation: 'fadeIn 0.6s 0.1s ease both', opacity: 0 }}>
              Your Perfect Trip,<br />
              <span className="gold-text">Crafted by AI</span>
            </h1>

            {/* Subheading */}
            <p style={{ fontSize: 'clamp(15px, 2vw, 19px)', color: 'var(--cream-muted)', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 40px', animation: 'fadeIn 0.6s 0.2s ease both', opacity: 0 }}>
              Enter your destination, budget & days. Get a complete travel plan with hotel comparisons, transport options, and curated itinerary — all in seconds.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 64, animation: 'fadeIn 0.6s 0.3s ease both', opacity: 0 }}>
              <button onClick={() => navigate('/plan')} className="btn btn-gold" style={{ padding: '14px 32px', fontSize: 15, borderRadius: 12 }}>
                <Sparkles size={16} /> Plan My Trip
              </button>
              <button onClick={() => navigate('/register')} className="btn btn-outline" style={{ padding: '14px 32px', fontSize: 15, borderRadius: 12 }}>
                Create Free Account
              </button>
            </div>

            {/* Transport pills */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', animation: 'fadeIn 0.6s 0.4s ease both', opacity: 0 }}>
              {[
                { icon: <Bus size={14} />, label: 'RedBus', color: '#D84E55' },
                { icon: <Train size={14} />, label: 'RailYatri', color: '#2563EB' },
                { icon: <Plane size={14} />, label: 'MakeMyTrip', color: '#E8523A' },
                { icon: <Hotel size={14} />, label: 'Hotels', color: 'var(--gold)' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 100, background: 'var(--surface)', border: '1px solid var(--border)', fontSize: 12, color: item.color, fontWeight: 500 }}>
                  {item.icon} {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section style={{ padding: '80px 0', background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Explore India</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700 }}>Popular Destinations</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
            {destinations.map((dest) => (
              <div
                key={dest.name}
                onClick={() => navigate('/plan')}
                style={{ padding: '28px 20px', borderRadius: 16, background: 'var(--surface)', border: '1px solid var(--border)', cursor: 'pointer', textAlign: 'center', transition: 'all 0.3s ease', position: 'relative', overflow: 'hidden' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = dest.color + '55'; e.currentTarget.style.boxShadow = `0 16px 40px ${dest.color}18`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = ''; }}
              >
                <div style={{ fontSize: 36, marginBottom: 12 }}>{dest.emoji}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 4, color: dest.color }}>{dest.name}</h3>
                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{dest.tag}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, marginBottom: 16 }}>
              Everything You Need to <span className="gold-text">Travel Smart</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 480, margin: '0 auto' }}>From AI-powered planning to one-click booking — we handle every detail.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
            {features.map((f, i) => (
              <div key={i} className="glass-card" style={{ padding: '28px 24px' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--gold-dim)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', marginBottom: 16 }}>
                  {f.icon}
                </div>
                <h3 style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', borderRadius: 24, background: 'linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.04))', border: '1px solid var(--border-gold)', padding: '60px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)' }} />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700, marginBottom: 16 }}>Ready to Start Your Journey?</h2>
          <p style={{ color: 'var(--cream-muted)', fontSize: 16, marginBottom: 32 }}>Let AI plan your dream trip in under 60 seconds.</p>
          <button onClick={() => navigate('/plan')} className="btn btn-gold" style={{ padding: '14px 36px', fontSize: 15 }}>
            <Sparkles size={16} /> Plan My Trip Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '32px 24px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-dim)', fontSize: 13 }}>© 2024 TripCraft — AI Travel Planner. Booking redirects powered by RedBus, RailYatri & MakeMyTrip.</p>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
