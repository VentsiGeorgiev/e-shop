const addToCart = async ({ id, qty }) => {
    const response = await fetch(`/api/products/${id}`);
    const data = await response.json();

    const product = {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty: qty,
    };

    if (data) {
        localStorage.setItem('cartItems', JSON.stringify(product));
    }

    return data;
};



const cartService = {
    addToCart,
};

export default cartService;