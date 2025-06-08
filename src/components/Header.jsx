import styled from 'styled-components'
import Button from './Button'
import { Link, useOutletContext } from 'react-router-dom'

const HeaderComponent = styled.header`
    display: flex;
    height: fit-content;
    gap: 1em;
    justify-content: space-between;
    margin: 0 10px;
    flex-wrap: wrap;
`

const Title = styled.h1`
    font-size: rem;
    color: dodgerblue;
`
const HeaderBtnsContainer = styled.div`
    display: flex;
    align-items: center;
    row-gap: 10px;
    column-gap: 8px;
    flex-wrap: wrap;
`
const AccountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-right: 2em;
`

const Header = ({account}) => {
    const {user} = useOutletContext()

    return (
        <HeaderComponent className="header">
            <div className="title-container">
                <Title>
                    <Link to="/" className='title'> 
                        Blog App
                    </Link>
                </Title>
            </div>
            {!account && Boolean(user) === true ?
                <AccountContainer>
                    <Link to="/account">
                        <img src="/icons/account.svg" alt="" />
                    </Link>
                </AccountContainer>
            : !account && Boolean(user) === false &&
                <HeaderBtnsContainer>
                    <Button name="Login" path="login"/>
                    <Button name="Signup" path="signup"/>
                </HeaderBtnsContainer>
            }
        </HeaderComponent>
    )
}

export default Header;