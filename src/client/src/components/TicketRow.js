import React from 'react'
import { Link } from 'react-router-dom'

function TicketRow({ticket}) {
  return (
    <Link to={"/ticket/" + ticket.id}>
      <div>
        {ticket.subject}
      </div>
    </Link>
  )
}

export default TicketRow
