const express = require('express');
const { connectRedis } = require('./utils/redis');
const linkRoutes = require('./routes/linkRoutes');
const app = express();
const port = 7000;
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/', linkRoutes);
const connect = async () => {
  try {
    await connectRedis();
    app.listen(port, () => {
      console.log(`App is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

connect();
