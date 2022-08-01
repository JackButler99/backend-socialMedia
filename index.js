require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const database = require("./db")
const userRoutes = require("./routes/users")
const authRoutes = require("./routes/auth")
const postsRoutes = require("./routes/posts")

// Database Connection
database()

//Middlewares 
app.use(express.json())
app.use(cors())

//Routes 
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/posts", postsRoutes)

const port = process.env.PORT 
app.listen(port, console.log(`Listening on port ${port} .... `))