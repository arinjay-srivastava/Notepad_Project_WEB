const express = require("express");
const path = require("path");
const noteRoutes = require("./server/routes/note");
const userRoutes = require("./server/routes/user");
const User = require("./server/models/user");
// const Note = require("./server/models/note");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend"))); // Serve frontend files
app.use("/api", noteRoutes);
app.use("/api", userRoutes);

// Serve index.html for any non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

async function initDatabase() {
  await User.createTable();
  await Note.createTable();
}

initDatabase();

app.listen(3000, () => console.log("Server running on port 3000"));