import React, { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [counter, setCounter] = useState(0);
  const [prizes, setPrizes] = useState(0);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    axios
      .get("https://cookieclickerbackend.onrender.com/api/user")
      .then((res) => {
        setCounter(res.data.counter);
        setPrizes(res.data.prizes);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleClick = () => {
    axios
      .post("https://cookieclickerbackend.onrender.com/api/click")
      .then((res) => {
        setCounter(res.data.counter);
        setPrizes(res.data.prizes);
        setNotification(res.data.message);
        setTimeout(() => setNotification(""), 3000);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div>
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
            onClick={handleClick}
          >
            Click Me!
          </button>
        </div>
        <div className="items-center">
          <p className="mt-4 text-xl">Score: {counter}</p>
          <p className="text-lg">Prizes Won: {prizes}</p>
        </div>
        {notification && (
          <div className="mt-2 p-2 bg-green-200 text-green-800 rounded-full">
            {notification}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
