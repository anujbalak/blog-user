import styled from "styled-components";
import Header from "../components/Header";
import { BACKEND_URL } from "../Root";
import Input from "../components/Input";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";

const SignupPageComponent = styled.div`
    display: grid;
    flex-direction: column;
    min-width: 100vw;
    min-height: 100vh
`
const SignupForm = styled.form`
    place-self: center;
    margin-bottom: 8em;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.3rem;
    color: #3a3a38;
    gap: 1.4em;
`

export const SubmitButton = styled.button`
    background-color: #d8cf9a;
    color: #5a5a56;
    transition: transform ease-in-out 0.2s;
    &:hover,&:focus  {
        outline: none;
        transform: scale(1.03)
    }
    width: 80%;
`
const AlternateLoginHint = styled.span`
    font-size: 1rem;
`

const SignupPage = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] =  useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const {user} = useOutletContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/', {replace: true});
        };
    });

    const handleSignup = async (e) => {
        e.preventDefault();
        const url = `${BACKEND_URL}signup`;
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password, email, confirmPassword})
        })
        .then(response => response.json())
        .then(response => console.log(response));
        return redirect('/')
    }
    
    return (
        <SignupPageComponent>
            <Header />
            <SignupForm method="post" action="/signup" onSubmit={handleSignup}>
                <span>
                    Register yourself here
                </span>
                <Input
                    name="username"
                    id="username"
                    type="text"
                    label="Username"
                    setUsername={setUsername}
                />
                <Input
                    name="email"
                    id="email"
                    type="email"
                    label="Email"
                    setEmail={setEmail}
                />
                <Input
                    name="password"
                    id="password"
                    type="password"
                    label="Password"
                    setPassword={setPassword}
                />
                <Input
                    name="confirmPassword"
                    id="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    setConfirmPassword={setConfirmPassword}
                />
                <SubmitButton type="submit">Sign Up</SubmitButton>
                <AlternateLoginHint>
                    Already has an account? <Link to="/login">Login</Link>
                </AlternateLoginHint>
            </SignupForm>
        </SignupPageComponent>
    )
}

export default SignupPage;