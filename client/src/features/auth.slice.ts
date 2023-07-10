

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { RootState } from '../store';
// import { persistReducer } from 'redux-persist';
//
// import storage from 'redux-persist/lib/storage';
import axios, {AxiosError} from "axios";

interface User {
    data:{
        email:string,
        access_token:string,
        role?:string
    }
}

interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isLoading: false,
    error: null,
};

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials: { email: string; password: string }, {rejectWithValue}) => {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', credentials, { withCredentials: true });
            const data = await response.data;
            return { ...data };
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.message || 'Failed to sign-in');
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (credentials: { email: string; password: string }, {rejectWithValue}) => {
        try {
            const response = await axios.post('http://localhost:3000/api/user', credentials, { withCredentials: true });
            const data = await response.data;
            return { ...data };
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.message || 'Failed to sign-in');
        }
    }
);
export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_,{rejectWithValue}) => {
        try {
            const response = axios.get('http://localhost:3000/api/auth/logout', {withCredentials:true})
            console.log(response);
            return response
        } catch (error) {
            const err = error as AxiosError
            return rejectWithValue(err.message || 'Failed to logout')
        }
    }
)
export const updateUserAccessToken = createAsyncThunk(
    'auth/updateUserAccessToken',
    async (accessToken: string) => {
        return accessToken;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout() {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action: any) => {
                state.isLoading = false;
                state.user = null;
                state.error = action.payload as string;
            })
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action: any) => {
                state.isLoading = false;
                state.user = null;
                state.error = action.payload as string;
            })
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.user = null
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action: any) => {
                state.isLoading = false;
                state.user = null;
                state.error = action.payload as string;
            })
            .addCase(updateUserAccessToken.fulfilled, (state, action) => {
                state.user!.data.access_token = action.payload;
            });
    },
});


export const selectUser = (state: RootState) => state.auth.user;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectError = (state: RootState) => state.auth.error;

// // Create a persistConfig to blacklist the 'user' field from persisting
// const persistConfig = {
//     key: 'root',
//     storage,
//     blacklist: ['auth'],
// };
//
// // Wrap the auth reducer with persistReducer
// const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

// Export the persisted auth reducer
export default authSlice.reducer;