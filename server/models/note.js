const con = require("./db_connect");

async function createTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS Note (
      noteId INT AUTO_INCREMENT PRIMARY KEY,
      content TEXT NOT NULL,
      userId INT,
      createdTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      deletedTime TIMESTAMP NULL,
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
  const sql = "SELECT * FROM Note WHERE noteId = ? AND deletedTime IS NULL";
  const result = await con.query(sql, [noteId]);
  return result;
}

async function getAllNotesByUserId(userId) {
  const sql = "SELECT * FROM Note WHERE userId = ? AND deletedTime IS NULL";
  const result = await con.query(sql, [userId]);
  return result;
}

async function getAllNotes() {
  const sql = "SELECT noteId, content, userId, createdTime FROM Note WHERE deletedTime IS NULL";
  const result = await con.query(sql);
  return result;
}

async function updateNoteById(noteId, updatedNote) {
  if (!updatedNote.content) {
    throw new Error("Content is required");
  }
  const sql = "UPDATE Note SET content = ? WHERE noteId = ? AND deletedTime IS NULL";
  const values = [updatedNote.content, noteId];
  const result = await con.query(sql, values);
  return result.affectedRows > 0;
}

async function deleteNoteById(noteId) {
  const sql = "UPDATE Note SET deletedTime = CURRENT_TIMESTAMP WHERE noteId = ? AND deletedTime IS NULL";
  const result = await con.query(sql, [noteId]);
  return result.affectedRows > 0;
}

module.exports = { createTable, createNote, getNoteById, getAllNotesByUserId, getAllNotes, updateNoteById, deleteNoteById };