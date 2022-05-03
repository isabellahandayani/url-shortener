import express from "express";
import cors from "cors";
import UrlRoutes from "./routes/url.routes";
import connectDB from "./config/db.config";

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// API Routes
app.use("/api/url", UrlRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
