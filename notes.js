// Note object constructor
function Note(title, content) {
    this.title = title;
    this.content = content;
    this.createdAt = new Date(); // This will set the time when the note is created

// Note creation function
function createNote(e) {
    e.preventDefault(); 

    // Form inputs
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;
    const newNote = new Note(title, content);
    console.log(newNote);
}

// Event listener to the note creation form
    const noteForm = document.getElementById('noteForm');
    if (noteForm) {
        noteForm.addEventListener('submit', createNote);
    }
;
}