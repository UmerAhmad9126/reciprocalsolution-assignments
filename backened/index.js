const express = require('express');
const app = express();

const database = require("./config/database");
const cookieParser = require('cookie-parser');
const cors = require('cors'); //backened entertain the front request
const userRoutes = require("./routes/User")
const todoRoutes = require("./routes/todoRoutes/Todo")

const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect
database.connect();
//middleware
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: 'https://frontened-gamma.vercel.app',
        credentials: true,
    })
)



//routes
app.use(userRoutes);
app.use(todoRoutes);



//default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Server is up and running..."
    });
});

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
})