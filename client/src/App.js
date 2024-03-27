import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = () => {
    socket.emit("send_message", { message: `${inputMessage}`});
  }

  const handleMessage = (e) => {
    setInputMessage(e.target.value);
  }

  useEffect(() => {
    socket.on("recive_message", (data) => {
      alert(data.message);
    })
  })

  return (
    <div className="App">
      <input onChange={handleMessage} placeholder='Message...'/>

      <button onClick={sendMessage}> Send Message </button>
    </div>
  );
}

export default App;
