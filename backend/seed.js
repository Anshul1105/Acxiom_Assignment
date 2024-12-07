const mongoose = require('mongoose');
const Product = require('./models/Product');
const Vendor = require('./models/Vendor'); // Import the Vendor model
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const MONGO_URI = process.env.MONGO_URI; // Ensure this is set in your .env file
console.log(MONGO_URI)
// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.error('DB Connection Error:', err);
        process.exit(1); // Exit if DB connection fails
    });

// Generate products
const generateProducts = (vendors, count = 20) => {
    return Array.from({ length: count }, (_, i) => ({
        name: `Product ${i + 1}`,
        price: parseFloat((Math.random() * 100).toFixed(2)), // Ensure the price is a number
        vendor: vendors[i % vendors.length]._id, // Use the vendor _id instead of the name
        productId: `PID-${i + 1}`,
        image: `https://via.placeholder.com/150?text=Product+${i + 1}`, // Placeholder image URL
    }));
};

// Seed database
const seedDatabase = async () => {
    try {
        // Fetch or create vendors
        const vendors = await Vendor.find(); // Assuming vendors are already created in the database

        if (true) {
            console.log('No vendors found, seeding vendors...');
            const newVendors = await Vendor.insertMany([
                { name: 'Vendor 1' },
                { name: 'Vendor 2' },
                { name: 'Vendor 3' },
                { name: 'Vendor 4' },
                { name: 'Vendor 5' },
            ]);
            console.log('Vendors created:', newVendors);
        }

        // Now generate products and assign the correct vendor _id
        const products = generateProducts(vendors, 20); // Change the count if needed

        console.log('Clearing existing products...');
        await Product.deleteMany(); // Remove all existing products

        console.log('Inserting new products...');
        await Product.insertMany(products);

        console.log(`Successfully inserted ${products.length} products`);
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        mongoose.connection.close(); // Ensure the connection is closed
    }
};

seedDatabase();
