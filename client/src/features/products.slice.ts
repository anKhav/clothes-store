import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {axiosBase} from "../API/axiosApi.ts";


interface Product{
        id:number,
        name:string,
        price:number,
        images:[string],
        categories:[string],
        sizes:[string],
}
interface ProductsState {
    data:[Product] | null,
    isLoading: boolean;
    error: string | null;
}

const initialState:ProductsState = {
    data:null,
    isLoading:false,
    error:null
}

export const fetchProducts =  createAsyncThunk(
    'products/fetchProducts',
    async (_,{rejectWithValue}) => {
        try {
            const response = await axiosBase.get('/product/get-all')
            return  await response.data
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.message || 'Failed to fetch products!');
        }
    }
)

const productsSlice = createSlice({
    name:'products',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true
                    state.error = null
            })
            .addCase(fetchProducts.fulfilled, (state, {payload}) => {
                state.isLoading = false
                state.data = payload
                state.error = null
            })
            .addCase(fetchProducts.rejected, (state, {payload}) => {
                state.isLoading = false
                state.error = payload as string
            })

    }
})
export default productsSlice.reducer