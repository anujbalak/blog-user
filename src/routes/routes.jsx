import { useOutletContext } from "react-router-dom";
import Posts from "../pages/allPosts";
import Homepage from "../pages/home";
import LoginPage, { loginLoader } from "../pages/login";
import Post, { fetchPost } from "../pages/post";
import SignupPage from "../pages/signup";
import Root from "../Root";
import Account from "../pages/account";
import NewPost from "../pages/new-post";

const routes = [
    {
        path: "/",
        element: <Root/>,
        errorElement: '',
        children: [
            {
                index: true,
                path: '/',
                Component: Homepage,
            },
            {
                path: '/login',
                Component: LoginPage,
            },
            {
                path: '/signup',
                Component: SignupPage,
            },
            {
                path: '/posts',
                Component: Posts,
            },
            {
                path: '/posts/:postid',
                // loader: async ({params}) => {
                //     let post = await fetchPost(params.id);
                //     return {post};
                // },
                Component: Post,
            },
            {
                path: '/account',
                Component: Account,
            },
            {
                path: '/posts/new',
                Component: NewPost
            }
        ],
    },
]

export default routes;

