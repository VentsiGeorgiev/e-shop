const express = require('express');
const cors = require('./middleware/cors');
const dotenv = require('dotenv').config();
const path = require('path');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/error');
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/users', require('./routes/user'));
app.use('/api/orders', require('./routes/order'));


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', (_, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });

} else {
    app.get('/', (req, res) => {
        res.json({ message: 'e-Shop API' });
    });
}


app.get('/api/config/paypal', (req, res) => res.json(process.env.PAYPAL_CLIENT_ID));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));