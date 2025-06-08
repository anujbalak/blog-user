import { Navigate, useNavigate, useOutletContext, useParams } from "react-router-dom";
import styled from "styled-components";
import Input, { InputComponent } from "../Input";
import { SubmitButton } from "../../pages/signup";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../Root";
import { deleteComment, editComment, getUserById } from "../../requests/queries";
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


export default function PostComments({comments, loading, setLoading}) {
    const [text, setText] = useState('');
    const {user} = useOutletContext();
    const {postid} = useParams()
    const navigate = useNavigate();
    const [commentError, setCommentError] = useState(null);

    const handleCommentAdd = async (e) => {
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
        .then(response => console.log(response))
        .catch(err => console.error(err))
        setText('')
        setTimeout(() => {
            navigate(0)
        }, 50);
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
                    loading={loading}
                    setLoading={setLoading}
                />)
            }
        </CommentsContainer>
    )
}



const Comment = ({comment, user, loading, setLoading}) => {
    const [text, setText] = useState(comment.text);
    const [commentUser, setUser] = useState();
    const [showLabel, setShowLabel] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const navigate = useNavigate();
    
    useEffect(() => {
        const getUser = async () => {
            const result = await getUserById(comment.userid)
            setUser(result)
        }
        getUser();
    }, [comment])
    
    useEffect(() => {
        if (isDelete) {
            const deleteCom = async () => {
                const result = await deleteComment(comment.id);
                console.log(result);
            }
            deleteCom();
            setIsDelete(false);
            setTimeout(() => {
                navigate(0)
            }, 50);
        }
    }, [isDelete])

    const handleUpdateComment = async (e) => {
        setLoading(true)
        e.preventDefault()
        await editComment(comment.id, text)
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
                                    <LabelButton onClick={() => setIsDelete(true)}>
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