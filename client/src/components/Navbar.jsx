import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Compass, Map, LogOut, LogIn, Menu, X, Sparkles, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  const handleLogout = () => { logout(); navigate('/'); };

  const toggleTheme = () => {
    const nextIsDark = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', nextIsDark);
    setIsDark(nextIsDark);
    try {
      localStorage.setItem('tripcraft-theme', nextIsDark ? 'dark' : 'light');
    } catch {
      // The theme remains active for this page even when storage is unavailable.
    }
  };

  const navLinkStyle = (active) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '8px 12px',
    borderRadius: 8,
    color: active ? 'var(--text)' : 'var(--text-muted)',
    fontSize: 14,
    fontWeight: 500,
    background: active ? 'var(--surface-hover)' : 'transparent',
  });

  return (
    <nav className="site-nav" style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: '0 24px',
      background: 'var(--bg)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="brand-mark">
            <Compass size={20} strokeWidth={2} />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, letterSpacing: '-0.03em' }}>
            TripCraft
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="desktop-nav">
          <Link to="/plan" style={navLinkStyle(location.pathname === '/plan')}>
            <Sparkles size={15} /> Plan Trip
          </Link>
          {user && (
            <Link to="/my-trips" style={navLinkStyle(location.pathname === '/my-trips')}>
              <Map size={15} /> My Trips
            </Link>
          )}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 8 }}>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{user.name}</span>
              <button onClick={handleLogout} className="btn btn-ghost" style={{ padding: '7px 12px', fontSize: 13 }}>
                <LogOut size={14} /> Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 8, marginLeft: 8 }}>
              <Link to="/login" className="btn btn-ghost" style={{ padding: '7px 12px', fontSize: 13 }}>
                <LogIn size={14} /> Login
              </Link>
              <Link to="/register" className="btn btn-gold" style={{ padding: '7px 12px', fontSize: 13 }}>
                Get Started
              </Link>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            type="button"
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="mobile-menu-btn"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/plan" onClick={() => setMenuOpen(false)}>Plan Trip</Link>
          {user && <Link to="/my-trips" onClick={() => setMenuOpen(false)}>My Trips</Link>}
          {user ? (
            <button onClick={() => { handleLogout(); setMenuOpen(false); }}>Logout</button>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}

      <style>{`
        .brand-mark { width: 36px; height: 36px; border-radius: 10px; background: var(--text); color: var(--bg); display: flex; align-items: center; justify-content: center; }
        .theme-toggle, .mobile-menu-btn { width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border); border-radius: 9px; background: var(--bg); color: var(--text); }
        .mobile-menu-btn { display: none; }
        .mobile-menu { display: flex; flex-direction: column; gap: 4px; padding: 12px 0 16px; border-top: 1px solid var(--border); }
        .mobile-menu a, .mobile-menu button { padding: 10px 12px; border: 0; border-radius: 8px; background: transparent; color: var(--text); text-align: left; font: inherit; }
        .mobile-menu a:hover, .mobile-menu button:hover { background: var(--surface-hover); text-decoration: none; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex; }
          .site-nav { padding-inline: 24px !important; }
        }
      `}</style>
    </nav>
  );
}
