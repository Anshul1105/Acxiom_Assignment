const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const productRoutes = require('./routes/productRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const orderRoutes = require('./routes//orderRoutes')
dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: '*', // Allow all origins
    credentials: true,
}));


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Session Configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
        secure: false, // Set to true if using HTTPS
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
}));

// Routes
app.use('/users', userRoutes);
app.use('/cart', cartRoutes);
app.use('/products', productRoutes);
app.use('/vendors', vendorRoutes);
app.use('/orders', orderRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
