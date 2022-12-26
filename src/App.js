import { FormControl, Input } from "@mui/material";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import "./App.css";
import db from "./firebase";
import Message from "./Message";
import FlipMove from "react-flip-move";
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';



function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) =>
      setMessages(
        snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
      )
    );
  }, []);

  useEffect(() => {
    setUsername(prompt("Please enter your name"));
  }, []);

  const sendMessage = async (event) => {
    event.preventDefault();

    await addDoc(collection(db, "messages"), {
      message: input,
      username: username,
      timestamp: serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="App">
      <h1>Messenger 🚀!</h1>
      <h2>Welcome {username}</h2>

      <form className="app__form">
        <FormControl className="app__formControl">
          <Input
            className="app__input"
            placeholder="Enter a message..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <IconButton 
            className="app__iconButton"
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
            >
              <SendIcon />
            </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
