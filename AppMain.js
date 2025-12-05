const express = require('express');
const app = express();
const port = 3000;

const productRoutes = require('./routes/productRoutes');

app.use(express.json());

//ivide:- '/'= localhost:3000/

//create
app.post('/', (req, res) => {
  res.send('inserting new product ');
});

//read
app.get('/', (req, res) => {
  res.send('reading from products');
});

// delete / 
app.delete('/', (req, res) => {
  res.send("DELETE request at root");
});

// update /  
app.patch('/', (req, res) => {
  res.send("PATCH request at root");
});

// Products router
app.use('/products', productRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});