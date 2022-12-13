
const express = require('express');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.get("/",(req,res)=>{
    // res.send(`Hello there !`);
    return res.json({hello : "world!"})
});

app.post("/run",(req,res)=>{
    console.log(req.body);
    return res.json(req.body); 
});

app.listen('5000', () => {
    console.log( `Listening on port 5000`);
});


