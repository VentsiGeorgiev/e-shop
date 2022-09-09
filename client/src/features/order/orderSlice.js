import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import orderService from './orderService';

const initialState = {
    order: {},
    orderDetails: { orderItems: [], shippingAddres: {} },
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Order create
export const orderCreate = createAsyncThunk(
    'auth/createOrder',
    async (orderData, thunkAPI) => {
        try {

            return await orderService.orderCreate(orderData);

        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get order
export const getOrderDetails = createAsyncThunk(
    'auth/orderDetails',
    async (id, thunkAPI) => {
        try {

            return await orderService.getOrderById(id);

        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);


export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(orderCreate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(orderCreate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.order = action.payload;
            })
            .addCase(orderCreate.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.order = null;
            })
            .addCase(getOrderDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.orderDetails = action.payload;
            })
            .addCase(getOrderDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.orderDetails = null;
            });
    }
});

export const { reset } = orderSlice.actions;
export default orderSlice.reducer;
