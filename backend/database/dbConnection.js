import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose
    .connect(process.env.MONGO_URL,{
        dbName: "Hospital_Managment",
    })
    .then(()=> {
        console.log("Connected to database!");
    })
    .catch((err) => {
        console.log(`Some error occured while connecting to databse: ${err}`);
    });
};