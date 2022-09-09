import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import orderService from './orderService';

const initialState = {
    order: {},
    orderDetails: { orderItems: [], shippingAddres: {} },
    orderPay: {},
    userOrders: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Order create
export const orderCreate = createAsyncThunk(
    'order/createOrder',
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
    'order/orderDetails',
    async (id, thunkAPI) => {
        try {

            return await orderService.getOrderById(id);

        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get order
export const payOrder = createAsyncThunk(
    'order/payOrder',
    async (id, thunkAPI) => {
        try {

            return await orderService.payOrder(id);

        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get user orders
export const getUserOrders = createAsyncThunk(
    'order/userOrders',
    async (_, thunkAPI) => {
        try {

            return await orderService.getUserOrders();

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
                state.order = {};
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
            })
            .addCase(payOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(payOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.orderPay = action.payload;
            })
            .addCase(payOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.orderPay = {};
            })
            .addCase(getUserOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.userOrders = action.payload;
            })
            .addCase(getUserOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.userOrders = [];
            });
    }
});

export const { reset } = orderSlice.actions;
export default orderSlice.reducer;
