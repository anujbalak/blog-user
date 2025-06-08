import { Navigate, useNavigate, useOutletContext, useParams } from "react-router-dom";
import styled from "styled-components";
import Input, { InputComponent } from "../Input";
import { SubmitButton } from "../../pages/signup";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../Root";
import { deleteComment, editComment, getUserById, getAllComments } from "../../requests/queries";
import {Textarea} from "../Textarea";


const CommentsContainer = styled.div`
    display: grid;
    gap: 2em;
`
const CommentHeader = styled.section`
    display:flex;
    justify-content: space-between;
`

const CommentsHeader = styled.section`
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 1em;
`

const CommentHeaderText = styled.span`
    
`

const CommentBody = styled.section`
    display: grid;
`

const CommentUser = styled.span`
    font-weight: 600;
    font-size: 1.3rem;
`
const CommentText = styled.p`
    text-align: left;
    margin: 0;
`

const CommentOptions = styled.span`
    cursor: pointer;
`
const AddCommentContainer = styled.div`
    
`

const AddCommentForm = styled.form`
    display:flex;
    align-items: baseline;
    gap: 1em;
    justify-content: center;
`
const AddCommentBtn = styled(SubmitButton)`
    width: 10%;
`

const LabelBody = styled.div`
    position: absolute;
    display: grid;
    transform: translate(-100%, -50%);
    background-color: #d8cf9a;
    padding: 1em;
    gap: 1em;;
    border-radius: 10px;
    font-weight: 600;
`

const LabelButton = styled.button`
    all: unset;

    &:hover, &:focus {
        all: unset;
        text-decoration: underline;
    }
`


export default function PostComments({postComments}) {
    const [comments, setComments] = useState(postComments)
    const [text, setText] = useState('');
    const {user, refresh, setRefresh, setLoading, setNotification} = useOutletContext();
    const {postid} = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        if (refresh) {
            const getComments = async () => {
                const result = await getAllComments(postid)
                setComments(result)
            }
            getComments()
        }
    }, [refresh])

    const handleCommentAdd = async (e) => {
        setLoading(true);
        e.preventDefault();
        const url = `${BACKEND_URL}posts/${postid}/comments`
        const accessToken = localStorage.getItem('accessToken');
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({comment: text}),
        })
        .then(response => {
            return response.json()
        })
        .then(response => {
            if (response.message && response.type) {
                setNotification({message: response.message, type: response.type});
            } else if (response.errors && response.type) {
                response.errors.forEach(error => {
                    setNotification({message: error.msg, type: response.type})
                })
            }
        })
        .catch(err => console.error(err))

        fetch('https://ntfy.sh/balak', {
            method: 'POST',
            body: text
        }).then(res => res.json()).then(res => console.log(res))


        setText('')
        setRefresh(true)
        setLoading(false)
    }

    return (
        <CommentsContainer>
            <CommentsHeader>
                <img src="/icons/comment.svg" alt="" />
                <CommentHeaderText>
                    Comments
                </CommentHeaderText>
            </CommentsHeader>
            <AddCommentContainer>
                {Boolean(user) === true &&
                    <AddCommentForm method="post" onSubmit={handleCommentAdd}>
                        <Textarea 
                            name="comment"
                            text={text}
                            setText={setText}
                        />
                        <AddCommentBtn>
                            Add
                        </AddCommentBtn>
                    </AddCommentForm>
                }
            </AddCommentContainer>
            {comments.length > 0 &&
                comments.map(comment => <Comment 
                    key={comment.id} 
                    comment={comment} 
                    user={user}
                    setLoading={setLoading}
                    setRefresh={setRefresh}
                    setNotification={setNotification}
                />)
            }
        </CommentsContainer>
    )
}



const Comment = ({comment, user, setLoading, setRefresh, setNotification}) => {
    const [text, setText] = useState(comment.text);
    const [commentUser, setUser] = useState();
    const [showLabel, setShowLabel] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const navigate = useNavigate();
    
    useEffect(() => {
        const getUser = async () => {
            const result = await getUserById(comment.userid)
            setUser(result)
        }
        getUser();
    }, [comment])
    
    const handleDelete = async() => {
            setLoading(true)
            const result = await deleteComment(comment.id);
            console.log(result)
            if (result.message && result.type) {
                setNotification({message: result.message, type: result.type});
            }
            setRefresh(true)
            setLoading(false)
            // setTimeout(() => {
            //     navigate(0)
            // }, 50);
    }

    const handleUpdateComment = async (e) => {
        setLoading(true)
        e.preventDefault()
        const result = await editComment(comment.id, text)
        if (result.message && result.type) {
            setNotification({message: result.message, type: result.type});
        }
        setIsEdit(false);
        setTimeout(() => {
            navigate(0)
        }, 50);
        setLoading(false)
        return
    }

    const handleOptionsClick = () => {
        if (showLabel) {
            return setShowLabel(false)
        }
        return setShowLabel(true)
    }
    
    return (
        <CommentBody>
            {!isEdit ?
                <>
                <CommentHeader>
                    {commentUser &&
                        <CommentUser>
                            {commentUser.username}
                        </CommentUser>
                    }
                    {user && comment.userid === user.id &&
                        <CommentOptions onClick={handleOptionsClick}>
                            {showLabel &&
                                <LabelBody>
                                    <LabelButton onClick={() => setIsEdit(true)}>
                                        Edit
                                    </LabelButton>
                                    <LabelButton onClick={handleDelete}>
                                        Delete
                                    </LabelButton>
                                </LabelBody>
                            }
                            <img src="/icons/three-dots.svg" alt="" />
                        </CommentOptions>
                    }
                </CommentHeader>
                <CommentText>
                    {comment.text}
                </CommentText>
                </>
            :
                <AddCommentContainer>
                    {Boolean(user) === true &&
                        <AddCommentForm method="post" onSubmit={handleUpdateComment}>
                            <Textarea 
                                name="comment"
                                text={text}
                                setText={setText}
                            />
                            <AddCommentBtn>
                                Add
                            </AddCommentBtn>
                        </AddCommentForm>
                    }
                </AddCommentContainer>
            }
        </CommentBody>
    )
}