const express= require("express");
const mongoose = require("mongoose");
const cors= require("cors");
const dotenv= require("dotenv");
const userRoutes= require("./routes/userRoutes");
const expenseRoutes= require("./routes/expenseRoutes");
const budgetRoutes= require("./routes/budgetRoutes");
dotenv.config();

const app= express();
const PORT= process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));


app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);
//app.use("/api/budgets", budgetRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports= app;