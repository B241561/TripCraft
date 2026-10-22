export const getBookingURL = (mode, source, destination) => {
  const dest = encodeURIComponent(destination);
  const src = encodeURIComponent(source);
  const destSlug = destination.toLowerCase().replace(/\s+/g, '-');
  const srcSlug = source.toLowerCase().replace(/\s+/g, '-');

  const redirects = {
    bus: `https://www.redbus.in/bus-tickets/${srcSlug}-to-${destSlug}`,
    train: `https://www.railyatri.in/trains-between-stations?from_city=${src}&to_city=${dest}`,
    flight: `https://www.makemytrip.com/flights/domestic/results?tripType=O&itinerary=${src}-${dest}-${getTodayStr()}&paxType=A-1_C-0_I-0&cabinClass=E&sTime=1&forwardFlowRequired=true`,
    hotel: `https://www.makemytrip.com/hotels/hotel-listing/?city=${dest}&checkin=${getTodayStr()}&checkout=${getCheckoutStr()}&roomCount=1&adultsCount=2&childCount=0`,
    cab: `https://www.olacabs.com/?pickup=${src}&drop=${dest}`,
  };

  return redirects[mode] || 'https://www.makemytrip.com';
};

const getTodayStr = () => {
  const d = new Date();
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
};

const getCheckoutStr = () => {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
};

export const platformConfig = {
  redbus: { name: 'RedBus', color: 'var(--text)', bg: 'var(--surface-hover)' },
  railyatri: { name: 'RailYatri', color: 'var(--text)', bg: 'var(--surface-hover)' },
  makemytrip: { name: 'MakeMyTrip', color: 'var(--text)', bg: 'var(--surface-hover)' },
  olacabs: { name: 'Ola Cabs', color: 'var(--text)', bg: 'var(--surface-hover)' },
  irctc: { name: 'IRCTC', color: 'var(--text)', bg: 'var(--surface-hover)' },
};

// lucide-react icon names (the UI maps these to icon components)
export const transportIcons = {
  bus: 'Bus',
  train: 'Train',
  flight: 'Plane',
  cab: 'Car',
};

export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
