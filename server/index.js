// Load environment variables from .env
require("dotenv").config();

const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./database");

// Initialize Express app
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Serve static files from the "build" folder (for frontend)
app.use(express.static(path.join(__dirname, "build")));

// Load API routes
const apiRoutes = require("./routes");
app.use("/api", apiRoutes);

// Serve the main frontend page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Use PORT from environment or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server after connecting to MongoDB
const startServer = async () => {
  try {
    // Make sure database is connected before starting the server
    await connectToMongoDB();

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1); // Exit if DB connection fails
  }
};

//Start the server
startServer();
