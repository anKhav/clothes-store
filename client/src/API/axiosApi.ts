import axios from "axios";
import {store} from "../store.ts";
import {updateUserAccessToken} from "../features/auth.slice.ts";

export const axiosBase = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials:true
});

export const axiosAuth = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials:true
});
axiosAuth.interceptors.request.use(function (config) {
    const token = store.getState().auth.user?.data?.access_token;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});
axiosAuth.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401) {
        const response = await axiosAuth.get('/user/refresh', { withCredentials: true });
        const {accessToken: access_token} = await response.data;
        store.dispatch(updateUserAccessToken(access_token)); // Dispatch the action to update the access token in the Redux store
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return axiosAuth.request(originalRequest);
    }
    return Promise.reject(error);
});

