import { ExternalLink, Star, Hotel, MapPin, Check, Wifi, Coffee, Waves, Snowflake, Dumbbell, Car, Utensils, Wine, Flower2, ConciergeBell } from 'lucide-react';
import { formatCurrency } from '../../utils/bookingRedirects';

const amenityIcons = { 'Free WiFi': Wifi, 'Breakfast': Coffee, 'Pool': Waves, 'AC': Snowflake, 'Gym': Dumbbell, 'Parking': Car, 'Restaurant': Utensils, 'Bar': Wine, 'Spa': Flower2, 'Room Service': ConciergeBell };

export default function HotelsTab({ hotels, destination }) {
  if (!hotels?.length) return <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40 }}>No hotel data available.</p>;

  const badges = ['Best Budget Pick', 'Most Popular', 'Premium Choice'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 8 }}>
        Compare {hotels.length} hotel options in <strong style={{ color: 'var(--cream)' }}>{destination}</strong> — sorted from budget to premium.
      </p>

      {hotels.map((hotel, idx) => (
        <div
          key={idx}
          className="glass-card"
          style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}
        >
          {/* Popular badge */}
          {idx < 3 && (
            <div style={{ position: 'absolute', top: 16, right: 16, padding: '4px 8px', borderRadius: 8, background: 'var(--surface-hover)', border: '1px solid var(--border)', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.02em' }}>
              {badges[idx]}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
            {/* Hotel icon */}
            <div style={{ width: 48, height: 48, borderRadius: 10, background: 'var(--surface-hover)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', flexShrink: 0 }}>
              <Hotel size={22} />
            </div>

            {/* Hotel info */}
            <div style={{ flex: 1, minWidth: 200 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 700, marginBottom: 4 }}>{hotel.name}</h3>
              {hotel.area && <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5 }}><MapPin size={13} /> {hotel.area}</p>}

              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                <div style={{ display: 'flex', gap: 2 }}>
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={13} fill={s <= Math.round(hotel.rating) ? 'var(--text)' : 'none'} color={s <= Math.round(hotel.rating) ? 'var(--text)' : 'var(--border)'} />
                  ))}
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold)' }}>{hotel.rating?.toFixed(1)}</span>
              </div>

              {/* Amenities */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {hotel.amenities?.slice(0, 6).map(a => {
                  const Icon = amenityIcons[a] || Check;
                  return (
                  <span key={a} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, padding: '3px 8px', borderRadius: 8, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                    <Icon size={11} /> {a}
                  </span>
                  );
                })}
              </div>

              {hotel.highlight && (
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 10, fontStyle: 'italic' }}>
                  {hotel.highlight}
                </p>
              )}
            </div>

            {/* Price & Book */}
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block' }}>per night</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: 'var(--gold)' }}>{formatCurrency(hotel.pricePerNight)}</span>
              </div>
              {hotel.totalPrice && (
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 14 }}>Total: {formatCurrency(hotel.totalPrice)}</p>
              )}
              <a
                href={hotel.bookingUrl || `https://www.makemytrip.com/hotels/hotel-listing/?city=${encodeURIComponent(destination)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold"
                style={{ padding: '10px 18px', fontSize: 13, textDecoration: 'none', display: 'inline-flex' }}
              >
                Book on MakeMyTrip <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      ))}

    </div>
  );
}
