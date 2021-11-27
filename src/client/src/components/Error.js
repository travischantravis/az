import React from 'react'

function Error({errMsg}) {
  // console.log(errMsg);
  return (
    <div>
      <p>Oh no, something went wrong</p>
      <code>{errMsg.message}</code>
    </div>
  )
}

export default Error
