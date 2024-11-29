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




app.use(
  cors({
      origin: '*', // Use the deployed frontend URL for production
      credentials: true,
  })
);

  
  
// app.use(cors());



app.use(express.json());
app.use(cookieParser());



app.use('/api/v1',authRouter);


//Listen Request
module.exports=app;