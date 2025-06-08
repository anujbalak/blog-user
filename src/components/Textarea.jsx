import styled from "styled-components";
import TextareaAutosize from 'react-textarea-autosize'

export const Textarea = ({id, name, text, setText}) => {
    return (
        <TextareaAutosize 
         name={name}
         className="textarea"
         defaultValue={text}
         id={id}
         onChange={(e) => setText(e.target.value)}
        />
    )
}