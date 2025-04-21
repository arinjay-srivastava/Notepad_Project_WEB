const con = require("./db_connect");

async function createTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS User (
      userId INT AUTO_INCREMENT PRIMARY KEY,
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      username VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    );
  `;
  await con.query(sql);
}

async function login(user) {
  const foundUser = await getUser(user.username);
  if (!foundUser[0]) throw new Error("Username not found");
  if (user.password !== foundUser[0].password) throw new Error("Password incorrect");
  return foundUser[0];
}

async function register(user) {
  const existingUser = await getUser(user.username);
  if (existingUser[0]) throw new Error("Username already in use");
  const sql = "INSERT INTO User (firstName, lastName, username, password) VALUES (?, ?, ?, ?)";
  const values = [user.firstName, user.lastName, user.username, user.password];
  const result = await con.query(sql, values);
  const newUser = await getUser(user.username);
  return newUser[0];
}

async function editUser(user) {
  const sql = "UPDATE User SET firstName = ?, lastName = ?, username = ? WHERE userId = ?";
  const values = [user.firstName, user.lastName, user.username, user.userId];
  const result = await con.query(sql, values);
  if (result.affectedRows === 0) throw new Error("User not found");
  const updatedUser = await getUser(user.username);
  return updatedUser[0];
}

async function deleteUser(user) {
  const sql = "DELETE FROM User WHERE userId = ?";
  const result = await con.query(sql, [user.userId]);
  if (result.affectedRows === 0) throw new Error("User not found");
}

async function getUser(username) {
  const sql = "SELECT * FROM User WHERE username = ?";
  return await con.query(sql, [username]);
}

module.exports = { createTable, login, register, editUser, deleteUser };