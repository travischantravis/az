import React, {useState, useEffect} from 'react'
import TicketRow from './TicketRow'
import Error from "./Error";


function Home() {
  const [tickets, setTickets] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [errMsg, setErrorMsg] = useState("");
  

  useEffect(() => {
    fetch("/api/tickets")
      .then(res => {
        // console.log("Zendesk",res.body);
        return res.json()
      })
      .then(json => {
        console.log("Zendesk", json);
        console.log("Ticket", json.tickets[0]);
        setTickets(json.tickets)
        setTotalCount(json.count)
        setErrorMsg("")
      })
      .catch(err=>{
        setErrorMsg(err)
      })


    // Specify how to clean up after this effect:
    return () => {};
  }, []);


  return (
    <div>
      {errMsg === "" ?  
        <div>
          <p>Total tickets: {totalCount}</p>
          <p>Tickets on this page: {totalCount}</p>
          {tickets.map((ticket)=>{
            return <TicketRow key={ticket.id} ticket={ticket}/>          
          })}
        </div>
      : 
        <Error errMsg={errMsg}/>}

      
    </div>
  )
}

export default Home
