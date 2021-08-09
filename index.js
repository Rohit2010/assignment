require("dotenv").config();
const express = require("express");
const app = express()
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const bodyParser = require('body-parser');

//import routes
const authRoute = require("./routes/authRoute");

//db connection
mongoose.connect(process.env.DATABASE, 
    {       useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(()=> {
    console.log("DB CONNECTED")
    
}).catch((err) => console.log(err))

//middlewares
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));

//routes
app.use("/api", authRoute)
// app.get('/', (req, res) => res.send('Hello World!'))

//port
app.listen(PORT, () => console.log(`app is running at ${PORT}`))