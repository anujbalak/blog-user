import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useSanitizedHtml } from './post/PostBody'

const Card = styled.div`
    width: 80%;
    color: #383835;
`
const BlogTitleContainer = styled.div`
`

const BlogTitle = styled.h2`
    font-size: 3rem;
    margin: 0;
    &:hover {
        text-decoration: underline;
    }
`
const BlogTextContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
`

const BlogText = styled.div`
    font-size: 1.5rem;
    margin: 0;
`

const ReadMoreBtn = styled.button`
    place-self: end;
    background-color: #e2cb9f;
    color: #413a2d;
    padding: 5px;
`

export default function PostCard({post}) {

    const stringHtml = post.text.slice(0, 100)

    const html = useSanitizedHtml(stringHtml)

    return (
        <Link to={`/posts/${post.id}`} className='post'>
            <Card>
                <BlogTitleContainer>
                    <BlogTitle>
                        {post.title}
                    </BlogTitle>
                </BlogTitleContainer>
                <BlogTextContainer >
                    {(post.text.length < 100) ?
                        <BlogText dangerouslySetInnerHTML={{ __html: html}}>
                        </BlogText>
                    :
                        <>
                            <BlogText dangerouslySetInnerHTML={{ __html: html}}>
                            </BlogText>
                            <ReadMoreBtn>Read more</ReadMoreBtn>
                        </>
                    }
                </BlogTextContainer>
            </Card>
        </Link>
    )
};

