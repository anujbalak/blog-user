import Posts from "../pages/allPosts";
import Homepage from "../pages/home";
import LoginPage from "../pages/login";
import Post from "../pages/post";
import SignupPage from "../pages/signup";
import Root from "../Root";
import Account from "../pages/account";
import Error from "../components/error";


const routes = [
    {
        path: "/",
        element: <Root/>,
        errorElement: <Error />,
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
                Component: Post,
            },
            {
                path: '/account',
                Component: Account,
            },
        ],
    },
]

export default routes;

