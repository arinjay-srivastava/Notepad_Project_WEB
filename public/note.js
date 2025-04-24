function NoteModel(title, content, userId) {
  this.title = title;
  this.content = content;
  this.userId = userId;
  this.createdAt = new Date();
}

async function createNote(e) {
  e.preventDefault();
  const title = document.getElementById('noteTitle').value;
  const content = document.getElementById('noteContent').value;
  const userId = localStorage.getItem('userId');
  if (!userId) {
      alert('Please log in to create a note');
      return;
  }
  const newNote = new NoteModel(title, content, userId);
  try {
      const response = await fetch('http://localhost:3000/api/notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: `${title}: ${content}`, userId })
      });
      if (!response.ok) throw new Error('Failed to save note');
      alert('Note saved successfully');
      document.getElementById('noteForm').reset();
  } catch (err) {
      console.error(err);
      alert('Error saving note');
  }
}

const noteForm = document.getElementById('noteForm');
if (noteForm) {
  noteForm.addEventListener('submit', createNote);
}

async function displayNotes() {
  const userId = localStorage.getItem('userId');
  if (!userId) return;
  try {
      const response = await fetch(`/api/notes?userId=${userId}`);
      const notes = await response.json();
      const display = document.getElementById('notes-display');
      display.innerHTML = notes.map(note => `<div><strong>${note.content.split(': ')[0]}</strong>: ${note.content.split(': ')[1]}</div>`).join('');
  } catch (err) {
      console.error(err);
  }
}
document.addEventListener('DOMContentLoaded', displayNotes);