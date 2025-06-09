import { Link } from "react-router-dom"
import Header from "./Header"
import styled from "styled-components"

const ErrorPage = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 100vw;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
`

export default function Error() {
    return (
        <ErrorPage>
            You got an error, Return to <Link to="/">Homepage</Link>
        </ErrorPage>
        
    )
}
