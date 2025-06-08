import { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom'
import styled from 'styled-components';
import { Momentum } from 'ldrs/react';
import 'ldrs/react/Momentum.css'

export const BACKEND_URL = "http://localhost:8000/"

const LoadingDialog = styled.dialog`
    background-color: transparent;
    border: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1em;
    width: 100%;
    height: 100%;
    background-color: rgba(238, 236, 225, 80%);
`

const LoadingText = styled.span`
    color: #20201f;
    font-size: 2rem;
    font-weight: 600;
`

export default function Root() {
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const refreshToken = localStorage.getItem('refreshToken');
    useEffect(() => {
        if (refreshToken) {
            fetch(`${BACKEND_URL}refresh`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                }
            })
            .then(res => res.json())
            .then(res => {
                setUser(res.user)
                localStorage.setItem('accessToken', res.accessToken)
                return
            })
            .catch(err => console.error(err))
        }
    }, [refreshToken])

    useEffect(() => {
        fetch(`${BACKEND_URL}posts`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            return setPosts(data)
        })
        .catch(e => console.error(e));
    }, [])
    return (
        <>
            {loading &&
                <LoadingDialog open>
                    <Momentum size={80} color='#0066da'/>
                    <LoadingText>Loading</LoadingText>
                </LoadingDialog>
            }
            <Outlet 
                context={{posts, user, setUser, setLoading}}
            />
        </>
    )
}