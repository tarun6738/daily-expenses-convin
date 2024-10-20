const app = require("./app")

require('dotenv').config()
const {connectDB} = require("./config/database")


// handle uncaught exceptions
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Uncaught exception");
    process.exit(1);
})

connectDB();

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT}`)
})

// hanndling unhandled promises(Shutting down server)

process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Unhandled Promise rejection")
    server.close(()=>{
        process.exit(1);
    })
})