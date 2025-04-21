const con = require("./db_connect");

async function createTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS User (
      userId INT AUTO_INCREMENT PRIMARY KEY,
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      username VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      deleted BOOLEAN DEFAULT FALSE
    );
  `;
  await con.query(sql);
}

async function login(user) {
  const foundUser = await getUser(user.username);
  if (!foundUser[0] || foundUser[0].deleted) throw new Error("Username not found");
  if (user.password !== foundUser[0].password) throw new Error("Password incorrect");
  return foundUser[0];
}

async function register(user) {
  const existingUser = await getUser(user.username);
  if (existingUser[0]) throw new Error("Username already in use");
  const sql = "INSERT INTO User (firstName, lastName, username, email, password) VALUES (?, ?, ?, ?, ?)";
  const values = [user.firstName, user.lastName, user.username, user.email || "", user.password];
  const result = await con.query(sql, values);
  const newUser = await getUser(user.username);
  return newUser[0];
}

async function editUser(user) {
  const sql = "UPDATE User SET firstName = ?, lastName = ?, username = ?, email = ? WHERE userId = ? AND deleted = FALSE";
  const values = [user.firstName, user.lastName, user.username, user.email || "", user.userId];
  const result = await con.query(sql, values);
  if (result.affectedRows === 0) throw new Error("User not found");
  const updatedUser = await getUser(user.username);
  return updatedUser[0];
}

async function deleteUser(user) {
  const sql = "UPDATE User SET deleted = TRUE WHERE userId = ? AND deleted = FALSE";
  const result = await con.query(sql, [user.userId]);
  if (result.affectedRows === 0) throw new Error("User not found");
}

async function getUser(username) {
  const sql = "SELECT * FROM User WHERE username = ?";
  return await con.query(sql, [username]);
}

async function getAllUsers() {
  const sql = "SELECT userId, firstName, lastName, username, email FROM User WHERE deleted = FALSE";
  return await con.query(sql);
}

module.exports = { createTable, login, register, editUser, deleteUser, getAllUsers };