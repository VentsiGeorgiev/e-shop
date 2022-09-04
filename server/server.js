const express = require('express');
const cors = require('./middleware/cors');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => {
    res.json({ message: 'e-Shop API' });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/products', require('./routes/products'));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));