import React from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {
  return (
    <div className='text-center mt-10 '>
      <Link to="/createTodo">
        Admin page
      </Link>

    </div>
  )
}

export default Profile