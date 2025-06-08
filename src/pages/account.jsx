import { useNavigate, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import Input from "../components/Input";
import { logout, updateEmail, updatePassword, updateUsername } from "../requests/queries";

const AccountPage = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 100vw;
    min-height: 100vh;
`
const AccountBody = styled.section`
    display: grid;
    gap: 1em;
`
const Section = styled.section`
    margin: 0 5%;
`
const Form = styled.form`
    display: flex;
    align-items: baseline;
    column-gap: 2em;
    row-gap: 10px;
    flex-wrap: wrap;
    font-size: 1.2rem;
`

export default function Account () {
    const navigate = useNavigate();
    const {user, setUser, setLoading} = useOutletContext();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] =  useState('');
    const [oldPassword, setOldPassword] =  useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/', {replace: true});
        } else if (user) {
            setUsername(user.username);
            setEmail(user.email)
        }
    }, [user])

    const handleUsername = async (e) => {
        setLoading(true)
        e.preventDefault();
        const update = await updateUsername(user.id, username)
        console.log(update)
        setLoading(false)
    }

    const handleEmail = async (e) => {
        setLoading(true)
        e.preventDefault();
        const update = await updateEmail(user.id, email)
        console.log(update)
        setLoading(false)
    }

    const handlePassword = async (e) => {
        setLoading(true)
        e.preventDefault();
        const update = await updatePassword(user.id, oldPassword, password, confirmPassword, username)
        console.log(update)
        setPassword('')
        setConfirmPassword('')
        setOldPassword('');
        setLoading(false)
    }

    const handleLogout = async (e) => {
        setLoading(true)
        e.preventDefault()
        const accessToken = localStorage.removeItem('accessToken');
        const refreshToken = localStorage.removeItem('refreshToken');

        const data = await logout(accessToken, refreshToken)
        if (data) {
            setUser(data.user)
        }
        setLoading(false)
    }

    return (
        <AccountPage>
            <Header account/>
            <AccountBody>
                {user &&
                    <>
                    <Section>
                        <Form onSubmit={handleUsername}>
                            <Input
                                type="text"
                                name="username"
                                label="Username"
                                value={user.username}
                                id="username"
                                setUsername={setUsername}
                            />
                            <button type="submit">Change</button>
                        </Form>
                    </Section>
                    <Section>
                        <Form onSubmit={handleEmail}>
                            <Input
                                type="text"
                                name="email"
                                label="Email"
                                value={user.email}
                                id="email"
                                setEmail={setEmail}
                            />
                            <button type="submit" className="normal">Change</button>
                        </Form>
                    </Section>
                    <Section>
                        <Form onSubmit={handlePassword}>
                            <Input 
                                type="password"
                                name="oldPassword"
                                label="Enter current password"
                                id="oldPassword"
                                value={oldPassword}
                                setOldPassword={setOldPassword}
                            />
                            <Input 
                                type="password"
                                name="password"
                                label="Enter new password"
                                id="password"
                                value={password}
                                setPassword={setPassword}
                            />
                            <Input 
                                type="password"
                                name="confirmPassword"
                                label="Confirm new password"
                                id="confirmPassword"
                                value={confirmPassword}
                                setConfirmPassword={setConfirmPassword}
                            />
                            <button type="submit" className="normal">Change</button>
                        </Form>
                    </Section>
                    <Section>
                        <Form onSubmit={handleLogout}>
                            <button type="submit">Log-out</button>
                        </Form>
                    </Section>
                    </>
                }
            </AccountBody>
        </AccountPage>
    )
}