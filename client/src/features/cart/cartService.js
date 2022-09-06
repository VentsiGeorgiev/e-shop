const addToCart = async ({ id, qty }) => {
    const response = await fetch(`/api/products/${id}`);
    const data = await response.json();
    data.qty = qty;

    return data;
};



const cartService = {
    addToCart,
};

export default cartService;