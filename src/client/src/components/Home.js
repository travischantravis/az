import React, {useState, useEffect} from 'react'
import TicketRow from './TicketRow'
import Error from "./Error";


function Home() {
  const [tickets, setTickets] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [curPageCount, setCurPageCount] = useState(0);
  const [errMsg, setErrorMsg] = useState("");
  

  useEffect(() => {
    fetch("/api/tickets")
      .then(res => {
        return res.json()
      })
      .then(json => {
        console.log("Zendesk", json);
        console.log("Ticket", json.tickets.tickets[0]);
        setTickets(json.tickets.tickets)
        setTotalCount(json.count.count.value)
        setCurPageCount(json.tickets.tickets.length)
        setErrorMsg("")
      })
      .catch(err=>{
        setErrorMsg(err)
      })


    // Specify how to clean up after this effect:
    return () => {};
  }, []);

  function onNextBtnClick(){

  }


  return (
    <div>
      {errMsg === "" ?  
        <div>
          <p>Total tickets: {totalCount}</p>
          <p>Tickets on this page: {curPageCount}</p>
          {tickets.map((ticket)=>{
            return <TicketRow key={ticket.id} ticket={ticket}/>          
          })}
          <button onClick={onNextBtnClick}>Prev Page</button>
          <button onClick={onNextBtnClick}>Next Page</button>
        </div>
      : 
        <Error errMsg={errMsg}/>}

      
    </div>
  )
}

export default Home
