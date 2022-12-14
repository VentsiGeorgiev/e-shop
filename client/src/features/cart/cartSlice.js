import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cartService from './cartService';

// Get shippingAddress from localStorage
const address = JSON.parse(localStorage.getItem('shippingAddress'));
const payment = JSON.parse(localStorage.getItem('paymentMethod'));

const initialState = {
    cartItems: [],
    shippingAddress: address ? address : {},
    paymentMethod: payment ? payment : '',
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (product, thunkAPI) => {
        try {

            return cartService.addToCart(product);
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (id, thunkAPI) => {
        try {
            return await cartService.removeItemFromCart(id);
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
        resetCart: (initialState) => initialState,
        setShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
        },
        savePaymentMethod: (state, action) => {
            console.log('action.payload ------');
            console.log(action.payload);
            state.paymentMethod = action.payload;
            localStorage.setItem('paymentMethod', JSON.stringify(action.payload));
        }
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

                const product = {
                    product: item._id,
                    name: item.brand,
                    image: item.image,
                    price: item.price,
                    countInStock: item.countInStock,
                    qty: item.qty,
                };

                const existing = state.cartItems.find(x => x.product === item._id);

                if (existing) {
                    existing.qty = item.qty;
                } else {
                    state.cartItems.push(product);
                }


            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.product = null;
            })
            .addCase(removeFromCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product = action.payload;
                const item = action.payload;


                state.cartItems = state.cartItems.filter(x => x.product !== item._id);

            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.product = null;
            });
    }
});

export const {

    resetCart,
    addShippingAddress,
    setShippingAddress,
    savePaymentMethod,

} = productSlice.actions;
export default productSlice.reducer;