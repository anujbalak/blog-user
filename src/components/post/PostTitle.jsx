import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchAuthor } from "../../requests/queries";

const PostTitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
`

const PostTitleText = styled.h2`
    font-size: 3rem;
    margin: 0;
    flex: 100%;
    text-align: left;
`
const PostAuthor = styled.span`
    font-style: italic;
    font-weight: 700;
`

const PostCreate = styled.span`
    font-style: italic;
`

export default function PostTitle ({authorid, date, title}) {
    const [author, setAuthor] = useState(null);
    useEffect(() => {
        const getUser = async () => {
            const user = await fetchAuthor(authorid)
            setAuthor(user);
       }
       getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const createdAt = new Date(date).toLocaleDateString()
    return (
        <PostTitleContainer>
            <PostTitleText>
                {title}
            </PostTitleText>
            <PostAuthor>
                {author ? author.username : 'Some Coolname Author'}
            </PostAuthor>        
            <PostCreate>
                {createdAt}
            </PostCreate>        
        </PostTitleContainer>
    )
}
