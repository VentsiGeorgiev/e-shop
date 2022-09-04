const bcrypt = require('bcryptjs');

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123', 10),
        isAdmin: true
    },
    {
        name: 'John',
        email: 'john@example.com',
        password: bcrypt.hashSync('123', 10),
    },
    {
        name: 'Admin User',
        email: 'jane@example.com',
        password: bcrypt.hashSync('123', 10),
    },
];

module.exports = users;