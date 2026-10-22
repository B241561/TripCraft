export default function ItineraryTab({ itinerary }) {
  if (!itinerary?.length) return <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40 }}>No itinerary available.</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {itinerary.map((day, idx) => (
        <div key={day.day} style={{ display: 'flex', gap: 0, position: 'relative' }}>
          {/* Timeline line */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 20, flexShrink: 0, paddingTop: 4 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 12, color: 'var(--text)', flexShrink: 0, zIndex: 1 }}>
              {day.day}
            </div>
            {idx < itinerary.length - 1 && (
              <div style={{ width: 2, flex: 1, background: 'var(--border)', minHeight: 24, margin: '4px 0' }} />
            )}
          </div>

          {/* Content */}
          <div style={{ flex: 1, paddingBottom: 28 }}>
            <div style={{ marginBottom: 4 }}>
              <span style={{ fontSize: 10, fontFamily: 'monospace', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Day {day.day}</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{day.title}</h3>
            {day.theme && <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 8, border: '1px solid var(--border)', color: 'var(--text-muted)', fontWeight: 500, display: 'inline-block', marginBottom: 14 }}>{day.theme}</span>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {day.activities?.map((activity, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 14px', borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', fontSize: 14, lineHeight: 1.5, color: 'var(--text-muted)' }}>
                  <span aria-hidden="true" style={{ flexShrink: 0, color: 'var(--text-muted)', fontSize: 14 }}>—</span>
                  <span>{activity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
