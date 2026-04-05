const express = require("express");
const router = express.Router();
const { getConnectedClient } = require("./database");
const { ObjectId } = require("mongodb");


const getCollection = () => {
  const client = getConnectedClient();
  if (!client) {
    throw new Error("Database not connected");
  }
  const collection = client.db("awesometodos").collection("awesometodos");
  return collection;
}
//==========DATABASE TABLE(todos)====================

// GET /todos
// GET /todos
router.get("/awesometodos", async (req, res) => {
  try {
    const collection = getCollection();
    const todos = await collection.find({}).toArray();

    res.status(200).json({ todos });
  } catch (error) {
    console.error("GET /todos error:", error);
    res.status(500).json({ error: error.message });
  }
});

// POST /todos
router.post("/awesometodos", async (req, res) => {
  try {
    const collection = getCollection();
    let { todo } = req.body;

    if (!todo) {
      return res.status(400).json({ msg: "error no todo found" });
    }



    const newTodo = await collection.insertOne({ todo, status: false });

    res.status(201).json({ todo, status: false, _id: newTodo.insertedId });
  } catch (error) {
    console.error("POST /todos error:", error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE /todos/:id
// DELETE /todos/:id
router.delete("/awesometodos/:id", async (req, res) => {
  try {
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);

    const deleteTodo = await collection.deleteOne({ _id });

    res.status(200).json(deleteTodo);
  } catch (error) {
    console.error("DELETE /todos/:id error:", error);
    res.status(500).json({ error: error.message });
  }
});

// PUT /todos/:id
// PUT /todos/:id
router.put("/awesometodos/:id", async (req, res) => {
  try {
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);
    const { status } = req.body;

    if (typeof status !== "boolean") {
      return res.status(400).json({ mssg: "invalid status" });
    }

    const updatedTodo = await collection.updateOne({ _id }, { $set: { status: !status } });

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("PUT /todos/:id error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
