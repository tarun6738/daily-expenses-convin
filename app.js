const express = require("express")
const cookieParser = require("cookie-parser")
const app = express();

const errorMiddleware = require("./middleware/error")

app.use(express.json())
app.use(cookieParser())




const user = require("./routes/userRoute");
const expenses = require("./routes/expenseRoutes");


app.use("/api/v1/user",user);
app.use("/api/v1/expenses",expenses);


app.use(errorMiddleware)


module.exports = app;