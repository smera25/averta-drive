import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation(); // Hook to get the current path

  useEffect(() => {
    const handleScroll = () => {
      // Trigger transparency slightly below the top
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Simple Menu Toggle Icon (replace with actual icons if available)
  const MenuIcon = () => <span>☰</span>;
  const CloseIcon = () => <span>✕</span>;

  // Function to determine if a link is active
  const isActive = (path) => location.pathname === path;

  // Define nav links with paths
  const navLinks = [
    { path: '/', name: 'Home' },
    { path: '/dashboard', name: 'Dashboard' },
    { path: '/ai-prediction', name: 'AI Prediction' },
    { path: '/map-insights', name: 'Accident Insights' },
    { path: '/safety-tips', name: 'Safety Tips' },
    { path: '/contact', name: 'Contact' },
    // Add other links based on your App.jsx routes if needed
    // { path: '/profile', name: 'Profile' },
    // { path: '/insights', name: 'Insights' },
    // etc.
  ];


  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`} aria-label="Main navigation">
      <div className={styles.container}>
        <div className={styles.logo}>
          {/* Link logo back to home */}
          <Link to="/">AvertaDrive</Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
           className={styles.mobileMenuToggle}
           onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
           aria-expanded={isMobileMenuOpen}
           aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        {/* Navigation Links - Desktop */}
        <ul className={`${styles.navLinks} ${styles.desktopOnly}`}>
          {navLinks.map(link => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={isActive(link.path) ? styles.activeLink : ''}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Navigation Links */}
         {isMobileMenuOpen && (
           <ul className={`${styles.navLinks} ${styles.mobileOnly}`}>
             {navLinks.map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={isActive(link.path) ? styles.activeLink : ''}
                    onClick={() => setMobileMenuOpen(false)} // Close menu on click
                  >
                    {link.name}
                  </Link>
                </li>
             ))}
           </ul>
         )}

      </div>
    </nav>
  );
};

export default Navbar;

