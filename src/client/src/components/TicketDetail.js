import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

function TicketDetail() {
  const [ticket, setTicket] = useState()
  const [requester, setRequester] = useState()
  const [errorMsg, setErrorMsg] = useState("")
  const {id} = useParams()

  useEffect(() => {
    fetch(`/api/ticket?id=${id}`)
      .then(res => {
        return res.json()
      })
      .then(json => {
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
    <div className="ticket-detail">
      {ticket && requester ? 
        <React.Fragment>
          <p>Subject: {ticket.subject}</p>
          <p>Requester: {requester.name}</p>
          <p>Status: {ticket.status}</p>
          <p>Created at: {(new Date(ticket.created_at)).toLocaleString()}</p>
          <p>Description: {ticket.description}</p>
        </React.Fragment>
        :
        <div>Loading...</div>
      }

      <Link to="/">Return to all tickets</Link>    
    </div>
  )
}

export default TicketDetail
