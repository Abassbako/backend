const express = require('express');

const mongoose = require('mongoose');

const authRoutes = require('../routers/authRoutes');
// const productRoutes = require('../routers/productRoutes')

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next) => {
    console.log(`${ req.path } ${ req.method }`);
    next();
});
app.use('/api/v1/users', authRoutes);
// app.use('/api/v1/products', productRoutes);

const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3000;
const uri = process.env.ATLAS_URI;
app.listen(PORT,() => {
    console.log(`app listening on port ${ PORT }`);
});

mongoose.connect(uri, {
    useNewUrlParser: true
})
.then(() => {
    console.log('MongoDB connection successful');
})
.catch((e) => {
    console.error(new Error(`MongoDB connection Error: ${ e.message }`));
});