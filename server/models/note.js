const con = require("./db_connect");

async function createTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS Note (
      noteId INT AUTO_INCREMENT PRIMARY KEY,
      content TEXT NOT NULL,
      userId INT,
      FOREIGN KEY (userId) REFERENCES User(userId)
    );
  `;
  await con.query(sql);
}

async function createNote(note) {
  if (!note.content || !note.userId) {
    throw new Error("Content and userId are required");
  }
  const sql = "INSERT INTO Note (content, userId) VALUES (?, ?)";
  const values = [note.content, note.userId];
  const result = await con.query(sql, values);
  return result.insertId;
}

async function getNoteById(noteId) {
  const sql = "SELECT * FROM Note WHERE noteId = ?";
  const result = await con.query(sql, [noteId]);
  return result;
}

async function getAllNotesByUserId(userId) {
  const sql = "SELECT * FROM Note WHERE userId = ?";
  const result = await con.query(sql, [userId]);
  return result;
}

async function updateNoteById(noteId, updatedNote) {
  if (!updatedNote.content) {
    throw new Error("Content is required");
  }
  const sql = "UPDATE Note SET content = ? WHERE noteId = ?";
  const values = [updatedNote.content, noteId];
  const result = await con.query(sql, values);
  return result.affectedRows > 0;
}

async function deleteNoteById(noteId) {
  const sql = "DELETE FROM Note WHERE noteId = ?";
  const result = await con.query(sql, [noteId]);
  return result.affectedRows > 0;
}

module.exports = { createTable, createNote, getNoteById, getAllNotesByUserId, updateNoteById, deleteNoteById };