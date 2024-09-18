const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const PORT = 3000;

app.use(express.json());

const client = new MongoClient(
  "mongodb+srv://bhaktibudar12:MzIe0OhXqdwwrqNJ@cluster0.2rlj8.mongodb.net/user-database",
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }
);

const connectDB = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const database = client.db("user-database");
    const usersCollection = database.collection("users");

    // Create user
    app.post("/add-user", async (req, res) => {
      try {
        const user = req.body;
        const result = await usersCollection.insertOne(user);
        res.json({
          status: "Success",
          message: "User created successfully",
          data: result,
        });
      } catch (error) {
        res.json({
          status: "Failed",
          message: error,
        });
      }
    });

    // Retrieve user
    app.get("/users", async (req, res) => {
      try {
        const result = await usersCollection.find({}).toArray();
        res.json({
          status: "Success",
          message: "Users retrieved successfully",
          data: result,
        });
      } catch (error) {
        res.json({
          status: "Failed",
          message: error,
        });
      }
    });
  } catch (err) {
    console.error(err);
  }
};

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
