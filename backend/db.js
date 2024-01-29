require ('dotenv').config();

const mongoose = require('mongoose')


const mongoDB = async function () {

    try {
        await mongoose.connect(process.env.URI);
        console.log("connected");
        const fetched_data1 = await mongoose.connection.db.collection("clothC")
        const data1 = await fetched_data1.find({}).toArray();
        global.clothData = data1;
        const fetched_data2 = await mongoose.connection.db.collection("clothCategoryC")
        const data2 = await fetched_data2.find({}).toArray();
        global.clothCategory = data2;

    } catch (error) {
        console.log(error);
    }
}

module.exports = mongoDB;