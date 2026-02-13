import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import postReducer from '../features/posts/postSlice'
import commentReducer from '../features/comments/commentSlice'
import profileReducer from '../features/profile/profileSlice'
import { authApi } from './services/auth/authService';
import { postApi } from './services/post/postService';
import { commentApi } from './services/comments/commentService';
import { profileApi } from './services/auth/profileService';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    post: postReducer,
    [postApi.reducerPath]: postApi.reducer,
    comment: commentReducer,
    [commentApi.reducerPath]: commentApi.reducer,
    profile: profileReducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>  getDefaultMiddleware()
  .concat(authApi.middleware)
  .concat(postApi.middleware)
  .concat(commentApi.middleware)
  .concat(profileApi.middleware)

})

export default store;