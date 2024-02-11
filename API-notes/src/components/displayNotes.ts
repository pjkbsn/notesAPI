import { Notes } from "../types/interface";
import { postData } from "../APIs/postNote";
import { updateData } from "../APIs/updateNote";
import { deleteData } from "../APIs/deleteNote";


export const showOverlay = (notesData: Notes[]) => {
    const overlay: HTMLDivElement = document.createElement('div');
    overlay.setAttribute('class', 'overlay');

    const notesContainer: HTMLDivElement = document.createElement('div');
    notesContainer.setAttribute('class', 'notes-container');

    const newNote: HTMLDivElement = document.createElement('div');
    newNote.setAttribute('class', 'new-note');

    const newTitle: HTMLInputElement = document.createElement('input');
    newTitle.setAttribute('class', 'new-title');
    newTitle.type = 'text';
    newTitle.placeholder = 'Title here... min 5char';

    const newText: HTMLTextAreaElement = document.createElement('textarea');
    newText.setAttribute('class', 'new-text');
    newText.placeholder = 'Write your notes here... min 5char';

    const newButton: HTMLButtonElement = document.createElement('button');
    newButton.setAttribute('class', 'new-button');
    newButton.innerText = 'Post';

    let usernameAdded: boolean = false;

    const inputUsername: HTMLInputElement | null = document.querySelector('.text-input');
    const username: string | undefined = inputUsername.value.toUpperCase();


    // Skapa ett <div>-element för varje anteckning
    notesData.forEach((note: Notes) => {
        const allNotes: HTMLDivElement = document.createElement('div');
        allNotes.setAttribute('class', 'all-notes');
        notesContainer.appendChild(allNotes);


        if (!usernameAdded && note.username) {
            const noteUsername: HTMLDivElement = document.createElement('div');
            noteUsername.setAttribute('class', 'note-username');
            noteUsername.textContent = username;/* note.username.toUpperCase(); */

            overlay.appendChild(noteUsername)

            usernameAdded = true;
        }
        const updateButton: HTMLButtonElement = document.createElement('button');
        updateButton.setAttribute('class', 'updateButton');
        updateButton.innerText = 'Update';
        updateButton.dataset.noteID = note.id;

        const noteTitle: HTMLDivElement = document.createElement('div');
        noteTitle.setAttribute('class', 'note-title');
        noteTitle.textContent = `Title: ${note.title}`;

        const noteNote: HTMLDivElement = document.createElement('div');
        noteNote.setAttribute('class', 'note-note');
        noteNote.textContent = `Note: ${note.note}`;

        const noteDate: HTMLDivElement = document.createElement('div');
        noteDate.setAttribute('class', 'note-date');
        noteDate.textContent = `Date: ${note.createdAt}`;


        const deleteButton: HTMLButtonElement = document.createElement('button');
        deleteButton.setAttribute('class', 'deleteButton');
        deleteButton.innerText = 'Delete';


        allNotes.appendChild(noteDate)
        allNotes.appendChild(noteTitle)
        allNotes.appendChild(noteNote)
        allNotes.appendChild(deleteButton)
        allNotes.appendChild(updateButton)


        updateButton.addEventListener('click', () => {

            //GÖM NEWNOTE

            newNote.style.display = 'none';

            const noteID: string = note.id;


            const updateNote: HTMLDivElement = document.createElement('div');
            updateNote.setAttribute('class', 'update-note');

            const updateText: HTMLTextAreaElement = document.createElement('textarea');
            updateText.setAttribute('class', 'update-text');
            updateText.textContent = note.note;


            const updatePostButton: HTMLButtonElement = document.createElement('button');
            updatePostButton.setAttribute('class', 'updatepost-button');
            updatePostButton.textContent = 'Update note';

            const updateCloseButton: HTMLButtonElement = document.createElement('button');
            updateCloseButton.setAttribute('class', 'updateclose-button');
            updateCloseButton.textContent = 'Close';




            overlay.appendChild(updateNote)
            updateNote.appendChild(updateText)
            updateNote.appendChild(updatePostButton)
            updateNote.appendChild(updateCloseButton)

            updateCloseButton.addEventListener('click', () => {
                newNote.style.display = 'grid';
                updateNote.parentNode?.removeChild(updateNote);
            })

            updatePostButton.addEventListener('click', async () => {
                newNote.style.display = 'grid';
                const newText: string = updateText.value;

                console.log(updateButton);


                await updateData(newText, noteID, username);



                document.body.removeChild(overlay);
                updateNote.parentNode?.removeChild(updateNote);
            })

        });

        deleteButton.addEventListener('click', async () => {
            const noteID: string = note.id;
            console.log(noteID);

            await deleteData(noteID, username);
            document.body.removeChild(overlay);
        });



    });




    const overlayButton: HTMLButtonElement = document.createElement('button');
    overlayButton.setAttribute('class', 'overlay-button');
    overlayButton.textContent = 'X';


    overlay.appendChild(newNote);
    overlay.appendChild(notesContainer);
    overlay.appendChild(overlayButton);

    newNote.appendChild(newTitle);
    newNote.appendChild(newText);
    newNote.appendChild(newButton);


    document.body.appendChild(overlay);



    newButton.addEventListener('click', async () => {
        const postTitle: string = newTitle.value;
        const postText: string = newText.value;

        if (postTitle.length < 5 || postText.length < 5) {
            return;
        }

        await postData(postTitle, postText, username)

        document.body.removeChild(overlay);
    });

    // Lägg till event listener för att stänga overlay vid klick på knapp
    overlayButton.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });
};