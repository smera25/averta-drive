const Feedback = () => {
  return (
    <div>
      <h1>Feedback</h1>
      <p>Collect feedback on AI predictions or safety improvements.</p>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <label>Your Feedback: <textarea placeholder="Share your thoughts"></textarea></label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Feedback;