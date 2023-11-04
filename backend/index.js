//import package
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

//import modules
const connectToDB = require("./db");

//config with environment veriable
dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();
connectToDB(); //connecting to database

//middlewares
app.use(express.json());
app.use(cors());

//all api call
app.use("/api/v1/auth", require("./routes/authRoute"));
app.use("/api/v1/category", require("./routes/categoryRoute"));
app.use("/api/v1/product", require("./routes/productRoute"));

//listening on server
app.listen(PORT, () => {
  console.log(`server runnig at localhost:`, PORT);
});
