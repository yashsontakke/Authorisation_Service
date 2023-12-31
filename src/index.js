const express = require("express");
const app = express();
const {PORT} = require("./config/serverConfig");
const apiRouter = require('./router/apiRouter');
const db = require("./models/index");


const setupAndStartServer= async () =>{
    // Middleware for parsing JSON bodies
    app.use(express.json());
    
    // Middleware for parsing URL-encoded bodies
    app.use(express.urlencoded({ extended: true }));

    app.use('/api', apiRouter);

    app.listen(PORT, ()=>{
        console.log(`Server Statred At Port${PORT}`)
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter:true});
        }
    })
}

setupAndStartServer();