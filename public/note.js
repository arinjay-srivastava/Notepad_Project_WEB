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
      window.location.href = 'login.html';
      return;
  }
  const newNote = new NoteModel(title, content, userId);
  try {
      const response = await fetch('/api/notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: `${title}: ${content}`, userId })
      });
      if (!response.ok) throw new Error('Failed to save note');
      alert('Note saved successfully');
      document.getElementById('noteForm').reset();
      await displayNotes();
  } catch (err) {
      console.error(err);
      alert('Error saving note');
  }
}

async function deleteNote(noteId) {
  try {
      const response = await fetch(`/api/notes/${noteId}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error('Failed to delete note');
      alert('Note deleted successfully');
      await displayNotes(); // Refresh the notes list
      const selectedNote = document.getElementById('selected-note');
      if (selectedNote) {
          selectedNote.innerHTML = '<p>Select a note from the sidebar to view its details.</p>';
      }
  } catch (err) {
      console.error(err);
      alert('Error deleting note');
  }
}

async function displayNotes() {
  const userId = localStorage.getItem('userId');
  if (!userId) return;
  try {
      const response = await fetch(`/api/notes?userId=${userId}`);
      const notes = await response.json();
      const notesList = document.getElementById('notes-list');
      if (!notesList) return;
      notesList.innerHTML = notes.length > 0
          ? notes.map(note => `
              <li data-noteid="${note.noteId}">
                  <span onclick="viewNote(${note.noteId}, '${note.content.split(': ')[0]}', '${note.content.split(': ')[1].replace(/'/g, "\\'")}')">${note.content.split(': ')[0]}</span>
                  <button class="delete-btn" onclick="deleteNote(${note.noteId})">Delete</button>
              </li>`).join('')
          : '<li>No notes available.</li>';
  } catch (err) {
      console.error(err);
      alert('Error fetching notes');
  }
}

function viewNote(noteId, title, content) {
  const selectedNote = document.getElementById('selected-note');
  if (!selectedNote) return;
  selectedNote.innerHTML = `
      <h4>${title}</h4>
      <p>${content}</p>
  `;
  const noteItems = document.querySelectorAll('#notes-list li');
  noteItems.forEach(item => {
      item.classList.toggle('active', item.dataset.noteid == noteId);
  });
}

const noteForm = document.getElementById('noteForm');
if (noteForm) {
  noteForm.addEventListener('submit', createNote);
}

document.addEventListener('DOMContentLoaded', displayNotes);