import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [type, setType] = useState("joke");
 
  const getNewJoke = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://icanhazdadjoke.com/", {
        headers: {
          Accept: "application/json",
        },
      });
      const data = await response.json();
      console.log(data); 
      setText(data.joke);
      setType("joke");
    } catch (error) {
      setError("Try again please.");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getNewJoke();
  }, []);

 

  return (
    <>
      <h1> Jokes </h1>
      <div className="card">
        <div className="buttons">
          <button onClick={getNewJoke}>Get Joke</button>
        </div>
        {loading ? (
          <p className="text">Loading...</p>
        ) : (
          <p
            className="text"
            style={
              type === "joke" ? { color: "#61dafb" } : { color: "#428022" }
            }
          >
            {
              text
            }
          </p>
        )}
        {error ? <p className="error">{error}</p> : null}
      </div>
    </>
  );
}

export default App;