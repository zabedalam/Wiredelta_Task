const app =require('./app')

const connectDatabase = require('./config/database')


const dotenv=require('dotenv')

//Handle Uncaught exceptions 
process.on('uncaughtException',err=>{
    console.log(`ERROR: ${err.stack}`)
    console.log('Shutting down due to uncaught exception ')
    process.exit(1)
})

//Setting up config file
dotenv.config({path:'backend/config/config.env'})

// Connecting to database
connectDatabase();


const server=app.listen(process.env.PORT,()=>{
    console.log(`Server Listening on Port:${process.env.PORT} in ${process.env.NODE_ENV} Mode`)
})

//Handle Unhandle Promise rejections
process.on('unhandledRejection',err=>{
    console.log(`ERROR:${err.stack}`)
    console.log('Shutting down the server due to Unhandled Promise rejection')
    server.close(()=>{
        process.exit(1)
    })
})