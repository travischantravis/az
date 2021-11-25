import React, { useState, useEffect } from "react";
import logo from "./react-logo.svg";
import nodejsLogo from "./nodejs-logo.svg";
import "./App.css";
import Error from "./components/Error";
import Home from "./components/Home";

function App() {
  const [tickets, setTickets] = useState([]);
  const [ticketCount, setTicketCount] = useState(0);
  const [errMsg, setErrorMsg] = useState("");
  

  useEffect(() => {
    fetch("/api/tickets")
      .then(res => {
        // console.log("Zendesk",res.body);
        return res.json()
      })
      .then(json => {
        console.log("Zendesk", json);
        setTickets(json.tickets)
        setTicketCount(json.count)
        setErrorMsg("")
      })
      .catch(err=>{
        setErrorMsg(err)
      })


    // Specify how to clean up after this effect:
    return () => {};
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Zendesk Tickets Viewer</h1>
        <p>
          {/* {users.length ? users.join(", ") : "loading..."} */}
        </p>
      </header>
      <body>
        {errMsg == "" ? <Home tickets={tickets} totalCount={ticketCount}/> : <Error errMsg={errMsg}/>}

      </body>
    </div>
  );
}

export default App;
