const express = require('express');
const { connectToDB } = require('./connection');

// Importing routes
const authRoute = require('./router/authRoute');

const app = express();
const PORT = 8003
connectToDB("mongodb://127.0.0.1:27017/express-manager")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

 app.use(express.json());

  app.use('/v1/auth', authRoute);
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });