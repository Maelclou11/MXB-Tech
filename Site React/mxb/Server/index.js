const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");

// Augmenter la limite de taille de la requête
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json());
app.use(cors());

const db = require('./models');

// Routers
const blogRouter = require('./routes/Blog');
app.use("/blog", blogRouter);


db.sequelize.sync().then(() => {
  app.listen(3308, () => {
    console.log(`Server is running on port 3308`);
  });
});
