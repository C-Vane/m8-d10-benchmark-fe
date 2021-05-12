import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Button, Form, Modal } from 'react-bootstrap';
import { PropsSignUp, User } from '../types/interfaces';
import { postFunction } from './CRUDFunctions';
import LogIn from './LogIn';

const SignUp = (props: PropsSignUp) => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [signUp, setSignUp] = useState(true);
    const [error, setError] = useState("");

    const register = (e: any) => {
        e.preventDefault();
        const userForm = {
            name,
            surname,
            email,
            password,
        }
        const user = postFunction("users/register", userForm)
        if (user) {
            props.setUser(user);
            props.setSignUp(false)
        } else {
            props.setUser(undefined);
            console.log(user);
        }
    }
    return <div>
        <Modal show={true} onHide={() => props.setSignUp(false)}>
            <Modal.Header closeButton>
                <Modal.Title><h4>{signUp ? "Welcome to our weather app" : "Welcome back"}</h4></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5 className="p-3 m-auto text-center"> Welcome to our app, {signUp ? "sign up" : "log in"} and get the weather of any city</h5>
                {signUp ? <div className="m-auto">
                    <Form onSubmit={register}>
                        {error.length > 0 && <Alert variant="danger">{error}</Alert>}
                        <Form.Group >
                            <Form.Label>Name</Form.Label>
                            <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" min="3" placeholder="Your name" required />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Surname</Form.Label>
                            <Form.Control value={surname} onChange={(e) => setSurname(e.target.value)} type="text" placeholder="Your surname or family name" required />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="name@example.com" required />
                        </Form.Group>
                        <div className="d-flex justify-content-between">
                            <Form.Group >
                                <Form.Label>Password</Form.Label>
                                <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" required />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} onBlur={() => password !== confirmPassword ? setError("Passwords are not the same!") : setError("")} type="password" placeholder="********" required />
                            </Form.Group>
                        </div>
                        <div className="my-3 d-flex justify-content-end">
                            <Button className="m-2" type="submit">Submit</Button>
                        </div>
                    </Form>
                </div> : <LogIn setUser={props.setUser} setSignUp={props.setSignUp} />
                }
                {signUp ? <div className="m-auto text-center"> Already have an account? <b className="text-success cursor-pointer" onClick={() => setSignUp(!signUp)}>Log In</b></div> : <div className="m-auto  text-center" > Don't Have an account? <b className="text-success text bolder cursor-pointer" onClick={() => setSignUp(!signUp)}>Sign Up</b></div>}
            </Modal.Body>
        </Modal >
    </div >
}

export default SignUp