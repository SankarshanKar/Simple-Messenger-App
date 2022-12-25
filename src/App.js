import { Button, FormControl, Input, InputLabel } from '@mui/material';
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import './App.css';
import db from './firebase';
import Message from './Message';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  // useEffect(() => {
	// 	db.collection('messages').onSnapshot(snapshot => {
	// 		setMessages(snapshot.docs.map(doc => doc.data()))
	// 	})
  // }, [])

  useEffect(() => {
    onSnapshot(collection(db, "messages"), (snapshot) => 
      setMessages(snapshot.docs.map((doc) => doc.data()))
    );
  }, [])
  
  useEffect(() => {
    setUsername(prompt('Please enter your name'));
  }, [])
  
  const sendMessage = (event) => {
    event.preventDefault();
    setMessages([...messages, {username: username, message: input}]);
    setInput('');
  }

  return (
    <div className="App">
      <h1>Hello World 🚀!</h1>
      <h2>Welcome {username}</h2>

      <form>
        <FormControl>
          <InputLabel>Email a message...</InputLabel>
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
