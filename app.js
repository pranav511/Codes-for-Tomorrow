const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const app = express();
dotenv.config();

app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api',categoryRoutes);
app.use('/api',serviceRoutes);

app.get('/',(req,res)=>{
    res.send('routes    working');
})

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{       
    console.log(`server is live at PORT ${PORT} http://localhost:${PORT}`);
})