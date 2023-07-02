import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, {AxiosError} from "axios";

interface User {
    data:{
        email: string;
        accessToken: string;
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
    async (credentials: { email: string; password: string }, thunkAPI) => {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', credentials);
            const data = await response.data;
            return { ...data };
        } catch (error) {
            const err = error as AxiosError
            return thunkAPI.rejectWithValue(err.message || 'Failed to login');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
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
            });
    },
});


export default authSlice.reducer;