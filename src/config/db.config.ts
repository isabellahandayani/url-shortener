import dotenv from "dotenv";
import mongoose from "mongoose";
import { ConnectOptions, ServerApiVersion } from "mongodb";

dotenv.config({ path: "./.env" });

const uri: string = process.env.MONGO_URI || " ";

const connectDB = async () => {
  try {
    await mongoose
      .connect(uri, {
        useNewUrlParser: true,
        serverApi: ServerApiVersion.v1
      } as ConnectOptions)
      .then((x) => {
        console.log(
          `Connected to Mongo! Database name: "${x.connections[0].name}"`
        );
      })
      .catch((err) => {
        console.error("Error connecting to mongo", err);
      });
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
