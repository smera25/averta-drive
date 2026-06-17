const UserSafetyLog = () => {
  return (
    <div>
      <h1>User Safety Log</h1>
      <p>Users can log daily trips or near misses and track personal driving behavior.</p>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <label>Trip Date: <input type="date" /></label>
        <label>Description: <textarea placeholder="Describe the trip or near miss"></textarea></label>
        <button type="submit">Log Entry</button>
      </form>
      <p>Track your safety score over time.</p>
    </div>
  );
};

export default UserSafetyLog;