import React from 'react'
import TicketRow from './TicketRow'

function Home({tickets, totalCount}) {
  return (
    <div>
      <p>Total tickets: {totalCount}</p>
      <p>Tickets on this page: {totalCount}</p>
      {tickets.map((ticket)=>{
          return <TicketRow ticket={ticket}/>
      })}
    </div>
  )
}

export default Home
