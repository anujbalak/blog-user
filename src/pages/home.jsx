import { Link, useOutletContext } from "react-router-dom";
import Header from "../components/Header";
import PostCard from "../components/postCard";
import { Bouncy } from 'ldrs/react'
import 'ldrs/react/Bouncy.css'
import styled from "styled-components";
import { PostsContainer } from "./allPosts";
import Button from "../components/Button";

const HomeComponent = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 100vw;
    min-height: 100vh;
`

const HomeBody = styled.div`
    
`

export const LoadingText = styled.h3`
    color: #a3a29d;
    font-size: 1.8rem;
`

export const LoadingContainer = styled.div`
    
`

const Homepage = () => {
    let {posts} = useOutletContext();
    
    
    return (
        <HomeComponent className="homepage">
            <Header />
            <HomeBody>
            {posts.length > 0 ?
                <Posts posts={posts}/>
            : 
                <LoadingContainer>
                    <LoadingText>Loading the posts...</LoadingText>
                    <Bouncy size="80" color="#1567ff" />  
                </LoadingContainer>
            }
            <Button path="posts/new" name="+"/>
            </HomeBody>
        </HomeComponent>
    )
}

const Posts = (props) => {
    return (
        <PostsContainer>
            {props.posts.map(post => {
                return <PostCard 
                    post={post}
                    key={post.id}
                />
            })}
        </PostsContainer>
    )
}

export default Homepage;