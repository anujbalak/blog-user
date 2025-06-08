import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import DOMPurify from 'dompurify'

const PostBodyContainer = styled.div`
    margin: 1em 0;
    text-align: left;
    font-size: 1.3rem;
`

const PostText = styled.p`
`

export const useSanitizedHtml = (htmlString) => {
    return DOMPurify.sanitize(htmlString);
}

export default function PostBody({text}) {

    const html = useSanitizedHtml(text);

    return (
        <PostBodyContainer dangerouslySetInnerHTML={{ __html: html}}>
        </PostBodyContainer>
    )
}