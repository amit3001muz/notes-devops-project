const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://mongo:27017/notes");

const NoteSchema = new mongoose.Schema({
  text: String,
  highlight: { type: Boolean, default: false }
});

const Note = mongoose.model("Note", NoteSchema);

// CREATE
app.post("/notes", async (req, res) => {
  const note = new Note(req.body);
  await note.save();
  res.send(note);
});

// READ
app.get("/notes", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

// UPDATE
app.put("/notes/:id", async (req, res) => {
  const updated = await Note.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE
app.delete("/notes/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

app.listen(5000, "0.0.0.0", () => {
  console.log("Backend running on port 5000");
});