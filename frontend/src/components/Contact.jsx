import styles from './Contact.module.css';

const Contact = () => {
  const emergencyContacts = [
    {
      category: "Accident / Emergency",
      helpline: "National Emergency Number",
      contact: "📞 112",
    },
    {
      category: "Ambulance",
      helpline: "Medical Emergency",
      contact: "🚑 108 or 102",
    },
    {
      category: "Police Assistance",
      helpline: "Traffic or accident reporting",
      contact: "👮 100",
    },
    {
      category: "Fire Brigade",
      helpline: "In case of vehicle fire",
      contact: "🔥 101",
    },
    {
      category: "Road Accident Helpline",
      helpline: "National Highways Authority of India (NHAI)",
      contact: "🗺️ 1033",
    },
    {
      category: "Women's Helpline",
      helpline: "For safety during travel",
      contact: "👧 1091",
    },
    {
      category: "Motor Vehicle Assistance",
      helpline: "(for breakdowns on highways)",
      contact: "🚗 Use NHAI helpline 1033 or local RTO numbers",
    },
  ];

  return (
    <div className={styles.contactPageContainer}>
      
      {/* --- Page Title and Description --- */}
      <div className={styles.header}>
        <h1>Emergency Contact Numbers (India)</h1>
        <p>Quick access to essential helplines for road safety and emergencies across India.</p>
      </div>

      {/* --- Emergency Contacts Table --- */}
      <div className={styles.tableContainer}>
        <table className={styles.emergencyTable}>
          <thead>
            <tr>
              <th>Category</th>
              <th>Helpline / Department</th>
              <th>Contact Number</th>
            </tr>
          </thead>
          <tbody>
            {emergencyContacts.map((item, index) => (
              <tr key={index}>
                <td>{item.category}</td>
                <td>{item.helpline}</td>
                <td>{item.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* You can add more contact information here later, e.g., a contact form */}
      <div className={styles.additionalContact}>
        <h2>Have Questions?</h2>
        <p>If you have non-emergency inquiries or feedback, please reach out to us:</p>
        <p>Email: <a href="mailto:support@avertadrive.com">support@avertadrive.com</a></p>
      </div>

    </div>
  );
};

export default Contact;