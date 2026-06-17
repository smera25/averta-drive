import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <h1>Empowering Safe Roads through Data and AI 🚦</h1>
        <p>Drive Smart. Drive Safe.</p>
        <button className={styles.ctaButton}>Start Predicting</button>
        <div className={styles.stats}>
          <p>Accidents reduced by 20% this year</p>
          <p>Real-time safety alerts</p>
          <p>AI-powered insights available 24/7</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;