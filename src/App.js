import { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');

  console.log(input);

  return (
    <div className="App">
      <h1>Hello World 🚀!</h1>

      <input value = { input } onChange = { event => setInput(event.target.value)} />
      <button>Send Message</button>
    </div>
  );
}

export default App;
