import styled from "styled-components";
import { useSanitizedHtml } from "../../requests/sanitizeHtml";

const PostBodyContainer = styled.div`
    margin: 1em 0;
    text-align: left;
    font-size: 1.3rem;
`

export default function PostBody({text}) {

    const html = useSanitizedHtml(text);

    return (
        <PostBodyContainer dangerouslySetInnerHTML={{ __html: html}}>
        </PostBodyContainer>
    )
}