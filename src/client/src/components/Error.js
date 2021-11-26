import React from 'react'

function Error({errMsg}) {
  console.log(errMsg);
  return (
    <div>
      Oh no, something went wrong
      {/* <code>{errMsg}</code> */}
    </div>
  )
}

export default Error
