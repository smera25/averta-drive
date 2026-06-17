import styles from './Footer.module.css';
// --- 1. IMPORT THE ICONS ---
import { FaLinkedin, FaGithub, FaXTwitter } from 'react-icons/fa6'; // Using 'fa6' for the latest icons

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        
        {/* --- Section 1: Brand & Mission --- */}
        <div className={styles.footerSection}>
          <h3 className={styles.logo}>Averta Drive</h3>
          <p>
            Leveraging AI to predict road accident severity and 
            promote safer driving habits across India.
          </p>
        </div>

        {/* --- Section 2: Contact --- */}
        <div className={styles.footerSection}>
          <h4>Contact Us</h4>
          <p>
            <a href="mailto:support@avertadrive.com">
              support@avertadrive.com
            </a>
            <p>+91 9988775628</p>
          </p>
          
          {/* --- 2. ADD THE SOCIAL ICONS --- */}
          <div className={styles.socialIcons}>
            <a 
              href="https://www.linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a 
              href="https://www.github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a 
              href="https://www.twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="X (formerly Twitter)"
            >
              <FaXTwitter />
            </a>
          </div>
          {/* --- End of Social Icons --- */}

        </div>
        
      </div>
      
      {/* --- Bottom Bar for Copyright --- */}
      <div className={styles.footerBottom}>
        <p>&copy; 2025 Averta Drive. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;