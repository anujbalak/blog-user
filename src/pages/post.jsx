import styled from "styled-components";
import Header from "../components/Header";
import { BACKEND_URL } from "../Root";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Orbit, BouncyArc } from "ldrs/react";
import 'ldrs/react/Orbit.css'
import 'ldrs/react/BouncyArc.css'

import { LoadingContainer, LoadingText } from "./home";
import PostTitle from "../components/post/PostTitle";
import PostBody from "../components/post/PostBody";
import PostComments from "../components/post/PostComments";


const PostPage = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 100vw;
    min-height: 100vh;
`

const PostContainer = styled.div`
    display: grid;
    margin: 0 1em;
    max-width: 1500px;
    width: 95%;
    align-self: center;
`

const DividerLine = styled.hr`
    background-color: currentColor;
    width: 100%;
    margin-top: 2em;
`

const LoadingDialog = styled.dialog`
    
`

export default function Post() {
    let params = useParams()
    const [post, setPost] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
       const getPost = async () => {
            const newPost = await fetchPost(params.postid)
            setPost(newPost);
       }
       getPost()
    }, [params.postid])

    return (
        <PostPage className="post-page">
            {loading &&
                <LoadingDialog>
                    <BouncyArc size="100"/>
                </LoadingDialog>
            }
            <Header/>
            {Boolean(post) === true ?
                <PostContainer>
                    <PostTitle
                        authorid={post.authorid}
                        date={post.createdAt}
                        title={post.title}
                    />
                    <PostBody text={post.text}/>
                    <DividerLine />
                    <PostComments  
                        comments={post.Comment} 
                        loading={loading}
                        setLoading={setLoading} 
                    />
                </PostContainer>
            :

                <LoadingContainer>
                    <LoadingText>
                        Loading the content...
                    </LoadingText>
                    <Orbit size="55" speed="1.5"  color="royalblue"/>
                </LoadingContainer>
            }
        </PostPage>
    )
}

export async function fetchPost(id) {
    try {
        let result = null;
        const url = `${BACKEND_URL}posts/${id}`
        await fetch(url)
                .then(res => res.json())
                .then(res => result = res)
        return result
    } catch (error) {
        console.error(error.message);        
    }
}
