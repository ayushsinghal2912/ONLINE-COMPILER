//generate a c++ file from the request recieved 
//we need a folder (named here as code) to store the generated c++ file  
//need to make generateFile function async because things will occur in the order 
//

const fs = require('fs');
const path = require('path');
const {v4:uuid } = require('uuid'); // uuid is used to generate unique id 

const dirCodes = path.join(__dirname , "codes"); // joins codes folder and this file together
if(!fs.existsSync(dirCodes))
{
    fs.mkdirSync(dirCodes, {recursive: true});
};

 const generateFile= async (format,content)=> {
    const jobid = uuid();
    const fileName = `${jobid}.${format}` ;
    const filePath = path.join(dirCodes, fileName);
    await fs.writeFileSync(filePath,content);
    return filePath;
    
 };

 module.exports = {
    generateFile,
 }; 