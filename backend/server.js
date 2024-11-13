import express from 'express';
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'

import { connectDB } from './config/db.js';

import productRoutes from './routes/product.route.js'
import userRoutes from './routes/user.route.js'

dotenv.config()
const PORT = process.env.PORT || 5000
const app = express();
const __dirname = path.resolve()

app.use(express.json())
app.use(cors())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
//Display the current environment
console.log("ENV:", process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "/frontend/dist")))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});
