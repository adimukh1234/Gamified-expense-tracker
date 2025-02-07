const express= require("express");
const mongoose = require("mongoose");
const cors= require("cors");
const dotenv= require("dotenv");

dotenv.config();

const app= express();
const PORT= process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));


app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/expenses", require("./routes/expenseRoutes"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));