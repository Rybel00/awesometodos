require("dotenv").config();
const express = require("express");
const { connectToMongoDB } = require("./database");
const path = require("path");


const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));


const router = require("./routes");
app.use("/api", router);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectToMongoDB();
        app.listen(port, () => {
            console.log(`Server is listening on http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}
startServer();
