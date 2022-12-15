// here the generated c++ code will be compiled and rturned back

const {exec} =  require('child_process');
const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, "outputs") ;

if(!fs.existsSync(outputPath))
{
    fs.mkdirSync(outputPath,{recursive:true});
};


const executeCpp = (filepath) => {

    const jobid = path.basename(filepath).split(".")[0];
    console.log(jobid);
    const outPath = path.join(
        outputPath,`${jobid}.out`) ;
    console.log(outPath);

    return new Promise((resolve,reject) => {
        exec(`g++ ${filepath} -o ${outPath} && cd ${outputPath} && ${jobid}.out`,
        (error,stdout,stderr) => {
            error && reject({error,stderr});
            stderr && reject(stderr);
            resolve(stdout); 
        }
        );

    });
};

module.exports = {
    executeCpp 
};