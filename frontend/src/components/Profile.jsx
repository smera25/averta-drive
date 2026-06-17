const Profile = () => {
  return (
    <div>
      <h1>Profile / Login</h1>
      <p>Optional user personalization or saving preferences.</p>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <label>Username: <input type="text" /></label>
        <label>Password: <input type="password" /></label>
        <button type="submit">Login</button>
      </form>
      <p>Save preferences for personalized alerts.</p>
    </div>
  );
};

export default Profile;