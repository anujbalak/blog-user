import styled from "styled-components";
import Header from "../components/Header";
import { BACKEND_URL } from "../Root";
import Input from "../components/Input";
import { Link, redirect, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

const LoginPageComponent = styled.div`
    display: grid;
    flex-direction: column;
    min-width: 100vw;
    min-height: 100vh
`
const LoginForm = styled.form`
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

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {user, setUser, setLoading} = useOutletContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/', {replace: true});
        }

    }, [user]);


    const handleLogin = async (e) => {
        setLoading(true);
        e.preventDefault();
        const url = `${BACKEND_URL}login`
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
            /* credentials: "include", */
            //mode: "same-origin"
        })
        .then(response => response.json())
        .then(response => {
            if (!response.user) {
                return console.log(response);
            }
            saveTokens(response.accessToken, response.refreshToken)
            return setUser(response.user);
        });
        setLoading(false)
    }

    return (
        <LoginPageComponent>
            <Header />
            <LoginForm method="post" action="/" onSubmit={handleLogin}>
                <span>
                    Login to comment on posts and for other features.
                </span>
                <Input
                    name="username"
                    id="username"
                    type="text"
                    label="Username"
                    value={username}
                    setUsername={setUsername}
                />
                <Input
                    name="password"
                    id="password"
                    type="password"
                    label="Password"
                    value={password}
                    setPassword={setPassword}
                />
                <SubmitButton type="submit">Login</SubmitButton>
                <AlternateLoginHint>
                    New here? <Link to="/signup">Sign Up</Link>
                </AlternateLoginHint>
            </LoginForm>
        </LoginPageComponent>
    )
}

const saveTokens = (accessToken, refreshToken) => {
    if (!accessToken || !refreshToken) {
        return;
    }
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    return;
}

export const loginLoader = () => {
    const { user} = useOutletContext()
    console.log(user);
    /* if (user) {
        return redirect('/')
    } */
}


export default LoginPage;