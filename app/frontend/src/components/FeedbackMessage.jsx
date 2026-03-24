function FeedbackMessage({ message, type = 'success' }) {
  if (!message) {
    return null;
  }

  return (
    <p className={type === 'error' ? 'error-text' : 'success-text'}>
      {message}
    </p>
  );
}

export default FeedbackMessage;
