import { Col, Container, Form, Row, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";
import "./Signup.css";
import { useSignupMutation} from "../services/projectApi";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [signup, {error, isLoading, isError }] = useSignupMutation();

function handleSignup(e) {
    e.preventDefault();
    signup({ name, email, password });
}

  return (
    <Container>
        <Row>
            <Col 
                md={6} 
                className="signup-form-container">
                    
                <Form 
                style={{ width: "100%" }} 
                onSubmit={handleSignup}>
                    <h1>Create an Account</h1>

                    {isError && <Alert variant="danger">{error.data}</Alert>}

                    <Form.Group>
                        <Form.Label>
                            Name
                        </Form.Label>

                        <Form.Control 
                            type="text" 
                            placeholder="Name" 
                            value={name} 
                            required
                            onChange={(e)=> 
                                setName(e.target.value)}
                            
                        />
                    </Form.Group>

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
                            type="submit"
                            disabled={isLoading}>
                                Create New Account
                        </Button>

                    </Form.Group>
                    <p className="pt-3 text-center">
                        Already Have an Account?
                        <Link 
                            to="/login">
                                Back to Login
                        </Link>
                    </p>
                </Form>
            </Col>

            <Col 
            md={6} 
            className="signup-image-container">
            </Col>
        </Row>
    </Container>
  )
}

export default Signup