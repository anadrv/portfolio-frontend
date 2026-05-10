function showFeedback(
  setMessage,
  message,
  duration = 3000
) {
  setMessage(message);

  setTimeout(() => {
    setMessage("");
  }, duration);
}

export default showFeedback;