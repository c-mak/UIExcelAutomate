const childAppender = (parentElemet,childElements) => {
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
const downloadButton = document.createElement(`div`);
const downloadButton2 = document.createElement(`div`);
const fileInput = document.createElement(`input`);
const fileField = document.createElement(`div`);

board.classList.add(`mainBoard`);
title.classList.add(`mainTitle`);
text.classList.add(`mainText`);
fileField.classList.add(`fileField`);
submitButton.setAttribute(`id`, `submitButton`);
downloadButton.classList.add(`downloadButton`);

fileInput.setAttribute(`id`, `file-input`);
fileInput.setAttribute(`type`, `file`);
fileInput.setAttribute(`name`, `file-input`);
fileInput.setAttribute(`multiple`, true);


title.textContent = `Uploading`;
text.textContent = `Parcourez et sectionnez les fichiers source`;
submitButton.textContent = `Upload file`;
downloadButton.textContent = `Download file`;
fileField.textContent = `Parcourir...`;

childAppender(board, [title, text, fileField, submitButton]);
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
        
        const formData = new FormData();
        const filesArray = Array.from(files);
        filesArray.forEach(file => {
            formData.append(`files`, file);
        });
        const response = await fetch(`http://127.0.0.1:20000/upload`, {
            method: `POST`,
            body: formData
        });

        const result = await response.json();
        const fileNames = result.files.join(', ');
        const message = result.message;
        const errorServer = result.error;

        if(response.ok) {
            console.log(`${message}: ${fileNames}`);
            alert(`${message}: ${fileNames}`);
        } else {
            console.log(`${message} >> ${errorServer}`);
            alert(`${message} >> ${errorServer}`);
        }
        
    } catch (err) {
        console.error(`Erreur lors de la connexion au serveur >> ${err}`);
        alert(`Erreur lors de la connexion au serveur >> ${err}`);
    }
});

submitButton.addEventListener(`click`, async () => {
    try {
        const files = fileInput.files;
        if (files.length === 0) {
            alert(`Veuillez sélectionner le fichier`);
            return;
        }

        const formData = new FormData();
        Array.from(files).forEach(file => formData.append(`files`, file));

        const response = await axios.post(`http://127.0.0.1:20000/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (response.status === 200) {
            const result = response.data;
            const fileStringNames = result.files.join(`, `);
            console.log(`File uploaded successfully: ${fileStringNames}`);
            alert(`Fichier envoyé avec succès: ${fileStringNames}.`);
            fileField.textContent = `Parcourir...`;
        
            board.removeChild(submitButton);
            board.appendChild(downloadButton);
        } else
        alert(`Erreur lors de l'envoi du fichie.`);
    } catch (err) {
        console.error(`Error on connection with server >> ${err.message}`);
        alert(`Erreur lors de la connexion au serveur.`);
    }
});

downloadButton2.addEventListener(`click`, () => {
    window.location.href = `http://127.0.0.1:20000/download/importFileD`;
});

downloadButton.addEventListener(`click`, () => {
    window.location.href = `http://127.0.0.1:20000/download/importFileC`;
    setTimeout(() => downloadButton2.click(), 3000);
});
