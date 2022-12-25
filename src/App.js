import { Button, FormControl, Input, InputLabel } from '@mui/material';
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import './App.css';
import db from './firebase';
import Message from './Message';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", 'desc'))
    onSnapshot(q , (snapshot) => 
      setMessages(snapshot.docs.map((doc) => doc.data()))
    );
  }, [])
  
  useEffect(() => {
    setUsername(prompt('Please enter your name'));
  }, [])
  
  const sendMessage = async (event) => {
    event.preventDefault();

    await addDoc(collection(db, "messages"), {
      message: input,
      username: username,
      timestamp: serverTimestamp()
    });

    setInput('');
  }

  return (
    <div className="App">
      <h1>Hello World 🚀!</h1>
      <h2>Welcome {username}</h2>

      <form>
        <FormControl>
          <InputLabel>Enter a message...</InputLabel>
          <Input value = { input } onChange = { event => setInput(event.target.value)} />
          <Button disabled = {!input} variant = "contained" color = "primary" type = 'submit' onClick = { sendMessage }>Send Message</Button>
        </FormControl>

      </form>

      {
        messages.map(message => (
          <Message username = {username} message = {message} />
        ))
      }

    </div>
  );
}

export default App;
