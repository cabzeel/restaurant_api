const mongoose = require('mongoose');
const connectDB = require('./db/connect');
const Product = require('./models/product');
const products = require('./data/menuItems');
const faqData = require('./models/faqData');
const faqDataItems = require('./data/faqData');
require('dotenv').config();


const seedProducts = async () => {
    await connectDB(process.env.MONGO_URI);

    try {
        await Product.insertMany(products);
        // await faqData.insertMany(faqDataItems);
        console.log('items inserted successfully');
        process.exit()
    } catch (error) {
        console.error("Error inserting products:", error);
        process.exit(1);
    }
}

seedProducts()