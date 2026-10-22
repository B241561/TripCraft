import { describe, it, expect } from 'vitest';

import {
  getBookingURL,
  platformConfig,
  transportIcons,
  formatCurrency,
} from './bookingRedirects';

describe('TripCraft booking utilities', () => {

  it('generates the correct bus booking URL', () => {
    const url = getBookingURL('bus', 'Jaipur', 'Delhi');

    expect(url).toBe(
      'https://www.redbus.in/bus-tickets/jaipur-to-delhi'
    );
  });

  it('generates a train booking URL', () => {
    const url = getBookingURL('train', 'New Delhi', 'Jaipur');

    expect(url).toContain(
      'https://www.railyatri.in/trains-between-stations'
    );

    expect(url).toContain('from_city=New%20Delhi');
    expect(url).toContain('to_city=Jaipur');
  });

  it('generates a hotel booking URL', () => {
    const url = getBookingURL('hotel', 'Jaipur', 'Udaipur');

    expect(url).toContain(
      'https://www.makemytrip.com/hotels/hotel-listing/'
    );

    expect(url).toContain('city=Udaipur');
  });

  it('generates a flight booking URL', () => {
    const url = getBookingURL('flight', 'Jaipur', 'Mumbai');

    expect(url).toContain(
      'https://www.makemytrip.com/flights/domestic/results'
    );

    expect(url).toContain('itinerary=Jaipur-Mumbai-');
  });

  it('generates a cab booking URL', () => {
    const url = getBookingURL('cab', 'Jaipur', 'Delhi');

    expect(url).toContain('https://www.olacabs.com/');
    expect(url).toContain('pickup=Jaipur');
    expect(url).toContain('drop=Delhi');
  });

  it('uses MakeMyTrip as fallback for an unsupported mode', () => {
    const url = getBookingURL('unknown', 'Jaipur', 'Delhi');

    expect(url).toBe('https://www.makemytrip.com');
  });

  it('maps each transport mode to an icon name', () => {
    expect(transportIcons.bus).toBe('Bus');
    expect(transportIcons.train).toBe('Train');
    expect(transportIcons.flight).toBe('Plane');
    expect(transportIcons.cab).toBe('Car');
  });

  it('contains the configured booking platforms', () => {
    expect(platformConfig.redbus.name).toBe('RedBus');
    expect(platformConfig.railyatri.name).toBe('RailYatri');
    expect(platformConfig.makemytrip.name).toBe('MakeMyTrip');
    expect(platformConfig.olacabs.name).toBe('Ola Cabs');
  });

  it('formats currency in INR', () => {
    const formatted = formatCurrency(5000);

    expect(formatted).toContain('5,000');
  });

});
