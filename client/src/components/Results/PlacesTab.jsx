import { Star, Clock, Ticket } from 'lucide-react';

const categoryEmoji = {
  'Heritage': '🏰', 'Temple': '🛕', 'Beach': '🏖️', 'Mountain': '🏔️', 'Market': '🛍️',
  'Museum': '🏛️', 'Park': '🌳', 'Lake': '🏞️', 'Fort': '🏯', 'Garden': '🌺',
  'Wildlife': '🦁', 'Waterfall': '💧', 'Palace': '👑', 'Church': '⛪', 'Mosque': '🕌',
};

export default function PlacesTab({ places }) {
  if (!places?.length) return <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40 }}>No places data available.</p>;

  return (
    <div>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24 }}>
        🗺️ Top {places.length} must-visit places — curated by AI based on popularity and traveller ratings.
      </p>

      <div className="home-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 20 }}>
        {places.map((place, idx) => {
          const emoji = categoryEmoji[place.category] || '📍';

          return (
            <div
              key={idx}
              className="glass-card"
              style={{ padding: 22, overflow: 'hidden', position: 'relative', transition: 'transform 0.2s ease, border-color 0.2s ease' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = 'var(--text-muted)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = 'var(--border)'; }}
            >
              {/* Rank badge */}
              <div style={{ position: 'absolute', top: 16, right: 16, minWidth: 28, height: 28, padding: '0 6px', borderRadius: 8, background: 'var(--surface-hover)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'var(--text-muted)' }}>
                {idx + 1}
              </div>

              {/* Must-see badge */}
              {place.mustSee && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 8, background: 'var(--surface-hover)', border: '1px solid var(--border)', fontSize: 10, color: 'var(--text-muted)', fontWeight: 650, marginBottom: 10, letterSpacing: '0.06em' }}>
                  ⭐ MUST VISIT
                </div>
              )}

              <div style={{ display: 'flex', gap: 14, marginBottom: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: 10, background: 'var(--surface-hover)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                  {emoji}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 2, color: 'var(--cream)', lineHeight: 1.3 }}>{place.name}</h3>
                  {place.category && (
                    <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 550 }}>{place.category}</span>
                  )}
                </div>
              </div>

              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 14 }}>{place.description}</p>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {place.entryFee && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text-muted)', padding: '4px 8px', borderRadius: 8, background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <Ticket size={11} /> {place.entryFee}
                  </div>
                )}
                {place.bestTime && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text-muted)', padding: '4px 8px', borderRadius: 8, background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <Clock size={11} /> {place.bestTime}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
