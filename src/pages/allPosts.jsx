import styled from 'styled-components'
import Header from '../components/Header'
import { useOutletContext } from 'react-router-dom'
import PostCard from '../components/postCard'

const PostsPage = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 100vw;
    min-height: 100vh;
`
export const PostsContainer = styled.div`
    display: grid;
    gap: 4em;
    margin-top: 2em;
`

export default function Posts() {
    const { posts } = useOutletContext();

    return (
        <PostsPage>
            <Header />
            <PostsContainer>
                {
                    posts.map(
                        post => <PostCard post={post} key={post.id}/>
                    )
                }
            </PostsContainer>
        </PostsPage>
    )
}