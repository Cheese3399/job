import mongoose  from "mongoose";
import colors from "colors";

const conncetDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected To MongoDB Database ${mongoose.connection.host}`.bgMagenta.white)
    } catch (error) {
        console.log(`MongoDB Error ${error}`.bgRed.white)
    }
}

export default conncetDB;