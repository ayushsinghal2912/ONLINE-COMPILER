
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
    // console.log(req.body);
    const{language = "cpp", code} = req.body ;
    // checking the condition if code is empty then send back failure report with the message
    if(code===undefined)
    {
        return res.status(400).json({Success : false, error : "Empty code body!"});
    }
    // need to generate a c++ file from the request 
    // we need to run the file and send the response
    return res.json({language, code}); 
});

app.listen('5000', () => {
    console.log( `Listening on port 5000`);
});


