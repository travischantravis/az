import React from 'react'

function Error({errMsg}) {
  return (
    <div>
      Oh noes, something went wrong
      <code>{errMsg}</code>
    </div>
  )
}

export default Error
