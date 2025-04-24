const express = require("express");
const path = require("path");
const noteRoutes = require("./server/routes/note");
const userRoutes = require("./server/routes/user");
const User = require("./server/models/user");
const Note = require("./server/models/note");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");  
  next();
});

// Debug routes
app.use("/api", (req, res, next) => {
  console.log(`Registering route: ${req.method} ${req.path}`);
  next();
});
app.use("/api", noteRoutes);
app.use("/api", userRoutes);

// Serve index.html for any non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

async function initDatabase() {
  try {
    await User.createTable();
    await Note.createTable();
    console.log("Database tables created successfully");
  } catch (err) {
    console.error("Error initializing database:", err);
  }
}

initDatabase();

app.listen(3000, () => console.log("Server running on port 3000"));