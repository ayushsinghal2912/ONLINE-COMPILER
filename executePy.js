// here the generated c++ code will be compiled and returned back

const {exec} =  require('child_process');
const {removeFile} = require('./removeFile');



const executePy = (filepath) => {

    return new Promise((resolve,reject) => {
        exec(`python ${filepath}`,
        (error,stdout,stderr) => {
            removeFile(filepath);
            error && reject({error,stderr});
            stderr && reject(stderr);
            resolve(stdout); 
        }
        );

    });
};

module.exports = {
    executePy 
};