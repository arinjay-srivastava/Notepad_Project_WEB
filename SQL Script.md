CREATE DATABASE Notepad;
USE Notepad;

CREATE TABLE User (
    Userid INT AUTO_INCREMENT PRIMARY KEY,
    Firstname VARCHAR(255) NOT NULL,
    Lastname VARCHAR(255) NOT NULL,
    Username VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Deleted BOOLEAN DEFAULT FALSE
    
);
ALTER TABLE User
ADD Email VARCHAR(255) NOT NULL AFTER Username;

CREATE TABLE Note (
    Noteid INT AUTO_INCREMENT PRIMARY KEY,
    Content TEXT NOT NULL,
    Userid INT,
    FOREIGN KEY (userid) REFERENCES User(userid),
    CreatedTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    DeletedTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE User
ADD Email VARCHAR(255) NOT NULL AFTER Username;

This SQL code creates the "User" and "Note" tables with the following features:

The "User" table has an auto-incrementing primary key userid and "NOT NULL" constraints for the first name, last name, username, and password and it has a "DEFAULT" constraint for the deleted column with a default value of FALSE.

If we ever delete a user, the deleted column will be set to TRUE. But if the user ever wants to rejoin, we can set the deleted column back to FALSE.

The "Note" table also has an auto-incrementing primary key noteid and a "NOT NULL" constraint for the content. It establishes a relationship with the "User" table via the userid foreign key and TIMESTAMP columns for the created and deleted times.


