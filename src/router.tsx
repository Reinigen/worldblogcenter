import { createBrowserRouter } from "react-router";
import App from "./App";

import AuthContainer from "./app/pages/AuthPage";
import BlogPage from "./app/pages/BlogPage";
import PrivateRoute from "./app/components/PrivateRoute";
import BlogPostPage from "./app/pages/BlogPostPage";

export const router = createBrowserRouter([
    {path: "/", element: <App />},
    {path: "/auth", element: <AuthContainer />},
    {
        path: "/blogs", 
        element: (
            <PrivateRoute> 
                <BlogPage />
            </PrivateRoute>
        )
    },
    {path: "/blogs/:blogId", 
        element: (
            <PrivateRoute>
                <BlogPostPage />
            </PrivateRoute>
        )
    },
])