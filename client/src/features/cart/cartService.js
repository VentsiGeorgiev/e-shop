const addToCart = async ({ id, qty }) => {
    const response = await fetch(`/api/products/${id}`);
    const data = await response.json();
    data.qty = qty;

    return data;
};

const removeItemFromCart = async (id) => {
    const response = await fetch(`/api/products/${id}`);
    const data = await response.json();

    return data;
};

const cartService = {
    addToCart,
    removeItemFromCart
};

export default cartService;