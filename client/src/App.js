import React, { useState } from 'react'
import './App.scss'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

function App() {
  const [variables, setVariables] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  })

  const submitregisterForm = (e) => {
    e.preventDefault()

    console.log(variables);
  }

  return (
    <Container className='pt-5'>
      <Row className='bg-white py-5 justify-content-center'>
        <Col sm={8} md={6} lg={4}>
          <h1 className='text-center'>Register</h1>
          <Form onSubmit={submitregisterForm}>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={variables.email}
                onChange={(e) => setVariables({ ...variables, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>username</Form.Label>
              <Form.Control
                type="text"
                value={variables.username}
                onChange={(e) => setVariables({ ...variables, username: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={variables.password}
                onChange={(e) => setVariables({ ...variables, password: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                value={variables.confirmPassword}
                onChange={(e) => setVariables({ ...variables, confirmPassword: e.target.value })}
              />
            </Form.Group>
            <div className='text-center pt-3'>
              <Button variant="success" type="submit" className='btnRegister'>
                Register
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default App