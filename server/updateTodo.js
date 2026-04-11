const { connectToMongoDB } = require("./database");

/**
 * Updates a specific todo in the database
 * - Finds a todo by its current text
 * - Replaces it with new text
 */
const updateTodo = async () => {
  try {
    // Connect to MongoDB and get the client
    const client = await connectToMongoDB();

    // Select the database and collection we’re working with
    const db = client.db("todosdb");
    const todosCollection = db.collection("todos");

    // The todo we want to find and update
    const filter = { todo: "merci" };

    // What we want to change it to
    const update = {
      $set: { todo: "learn MongoDB today" },
    };

    // Perform the update operation
    const result = await todosCollection.updateOne(filter, update);

    // Log what happened
    console.log(`Matched ${result.matchedCount} document(s)`);
    console.log(`Modified ${result.modifiedCount} document(s)`);
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

// Run the function
updateTodo();
