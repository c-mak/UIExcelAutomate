const childrenAppender = (parentElemet,childElements) => {
    childElements.forEach(childElement => {
        parentElemet.appendChild(childElement);
    });
}

const setAttributes = (element, attributes) => {
    Object.keys(attributes).forEach(key => {
        element.setAttribute(key, attributes[key]);
    });
}

const board = document.createElement(`div`);
const title = document.createElement(`h1`);
const text = document.createElement(`p`);
const submitButton = document.createElement(`div`);
const fileInput = document.createElement(`input`);
const fileField = document.createElement(`div`);

board.classList.add(`mainBoard`);
title.classList.add(`mainTitle`);
text.classList.add(`mainText`);
fileField.classList.add(`fileField`);
submitButton.setAttribute(`id`, `submitButton`);

setAttributes(fileInput, {
    id: `file-input`,
    type: `file`,
    name: `file-input`,
    multiple: true
});


title.textContent = `Uploading`;
text.textContent = `Parcourez et sectionnez les fichiers source`;
submitButton.textContent = `Upload file`;
fileField.textContent = `Parcourir...`;


childrenAppender(board, [title, text, fileField, submitButton]);
document.body.appendChild(board);


fileField.addEventListener(`click`, () => {
    try{
        fileInput.click();
        fileInput.addEventListener(`change`, (event) => {
            const selectedFiles = event.target.files;
            
            const fileNames = [];
            const selectedFilesArray = Array.from(selectedFiles);
            if (selectedFiles.length > 0) {
                selectedFilesArray.forEach(file => {
                    fileNames.push(file.name)
                });
                const filesString = fileNames.join(`,`);
                fileField.textContent = filesString;

                console.log(`${filesString} files selected successfully`);
            } else
                fileField.textContent = `Aucun fichier sélectionné.`; 
        });
    } catch(err) {
        console.log(`Error on filField clicked : ${err}`);
    }
});

// submitButton.addEventListener(`click`, async() => {

// });
