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



// List of allowed origins or use '*' for public APIs without credentials


app.use((req, res, next) => {
    const origin = req.headers.origin;

    // If the origin is allowed, set the Access-Control-Allow-Origin header
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
    } else if (!origin) {
        // If no origin is present (e.g., from Postman), allow '*' for access
        res.setHeader('Access-Control-Allow-Origin', '*');
    }

    // Allow specific methods
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    
    // Allow specific headers
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    // Handle preflight request (OPTIONS request)
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204); // Respond with 204 to preflight request
    }

    // Continue to the next middleware or route handler
    next();
});


// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//         // Allow requests from these origins or from tools like Postman
//         callback(null, true);
//       } else {
//         // Reject requests from unknown origins
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true,  // Allow cookies and credentials
//   })
// );
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