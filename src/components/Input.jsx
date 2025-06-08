import { useRef, useState } from "react";
import styled from "styled-components";
import eyeIcon from '/icons/eye.svg'
import eyeCloseIcon from '/icons/eye-closed.svg'


export const InputContainer = styled.section`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    text-align: left;
    align-items: flex-end;
`

const Label = styled.label`
    
`
export const InputComponent = styled.input`
    all: unset;
    background-color:transparent;
    border: none;;
    padding-left: 5px;
    border-bottom: dotted 3px #d0d1cc;
    &:focus, &:hover {
        border-color: #3b3b3a;
    }
`
const Img = styled.img`
    
`

export default function Input(props) {
    const [passwordType, setPasswordType] = useState('password')
    const [imgSource, setImgSource] = useState(eyeIcon);

    const handleShowPassword = () => {
        if (passwordType === 'password') {
            setPasswordType('text')
            setImgSource(eyeCloseIcon)
        } else {
            setPasswordType('password')
            setImgSource(eyeIcon)
        }
    }
    return (
        <>
            <InputContainer>
                <Label htmlFor={props.id}>{props.label}:</Label>
                {props.id === 'username' ?
                    <InputComponent 
                        type={props.type}
                        name={props.name}
                        id={props.id}
                        defaultValue={props.value}
                        onChange={(e) => props.setUsername(e.target.value)}
                    />
                : (props.id === 'password') ?
                    <>
                        <InputComponent 
                            type={passwordType}
                            name={props.name}
                            id={props.id}
                            defaultValue={props.value}
                            onChange={(e) => props.setPassword(e.target.value)}
                        />
                        <Img src={imgSource} alt="" onClick={handleShowPassword}/>
                    </>
                :   (props.id === 'email') ?
                    <InputComponent 
                        type={props.type}
                        name={props.name}
                        id={props.id}
                        defaultValue={props.value}
                        onChange={(e) => props.setEmail(e.target.value)}
                    />
                :   (props.id === 'confirmPassword') ?
                    <>
                        <InputComponent 
                            type={passwordType}
                            name={props.name}
                            id={props.id}
                            defaultValue={props.value}
                            onChange={(e) => props.setConfirmPassword(e.target.value)}
                        />
                        <Img src={imgSource} alt="" onClick={handleShowPassword}/>
                    </>
                :   (props.id === 'oldPassword') ?
                    <>
                        <InputComponent 
                            type={passwordType}
                            name={props.name}
                            id={props.id}
                            defaultValue={props.value}
                            onChange={(e) => props.setOldPassword(e.target.value)}
                        />
                        <Img src={imgSource} alt="" onClick={handleShowPassword}/>
                    </>
                :
                    <InputComponent 
                        type={props.type}
                        name={props.name}
                        id={props.id}
                        defaultValue={props.value}
                    />
                }
            </InputContainer>
        </>
    )
}