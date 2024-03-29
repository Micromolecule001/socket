// App.js
import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
    const [word, setWord] = useState('');
    const [wordList, setWordList] = useState([]);
    
    useEffect(() => {
        socket.on("current_wordList", (data) => {
            setWordList(data.list);
        });

        socket.on("receive_wordList", (data) => {
            setWordList(data.list);
        });

        socket.on("count_words_response", (data) => {
          console.log('word count: ', data.count);
        }) 

        socket.on("show_words_response", (data) => {
          console.log("show list: ", data.words)
        })

        return () => {
            socket.off("current_wordList");
            socket.off("receive_wordList");
        };
    }, []);

    const addWord = () => {
        if (word.trim() !== '') {
            socket.emit("send_word", { word: word });
            setWord('');
        }
    };

    const handleReset = () => {
        socket.emit("reset_words");
    };

    const handleShow = () => {
        socket.emit("show_words");
    };

    const handleCount = () => {
        socket.emit("count_words");
    };

    const handleDelete = (wordToDelete) => {
        socket.emit("delete_word", { word: wordToDelete });
    };

    return (
        <div className="App">
            <input
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder='Enter a word...'
            />
            <button onClick={addWord}>Send Word</button>

            <button onClick={handleReset}>Reset</button>
            <button onClick={handleShow}>Show</button>
            <button onClick={handleCount}>Count</button>

            <h3>Word List</h3>

            <ul>
                {wordList.map((word, index) => (
                      <li key={index}>
                        {word}
                        <button className='Delete' onClick={() => handleDelete(word)}>Delete</button>
                      </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
