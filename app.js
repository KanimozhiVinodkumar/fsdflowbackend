const express=require('express');
const cors = require('cors');
const authRouter = require('./routes/authRoutes');
const cookieParser=require('cookie-parser');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');


//creating Express Application
const app=express();
app.use(bodyParser.json());

// Add middleware to parse JSON
// app.use(
//     cors({
//       origin: 'http://localhost:5173', // Explicitly specify your frontend origin
//       credentials: true, // Allow cookies and other credentials to be sent
//     })
//   );

const allowedOrigins = ['http://localhost:5173', 'https://yourfrontend.com'];

app.use((req, res, next) => {
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
    } else if (!origin) {
        // Allow requests from tools like Postman
        res.setHeader('Access-Control-Allow-Origin', '*');
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204); // Respond to preflight requests
    }

    next();
});


// app.use(
//   cors({
//       origin: '*', // Use the deployed frontend URL for production
//       credentials: true,
//   })
// );

  
  
// app.use(cors());



app.use(express.json());
app.use(cookieParser());



app.use('/api/v1',authRouter);


//Listen Request
module.exports=app;