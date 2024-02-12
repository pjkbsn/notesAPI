import { getData } from "../APIs/getAPI";
import { showOverlay } from "./displayNotes";

const container: HTMLDivElement = document.createElement('div');
container.setAttribute('class', 'container')
document.body.appendChild(container);

const inputForm: HTMLInputElement = document.createElement('input');
inputForm.setAttribute('class', 'text-input');
inputForm.type = 'text';
inputForm.placeholder = 'Username here...';
container?.appendChild(inputForm);


const inputButton: HTMLButtonElement = document.createElement('button');
inputButton.setAttribute('class', 'input-button');
inputButton.textContent = 'Get notes';
container.appendChild(inputButton);


inputButton.addEventListener('click', async function () {
    const inputValue = inputForm.value.toUpperCase();
    const notesData = await getData(inputValue);

    // Visa noterna i notesContainer
    showOverlay(notesData);
});

