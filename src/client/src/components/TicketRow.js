import React from 'react'
import { Link } from 'react-router-dom'

function TicketRow({ticket}) {
  return (
    <Link className="ticket-row-link" to={"/ticket/" + ticket.id}>
      <div className="ticket-row">
        Ticket ID {ticket.id}: {ticket.subject}
      </div>
    </Link>
  )
}

export default TicketRow
