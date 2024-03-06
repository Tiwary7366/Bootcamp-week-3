const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const user = require('./routes/userRoutes');
const policy = require('./routes/policyRoutes');
const claim = require('./routes/claimRoutes');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
const uri = "mongodb+srv://tiwary7366:Abhishek@abhishek.shcgjrp.mongodb.net/?retryWrites=true&w=majority&appName=Abhishek"
mongoose.connect(uri);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Use routes
app.use('/', user);
app.use('/', policy);
app.use('/', claim);

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
