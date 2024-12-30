const childrenAppender = (parentElemet,childElements) => {
    childElements.forEach(childElement => {
        parentElemet.appendChild(childElement);
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

fileInput.setAttribute(`id`, `file-input`);
fileInput.setAttribute(`type`, `file`);
fileInput.setAttribute(`name`, `file-input`);
fileInput.setAttribute(`multiple`, true);


title.textContent = `Uploading`;
text.textContent = `Parcourez et sectionnez les fichiers source`;
submitButton.textContent = `Upload file`;
fileField.textContent = `Parcourir...`;


childrenAppender(board, [title, text, fileField, submitButton]);
document.body.appendChild(board);


fileField.addEventListener('click', () => {
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
                const filesString = fileNames.join(`, `);
                fileField.textContent = filesString;
                console.log(filesString);
            } else
                fileField.textContent = `Aucun fichier sélectionné.`; 
        });
    } catch(err) {
        console.error(`Error: ${err.message}`);
    }
});

submitButton.addEventListener(`click`, async () => {
    try {
        const files = fileInput.files;
        if (files.length === 0) {
            alert(`Veuillez sélectionner le fichier`);
            return; 
        }
        
        const fromData = new FormData();
        const filesArray = Array.from(files);
        filesArray.forEach(file => {
            fromData.append(`files`, file);
        });
        const response = await fetch(`http://127.0.0.1:20000`, {
            method: `POST`,
            body: fromData
        });

        if(response.ok) {
            const result = await response.json();
            console.log(`Fichier envoyé avec succès: ${result}`);
        } else
            alert(`Erreur lors de l'envoi du fichier`);
        
    } catch (err) {
        console.error(`Erreur lors de la connexion au serveur >> ${err.message}`);
    }
});
