import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
function App() {
  const [email, setEmail] = useState();
  // axios
  //   .post("/login", {
  //     firstName: "Fred",
  //     lastName: "Flintstone",
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
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
