import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cartService from './cartService';

const initialState = {
    cartItems: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (product, thunkAPI) => {
        try {

            return await cartService.addToCart(product);
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);


export const productSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product = action.payload;
                const item = action.payload;

                const existing = state.cartItems.find(x => x._id === item._id);

                if (existing) {
                    state.cartItems.map(x => x._id === item._id ? item : x);
                } else {
                    state.cartItems.push(item);
                }


            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.product = null;
            });
    }
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;