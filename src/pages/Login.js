import { Col, Container, Form, Row, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";
import { useLoginMutation } from "../services/projectApi";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, { isError, isLoading, error }] = useLoginMutation();

    function handleLogin(e) {
        e.preventDefault();
        login({ email, password });
    }
  return (
    <Container>
        <Row>
            <Col 
                md={6} 
                className="login-form-container">

                <Form 
                style={{ width: "100%" }} 
                onSubmit={handleLogin}>
                    <h1>Login to Account</h1>
                    {isError && <Alert variant="danger">{error.data}</Alert>}
                    <Form.Group>
                        <Form.Label>
                            Email Address
                        </Form.Label>

                        <Form.Control 
                            type="email" 
                            placeholder="Enter Email" 
                            value={email} 
                            required
                            onChange={(e)=> 
                                setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            Password
                        </Form.Label>

                        <Form.Control 
                            type="password" 
                            placeholder="Enter Password" 
                            value={password} 
                            required 
                            onChange={(e)=>
                            setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Button 
                            type="submit" disable={isLoading}>
                                Login
                        </Button>
                    </Form.Group>
                    <p>
                        No Account?
                        <Link 
                            to="/signup">
                                Create
                        </Link>
                    </p>
                </Form>
            </Col>

            <Col 
            md={6} 
            className="login-image-container">
            </Col>
        </Row>
    </Container>
  )
}

export default Login