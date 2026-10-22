import { useNavigate } from 'react-router-dom';
import { Sparkles, Map, Star, ArrowRight, Plane, Train, Bus, Hotel } from 'lucide-react';

const destinations = [
  { name: 'Goa', tag: 'Beach Paradise', emoji: '🏖️' },
  { name: 'Manali', tag: 'Mountain Escape', emoji: '🏔️' },
  { name: 'Jaipur', tag: 'Royal Heritage', emoji: '🏰' },
  { name: 'Kerala', tag: "God's Own Country", emoji: '🌴' },
  { name: 'Varanasi', tag: 'Spiritual Journey', emoji: '🕌' },
  { name: 'Ladakh', tag: 'High Altitude', emoji: '🗻' },
];

const features = [
  { icon: <Sparkles size={20} />, title: 'AI-Powered Plans', desc: 'Groq crafts your perfect day-by-day itinerary in seconds' },
  { icon: <Map size={20} />, title: 'Smart Comparisons', desc: 'Compare hotels, trains, buses and flights side by side' },
  { icon: <Star size={20} />, title: 'Top 10 Places', desc: 'Curated must-visit spots for every destination' },
  { icon: <ArrowRight size={20} />, title: 'One-Click Booking', desc: 'Redirects to RedBus, RailYatri, MakeMyTrip instantly' },
];

const transportOptions = [
  { icon: <Bus size={16} />, label: 'RedBus' },
  { icon: <Train size={16} />, label: 'RailYatri' },
  { icon: <Plane size={16} />, label: 'MakeMyTrip' },
  { icon: <Hotel size={16} />, label: 'Hotels' },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh' }}>
      <section style={{ minHeight: 'min(760px, 100vh)', display: 'flex', alignItems: 'center', padding: '96px 0 64px' }}>
        <div className="container">
          <div className="home-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.6fr', gap: 56, alignItems: 'center' }}>
            <div className="home-hero-copy" style={{ maxWidth: 680 }}>
              <p style={{ fontSize: 12, fontWeight: 650, color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
                AI-Powered Travel Planning
              </p>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(42px, 7vw, 76px)', fontWeight: 700, lineHeight: 1.02, letterSpacing: '-0.045em', marginBottom: 24 }}>
                Your Perfect Trip,<br />
                Crafted by AI
              </h1>
              <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 560, marginBottom: 32 }}>
                Enter your destination, budget & days. Get a complete travel plan with hotel comparisons, transport options, and curated itinerary — all in seconds.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button onClick={() => navigate('/plan')} className="btn btn-gold" style={{ padding: '13px 22px' }}>
                  <Sparkles size={16} /> Plan My Trip
                </button>
                <button onClick={() => navigate('/register')} className="btn btn-outline" style={{ padding: '13px 22px' }}>
                  Create Free Account
                </button>
              </div>
            </div>

            <div className="home-transport" style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'stretch' }}>
              {transportOptions.map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', border: '1px solid var(--border)', borderRadius: 12, background: 'var(--surface)', color: 'var(--text-muted)', fontSize: 14 }}>
                  <span style={{ color: 'var(--text)' }}>{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '72px 0', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 12, fontWeight: 650, color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>Explore India</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, letterSpacing: '-0.03em' }}>Popular Destinations</h2>
          </div>
          <div className="home-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 20 }}>
            {destinations.map((dest) => (
              <button
                key={dest.name}
                type="button"
                onClick={() => navigate('/plan')}
                style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 22px', borderRadius: 14, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', textAlign: 'left', transition: 'transform 200ms ease, border-color 200ms ease' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = 'var(--text-muted)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                <span aria-hidden="true" style={{ fontSize: 28 }}>{dest.emoji}</span>
                <span>
                  <strong style={{ display: 'block', fontSize: 16, marginBottom: 2 }}>{dest.name}</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>{dest.tag}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '72px 0', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 12 }}>
              Everything You Need to Travel Smart
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 520 }}>From AI-powered planning to one-click booking — we handle every detail.</p>
          </div>
          <div className="home-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 20 }}>
            {features.map((feature) => (
              <div key={feature.title} className="glass-card" style={{ padding: 24 }}>
                <div style={{ color: 'var(--text-muted)', marginBottom: 18 }}>{feature.icon}</div>
                <h3 style={{ fontWeight: 650, fontSize: 16, marginBottom: 8 }}>{feature.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '72px 24px' }}>
        <div className="glass-card" style={{ maxWidth: 800, margin: '0 auto', padding: '40px 32px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 700, marginBottom: 12, letterSpacing: '-0.03em' }}>Ready to Start Your Journey?</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 16, marginBottom: 24 }}>Let AI plan your dream trip in under 60 seconds.</p>
          <button onClick={() => navigate('/plan')} className="btn btn-gold" style={{ padding: '13px 24px' }}>
            <Sparkles size={16} /> Plan My Trip Now
          </button>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '28px 24px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>© 2024 TripCraft — AI Travel Planner. Booking redirects powered by RedBus, RailYatri & MakeMyTrip.</p>
      </footer>
    </div>
  );
}
