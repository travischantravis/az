import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

function TicketDetail() {
  const [ticket, setTicket] = useState()
  const [requester, setRequester] = useState()
  const [errorMsg, setErrorMsg] = useState("")
  const {id} = useParams()

  useEffect(() => {
    console.log(id);
    fetch(`/api/ticket?id=${id}`)
      .then(res => {
        // console.log("Ticket ",res.body);
        return res.json()
      })
      .then(json => {
        console.log(json);
        setTicket(json.ticket.ticket)
        setRequester(json.requester.user)
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
      {ticket && requester ? 
        <React.Fragment>
          <p>Ticket {id} Detail</p>
          <p>{ticket.subject}</p>
          <p>Requested by {requester.name}</p>
          <p>{ticket.description}</p>
        </React.Fragment>
        :
        <div>Loading...</div>
      }

      <Link to="/">Return to Home</Link>    
    </div>
  )
}

export default TicketDetail
