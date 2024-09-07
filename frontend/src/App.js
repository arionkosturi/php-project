import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
function App() {
  const [email, setEmail] = useState();

  return (
    <div className="App">
      <form>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border"
          placeholder="Input"
        />
        <button>Login</button>
        <h1>Test</h1>
      </form>
    </div>
  );
}

export default App;
