import React, { useEffect, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { PropsLogIn } from '../types/interfaces';
import { postFunction } from './CRUDFunctions';

const LogIn = (props: PropsLogIn) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const logInUser = (e: any) => {
        e.preventDefault();
        const userForm = {
            email,
            password,
        }
        const user = postFunction("users/login", userForm)
        if (user) {
            props.setUser(user);
            props.setSignUp(false)
        } else {
            props.setUser(undefined);
            console.log(user);
        }
    }
    return <div className="m-auto">
        <Form onSubmit={logInUser}>
            {error.length > 0 && <Alert variant="danger">{error}</Alert>}
            <div className="w-75 m-auto">
                <Form.Group >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="name@example.com" required />
                </Form.Group>

                <Form.Group >
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" required />
                </Form.Group>
            </div>
            <div className="my-3 d-flex justify-content-end">
                <Button className="m-2" type="submit">Submit</Button>
            </div>
        </Form>
    </div>

}

export default LogIn