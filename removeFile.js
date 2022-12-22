const fs = require('fs');
const path = require('path');

const removeFile = async (filepath,outputPath,jobid)=>{
try {
    fs.unlinkSync(filepath);
} catch (error) {
    console.log(`File deletion error --->`, error);
}
try {
    fs.unlinkSync(path.join(outputPath,`${jobid}.out`));
} catch (error) {
    console.log(`File deletion error --->`, error);
}

};

module.exports = {
    removeFile,
};