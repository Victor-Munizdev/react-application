import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <h1>MyContacts - React + TSX + Vite</h1>
      <p>Este projeto está pronto para deploy no Cloudflare Pages.</p>

      <button onClick={() => setCount(count + 1)}>
        Contador: {count}
      </button>
    </div>
  );
}

export default App;
