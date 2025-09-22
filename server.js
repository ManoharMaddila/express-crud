// server.js
const express = require("express");
const app = express();
const PORT = 5000;

// Middleware to parse JSON request body
app.use(express.json());

// In-memory data store (fake DB)
let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];

// GET - Read all users
app.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

// POST - Create new user
app.post("/api/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT - Update user by id
app.put("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  user.name = req.body.name || user.name;
  res.status(200).json(user);
});

// DELETE - Remove user by id
app.delete("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  users = users.filter(u => u.id !== userId);
  res.status(200).json({ message: "User deleted" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
