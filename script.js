const childrenAppender = (parentElemet, ...childElements) => {
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

setAttributes(fileInput, {
    id: `file-input`,
    type: `file`,
    name: `file-input`,
    multiple: true
});


title.textContent = `Uploading`;
text.textContent = `Parcourez et sectionnez les fichiers source`;
submitButton.textContent = `Upload file`;
downloadButton.textContent = `Download file`;
fileField.textContent = `Parcourir...`;

childrenAppender(board, title, text, fileField, submitButton);
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
        console.log(`Error on filField clicked : ${err}`);
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

        const response = await axios.post(`https://chamois-happy-usually.ngrok-free.app/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (response.status === 200) {
            const result = response.data;
            // const fileStringNames = result.files.join(`, `);
            // console.log(`File uploaded successfully: ${fileStringNames}`);
            // alert(`Fichier envoyé avec succès: ${fileStringNames}.`);
            fileField.textContent = `Parcourir...`;
            alert(result.message);
        
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
    window.location.href = `https://chamois-happy-usually.ngrok-free.app/download/importFileD`;
    board.removeChild(downloadButton);
    board.appendChild(submitButton);
});

downloadButton.addEventListener(`click`, () => {
    window.location.href = `https://chamois-happy-usually.ngrok-free.app/download/importFileC`;
    setTimeout(() => downloadButton2.click(), 3000);
});