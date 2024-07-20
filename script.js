document.addEventListener('DOMContentLoaded', function () {
    const noteList = document.getElementById('note-list');
    const titleInput = document.getElementById('note-title');
    const descriptionInput = document.getElementById('note-description');
    const saveButton = document.getElementById('save-note');
    const boldButton = document.getElementById('bold');

    // Initialize an array to store notes
    const notes = [];


    // Function to display notes
    function displayNotes() {
        noteList.innerHTML = '';
        notes.forEach((note, index) => {
            const noteItem = document.createElement('div');
            noteItem.classList.add('note-item');

            noteItem.innerHTML = `
                <div class="note-header">
                    <h3>${note.title}</h3>
                </div>
                <div class="note-description">
                    <p>${note.description}</p>
                </div>
                <div class="note-buttons">
                    <button type="button" class="btn btn-primary btn-sm edit-note" data-index="${index}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                    </button>
                    <button type="button" class="btn btn-primary btn-sm delete-note" data-index="${index}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                        </svg>
                    </button>
                </div>
            `;
            

            noteList.appendChild(noteItem);
        });

        // Add event listeners for edit and delete buttons
        const editButtons = document.querySelectorAll('.edit-note');
        const deleteButtons = document.querySelectorAll('.delete-note');

        editButtons.forEach((button) => {
            button.addEventListener('click', handleEditNote);
        });

        deleteButtons.forEach((button) => {
            button.addEventListener('click', handleDeleteNote);
        });
    }

    // Add a new note
    saveButton.addEventListener('click', function () {
        const newTitle = titleInput.value.trim();
        const newDescription = descriptionInput.value.trim();
        if (newTitle !== '' && newDescription !== '') {
            const newNote = {
                title: newTitle,
                description: newDescription,
                backgroundColor: selectedColor // Store the selected background color
            };
            notes.push(newNote);
            titleInput.value = '';
            descriptionInput.value = '';
            displayNotes();
        }
    });

    // Edit a note
    function handleEditNote(event) {
        const index = event.target.getAttribute('data-index');
        const updatedTitle = notes[index].title;
        const updatedDescription = notes[index].description;

        if (updatedTitle !== null && updatedDescription !== null) {
            notes[index].title = updatedTitle;
            notes[index].description = updatedDescription;
            displayNotes();

            // Update the input fields with the edited values
            titleInput.value = updatedTitle;
            descriptionInput.value = updatedDescription;
        }
    }

    // Delete a note
    function handleDeleteNote(event) {
        const index = event.target.getAttribute('data-index');
        if (confirm('Are you sure you want to delete this note?')) {
            notes.splice(index, 1);
            displayNotes();
        }
    }

    // Initial display of notes
    displayNotes();
});
