const mongoose = require('mongoose');

const db = "mongodb+srv://ayush:ayush123@ayush.ivrg1.mongodb.net/?retryWrites=true&w=majority" ;
const connectDB =async ()=> {
    try{
        await mongoose.connect(db, {useNewUrlParser: true});
    
    // console.log("mongodb connected..");
    }
    catch(err) {
        console.error(err.message); 
        process.exit(1); 
    }
    console.log("Successfully connected to mongodb database"); 
}

module.exports = {
    connectDB,
};