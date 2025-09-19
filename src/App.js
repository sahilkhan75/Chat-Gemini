import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setQuestion("")
    if (!question.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post(
        "https://gemini-app-three-xi.vercel.app/getResponse",
        { question }
      );
      setResponse(res.data.response);

    } catch (err) {
      console.log(err);
      setResponse("Something went wrong. Try again!");
    }
    setLoading(false);
  };

  const speakHandler = () => {
    if (!response) return;
    const utterance = new SpeechSynthesisUtterance(response);
    utterance.lang = "en-US"; // you can change to "hi-IN" for Hindi, etc.
    window.speechSynthesis.speak(utterance);
  };


  return (
    <div className="App">
      {/* Chat window */}
      <div className="chat-box">
        {response ? (
          <div className="bot-response">{response}</div>
        ) : (
          <div className="placeholder">Ask me anything 👇</div>
        )}
        {loading && <div className="typing">Thinking...</div>}
      </div>

      {/* Input box */}
      <form className="input-box" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Type your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button type="submit">Send</button>
        <button type="button" onClick={speakHandler}>🔊</button>
      </form>
    </div>
  );
}

export default App;
