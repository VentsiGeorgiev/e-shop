import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productService from './productService';

const initialState = {
    products: [],
    product: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const getProducts = createAsyncThunk(
    'products/getAll',
    async (_, thunkAPI) => {
        try {
            return await productService.getProducts();
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);


export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;