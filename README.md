# NotePad

## Description

NotePad is a simple web app for creating, viewing, editing, and deleting notes. It’s built with HTML, CSS, JavaScript, and Node.js, using a MySQL database to store notes securely. Users can register, log in, and manage their personal notes easily.

## Features

- **User Accounts**: Register and log in to manage your notes.
- **Note Management**: Add, view, edit, or delete notes.
- **Responsive Design**: Works on desktops and mobile devices.
- **Secure Storage**: Notes are saved in a MySQL database.
- **Soft Delete**: Deleted notes and accounts can be recovered.

## Business Rules

- A user may create multiple notes, but each note is associated with only one user.
- Users can only access and manage their own notes.

## Technologies

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Tools**: Express, MySQL2, Dotenv, Nodemon

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/arinjay-srivastava/Final-Project.git
   cd Final-Project
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file with:
   ```env
   MYSQL_HOST=localhost
   MYSQL_USERNAME=your_username
   MYSQL_PSD=your_password
   MYSQL_DB=Notepad
   PORT=3306
   ```

4. **Start the Server**:
   ```bash
   npm run dev
   ```

5. **Open the App**:
   Visit `http://localhost:3000` in your browser.

## Usage

- **Register**: Sign up on the "Register" page.
- **Login**: Log in to access your notes.
- **Manage Notes**: Create, view, edit, or delete notes on the "My Notes" page.
- **Logout**: Log out to end your session.


### **ER Diagram of the Project**

![image_2025-03-08_17-51-04](https://github.com/user-attachments/assets/62e69d55-8c90-4eb8-8f57-e7e331630326)


### **Relations Diagram**

![Relations Diagram](https://github.com/user-attachments/assets/c3e72744-43d7-40fb-814b-198d29a61583)
