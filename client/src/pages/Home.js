import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthDispatch } from '../context/auth'

export default function Home() {
  const dispatch = useAuthDispatch()
  const navigate = useNavigate()

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/login')
  }

  return (
    <Row className='bg-white justify-content-around mb-1'>
      <Link to='/login'>
        <Button variant='link'>Login</Button>
      </Link>
      <Link to='/register'>
        <Button variant='link'>Register</Button>
      </Link>
      <Button variant='link' onClick={logout}>Logout</Button>
    </Row>
  )
}
