import { ExternalLink, Clock, Users, CheckCircle } from 'lucide-react';
import { formatCurrency, getBookingURL } from '../../utils/bookingRedirects';

const modeConfig = {
  bus:    { emoji: '🚌', label: 'Bus', platformName: 'RedBus' },
  train:  { emoji: '🚂', label: 'Train', platformName: 'RailYatri' },
  flight: { emoji: '✈️', label: 'Flight', platformName: 'MakeMyTrip' },
  cab:    { emoji: '🚖', label: 'Cab', platformName: 'Ola Cabs' },
};

export default function TransportTab({ transport, source, destination, numberOfPeople }) {
  if (!transport?.length) return <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40 }}>No transport data available.</p>;

  // Sort by cost
  const sorted = [...transport].sort((a, b) => a.totalCost - b.totalCost);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 8 }}>
        🗺️ Compare transport options from <strong style={{ color: 'var(--cream)' }}>{source}</strong> to <strong style={{ color: 'var(--cream)' }}>{destination}</strong> for {numberOfPeople} {numberOfPeople === 1 ? 'person' : 'people'}
      </p>

      {/* Comparison bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12, marginBottom: 8 }}>
        {sorted.map((t, idx) => {
          const cfg = modeConfig[t.mode?.toLowerCase()] || modeConfig.bus;
          const maxCost = Math.max(...sorted.map(x => x.totalCost || 1));
          const pct = Math.round(((t.totalCost || 0) / maxCost) * 100);
          return (
            <div key={idx} style={{ padding: '14px 16px', borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--border)', textAlign: 'center' }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>{cfg.emoji}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{formatCurrency(t.totalCost)}</div>
              <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 2 }}>{cfg.label}</div>
              <div style={{ height: 3, background: 'var(--border)', borderRadius: 2, marginTop: 8, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, background: 'var(--text-muted)', borderRadius: 2, transition: 'width 200ms ease' }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Transport Cards */}
      {sorted.map((t, idx) => {
        const cfg = modeConfig[t.mode?.toLowerCase()] || modeConfig.bus;
        const bookUrl = t.bookingUrl || getBookingURL(t.mode?.toLowerCase(), source, destination);

        return (
          <div
            key={idx}
            className="glass-card"
            style={{ padding: '24px' }}
          >
            {idx === 0 && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 8px', borderRadius: 8, background: 'var(--surface-hover)', border: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: 11, fontWeight: 600, marginBottom: 14, letterSpacing: '0.02em' }}>
                🏆 Cheapest Option
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
              {/* Mode icon */}
              <div style={{ width: 48, height: 48, borderRadius: 10, background: 'var(--surface-hover)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
                {cfg.emoji}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 700 }}>{t.provider || cfg.label}</h3>
                  <span style={{ padding: '3px 8px', borderRadius: 8, background: 'var(--surface-hover)', color: 'var(--text-muted)', border: '1px solid var(--border)', fontSize: 12, fontWeight: 500 }}>via {cfg.platformName}</span>
                </div>

                <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: 'var(--text-muted)' }}>
                    <Clock size={13} /> {t.duration}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: 'var(--text-muted)' }}>
                    <Users size={13} /> ₹{(t.estimatedCostPerPerson || 0).toLocaleString('en-IN')}/person
                  </div>
                </div>

                {t.departureInfo && (
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 10, fontStyle: 'italic' }}>ℹ️ {t.departureInfo}</p>
                )}

                {t.pros?.length > 0 && (
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {t.pros.map((pro, i) => (
                      <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-muted)', padding: '3px 8px', borderRadius: 8, background: 'var(--surface-hover)', border: '1px solid var(--border)' }}>
                        <CheckCircle size={11} /> {pro}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Price & CTA */}
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block' }}>total for {numberOfPeople} people</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--text)' }}>{formatCurrency(t.totalCost)}</span>
                </div>
                <a
                  href={bookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{ padding: '9px 14px', fontSize: 13, marginTop: 8 }}
                >
                  Book on {cfg.platformName} <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </div>
        );
      })}

    </div>
  );
}
