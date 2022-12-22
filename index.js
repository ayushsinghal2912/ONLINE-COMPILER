const express = require("express");
const bodyParser = require("body-parser");
const { generateFile } = require("./generateFile");
const { executeCpp } = require("./executeCpp");
const { executePy } = require("./executePy");
const {connectDB} = require('./db')
const Job = require('./models/job')

const cors = require('cors');
const { stringify } = require("uuid");

connectDB();
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get('/status',async(req,res) => {
  const jobid = req.query.id;
  console.log("status requested", jobid);

  if(jobid == undefined)
  return res.status(400).json({success:false, error: "missing id query param"});

  try {
    const job = await Job.findById(jobid);
    console.log(job);

    if(job==undefined)
    {
    return res.status(404).json({success:false, error: "invalid job id"});
    }

      return res.status(200).json(job);
      
  } 
  catch (error) {
    return res.status(400).json({success:false, error : JSON.stringify(error)});
  }
  
});

app.get("/", (req, res) => {
  // res.send(`Hello there !`);
  return res.json({ hello: "world!" });
});

app.post("/run", async (req, res) => {
  // console.log(req.bod);
  const { language = "cpp", code } = req.body;
  console.log(language);
  // checking the condition if code is empty then send back failure report with the message
  if (code === undefined) {
    return res.status(400).json({ Success: false, error: "Empty code body!" });
  }
  // need to generate a c++ file from the request
  let job;
  try {
    const filepath = await generateFile(language, code);
    job = await new Job({language ,filepath}).save();
    const jobid = job["_id"]; 
    res.status(201).json({success:true, jobid});
    console.log(job);
    // console.log(filepath);
    // we need to run the file and send the response
    let output ;
    job["startedAt"]= new Date();
    if(language ==="cpp")
    {
    output = await executeCpp(filepath);
    }
    else {
    output = await executePy(filepath);
    }

    job["completedAt"] = new Date();
    job["status"] = "success" ;
    job["output"] = output ;

    await job.save();

    console.log(job);
    // return res.status(200).json({filepath, output}); 
  } catch (err) {
    job["completedAt"] = new Date();
    job["status"] = "error" ;
    job["output"] = JSON.stringify(err) ;
    await job.save();

    console.log(job);
    // res.status(500).json({ err });
  }
});

app.listen("5000", () => {
  console.log(`Listening on port 5000`);
});
