import { describe, expect, it } from 'vitest';
import { normalizeApiBaseUrl } from './api';

describe('normalizeApiBaseUrl', () => {
  it('expands a bare Render service host to its public hostname', () => {
    expect(normalizeApiBaseUrl('tripcraft-backend-qxji')).toBe(
      'https://tripcraft-backend-qxji.onrender.com/api',
    );
  });

  it('preserves a fully qualified backend URL', () => {
    expect(normalizeApiBaseUrl('https://api.example.com')).toBe(
      'https://api.example.com/api',
    );
  });

  it('normalizes a configured API path without duplicating it', () => {
    expect(normalizeApiBaseUrl('https://api.example.com/api/')).toBe(
      'https://api.example.com/api',
    );
  });

  it('preserves relative API routing and its default', () => {
    expect(normalizeApiBaseUrl('/api/')).toBe('/api');
    expect(normalizeApiBaseUrl(undefined)).toBe('/api');
  });

  it('preserves localhost development URLs', () => {
    expect(normalizeApiBaseUrl('http://localhost:5000')).toBe(
      'http://localhost:5000/api',
    );
  });
});
