require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const connectDB = require("./db/connect");

const productsRouter = require("./routers/products");

//middleware
app.use(express.json());

//route
app.use("/api/v1/products", productsRouter);

app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      "<h1>Store API</h1><a href='/api/v1/products'><button>View Products</button></a>"
    );
});

app.get("*", (req, res) => {
  res.status(404).send("Route does not exits");
});

const port = process.env.PORT;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
