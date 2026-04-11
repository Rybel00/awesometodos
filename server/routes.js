const express = require("express");
const { ObjectId } = require("mongodb");
const { getConnectedClient } = require("./database");

const router = express.Router();

/**
 * Helper function to get the "todos" collection
 * Makes sure we have a connected client before accessing the DB
 */
const getTodosCollection = () => {
  const client = getConnectedClient();

  if (!client) {
    throw new Error("Database not connected");
  }

  return client.db("todosdb").collection("todos");
};

// ===================== TODOS ROUTES =====================

// GET /todos → fetch all todos
router.get("/todos", async (req, res) => {
  try {
    const collection = getTodosCollection();
    const todos = await collection.find({}).toArray();

    res.status(200).json({ todos });
  } catch (err) {
    console.error("GET /todos failed:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST /todos → create a new todo
router.post("/todos", async (req, res) => {
  try {
    const collection = getTodosCollection();
    const { todo } = req.body;

    // Basic validation
    if (!todo) {
      return res.status(400).json({ msg: "No todo provided" });
    }

    // Insert new todo with default status = false
    const result = await collection.insertOne({
      todo,
      status: false,
    });

    res.status(201).json({
      todo,
      status: false,
      _id: result.insertedId,
    });
  } catch (err) {
    console.error("POST /todos failed:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE /todos/:id → remove a todo
router.delete("/todos/:id", async (req, res) => {
  try {
    const collection = getTodosCollection();
    const _id = new ObjectId(req.params.id);

    const result = await collection.deleteOne({ _id });

    res.status(200).json(result);
  } catch (err) {
    console.error("DELETE /todos/:id failed:", err);
    res.status(500).json({ error: err.message });
  }
});

// PUT /todos/:id → toggle todo status
router.put("/todos/:id", async (req, res) => {
  try {
    const collection = getTodosCollection();
    const _id = new ObjectId(req.params.id);
    const { status } = req.body;

    // Make sure status is actually a boolean
    if (typeof status !== "boolean") {
      return res.status(400).json({ msg: "Invalid status value" });
    }

    // Toggle the current status
    const result = await collection.updateOne(
      { _id },
      { $set: { status: !status } }
    );

    res.status(200).json(result);
  } catch (err) {
    console.error("PUT /todos/:id failed:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
