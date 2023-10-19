import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Error from "../pages/Error";
import About from "../pages/About";
import Posts from "../pages/Posts";
import PostIdPage from "../pages/PostIdPage";
import { routes } from "../router/routes";

const AppRouter = () => {
    return (
        <Routes>
            {routes.map((route) => (
                <Route path={route.path} element={<route.element />} />
            ))}
            <Route path='/*' element={<Navigate to='/posts' replace />} />
        </Routes>
    );
};

export default AppRouter;
