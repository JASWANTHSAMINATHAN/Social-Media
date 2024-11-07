const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const bodyParser = require("body-parser");
const User = require('./models/User');
const bcrypt = require("bcrypt");


const app = express();
const PORT = 3000;
const MONGO_URI = "mongodb+srv://Jaswanth:12345@topdata.efqmw.mongodb.net/social";
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



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



app.post("/auth/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send("Email already registered");
    }

    const newUser = new User({
      name,
      email,
      password_hash: hashedPassword,
    });
    await newUser.save();

    res.status(200).send("User registered successfully");
  } catch (err) {
    console.log("Error registering user: ", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).send("Invalid password");
    }

    res.status(200).send("Login successful");
  } catch (err) {
    console.log("Error logging in:", err);
    res.status(500).send("Internal Server Error");
  }
});


// Start the server and connect to the database
app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server is running on http://localhost:${PORT}`);
});
