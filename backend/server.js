const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')

const app = express();
app.use(cors());
const PORT = 5000;
const MONGO_URI = "mongodb+srv://Jaswanth:12345@topdata.efqmw.mongodb.net/social";

// Mongoose connection setup
async function connectToDatabase() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process if connection fails
  }
}

// Define the schema and model for your data

const chartSchema = new mongoose.Schema({
    type: {
      type: String,
      required: true, 
    },
    values: {
      type: [Number], // An array of numbers
      required: true, // Ensure 'values' are present
    },
  }, { timestamps: true }); 
  

const Chart = mongoose.model("charts", chartSchema);

// Route to fetch data
app.get("/fetch-data", async (req, res) => {
  try {
    const charts = await Chart.find();
    res.json(charts);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Start the server and connect to the database
app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server is running on http://localhost:${PORT}`);
});
