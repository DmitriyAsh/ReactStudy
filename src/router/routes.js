import About from "../pages/About";
import Error from "../pages/Error";
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";

export const routes = [
    { path: "/about", element: About },
    { path: "/posts", element: Posts },
    { path: "/error", element: Error },
    { path: "/posts/:id", element: PostIdPage },
];
