const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const user = require('./routes/userRoutes');
const policy = require('./routes/policyRoutes');
const claim = require('./routes/claimRoutes');
require ("dotenv").config()

const app = express();
app.use(bodyParser.json());

const connectDB =async()=>{
  try{
      const connectionInstance=await mongoose.connect(process.env.MONGODB_URI)
      console.log(`\n MongoDB connected !! DB HOST: 
      ${connectionInstance.connection.host}`);
      
      
  }
      catch(error){
      console.log("MogoDb connection FAILED", error)
      process.exit(1)
  }
}
connectDB();
// Use routes
app.use('/', user);
app.use('/', policy);
app.use('/', claim);

// Start the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
