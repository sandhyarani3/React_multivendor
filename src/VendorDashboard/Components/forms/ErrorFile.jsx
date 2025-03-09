import React from 'react'
import {Link} from "react-router-dom"
const ErrorFile = () => {
  return (
    <div className='ErrorSection'>
      <h1>Error! 404</h1>
      <p>page not found</p>
      <Link to={"/"}>Go Back</Link>
    </div>
  )
}

export default ErrorFile
