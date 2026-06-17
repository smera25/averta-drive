import styles from './SafetyTips.module.css';

const SafetyTips = () => {
  return (
    <div className={styles.tipsPageContainer}>
      
      {/* --- Title Section --- */}
      <div className={styles.titleBox}>
        <h1>Safety Tips</h1>
        <p>AI-generated tips for safer driving based on time, location, or user input.</p>
      </div>

      {/* --- Main Grid for Tips --- */}
      <div className={styles.tipsGrid}>

        {/* --- Column 1: Based on Time --- */}
        <div className={styles.categoryBox}>
          <h2>🕐 Based on Time</h2>
          
          <div className={styles.subCategory}>
            <h3>Daytime Driving</h3>
            <ul>
              <li>Always wear your seatbelt.</li>
              <li>Use sunglasses or visors to reduce glare.</li>
              <li>Maintain a safe distance from other vehicles.</li>
            </ul>
          </div>

          <div className={styles.subCategory}>
            <h3>Night Driving</h3>
            <ul>
              <li>Use headlights correctly — avoid high beams at close range.</li>
              <li>Drive slower; visibility is reduced.</li>
              <li>Stay alert and avoid driving when drowsy.</li>
            </ul>
          </div>

          <div className={styles.subCategory}>
            <h3>Rainy/Foggy Conditions</h3>
            <ul>
              <li>Turn on headlights (not high beams).</li>
              <li>Slow down and keep extra braking distance.</li>
              <li>Use wipers and defoggers properly.</li>
            </ul>
          </div>
        </div>

        {/* --- Column 2: Based on Location --- */}
        <div className={styles.categoryBox}>
          <h2>📍 Based on Location</h2>

          <div className={styles.subCategory}>
            <h3>City Driving</h3>
            <ul>
              <li>Follow signals and speed limits strictly.</li>
              <li>Watch out for pedestrians and two-wheelers.</li>
              <li>Use indicators before turns or lane changes.</li>
            </ul>
          </div>

          <div className={styles.subCategory}>
            <h3>Highway Driving</h3>
            <ul>
              <li>Maintain lane discipline and use mirrors before overtaking.</li>
              <li>Stick to speed limits and take breaks regularly.</li>
              <li>Keep emergency tools like a spare tire and first aid kit.</li>
            </ul>
          </div>

          <div className={styles.subCategory}>
            <h3>Hilly Roads</h3>
            <ul>
              <li>Use lower gears on slopes.</li>
              <li>Avoid overtaking on curves.</li>
              <li>Sound horn at blind turns.</li>
            </ul>
          </div>

          <div className={styles.subCategory}>
            <h3>Rural Areas</h3>
            <ul>
              <li>Watch for animals or pedestrians on roads.</li>
              <li>Drive slowly on uneven or narrow roads.</li>
              <li>Avoid overtaking on unmarked routes.</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SafetyTips;