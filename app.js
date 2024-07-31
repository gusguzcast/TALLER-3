// app.js
// Configura AWS S3
AWS.config.update({
    accessKeyId: 'ASIAVMIKFQH7C6H7XB6J', 
    secretAccessKey: ,
    sessionToken: 'IQoJb3JpZ2luX2VjEJP//////////wEaCXVzLXdlc3QtMiJHMEUCIQDzQC4Zg3hebc7kQLMkxO4GwIhQY/5QABl+Uh7CrAy/TgIgEtoqsMmruxGUWT1G36myqXcvAj/j7Q4pQEGeWcPvcU4qogIIHBAAGgwzNjk5MjUzOTA4NDYiDDPXIqRIsh4uAofsmir/ARp4B/0ehrWnuo+VFtnG7FWkAiz2Iw2KYeiLkgKjYY9gflun/Iu9YeNgEV3eTJ7HOQ9KsCINj3cPkMdH8AMVLPnkQYYXGxZ5rdXldlpYS7J5svFCsEvwN/ib9BUEiFoMMMO5dxo/QoHoD1igR1lK5rCHoQo49IOEC5X/70JSRdDxHvLjAE8Luy+qEHAc1elxal7Rj4JURyCNScaF385UfM74ryfkNtyHEQGsRacOavFSv6+zBZRYiLkCFQbdy4x/sUX2NjpdlMyaEhOmzE+y5hDeKDCQrLS6mqPHrHKEopO/XD3k10RSpMPwVavVn3NsClT51zz9kH5R+fVNAne9MDDY5t2yBjqdAdrmyGhurRtmT9khYMAPSDOQXZcSiBjEiaBWznmJsP27F0Ppf/6LZjidyCN7t/254rx9p9ERP2SwNy7HTvpTeS1YAgv3PSeb6ChY3ifHhiY5tjlay2UCV/kK2UCjZUymfusweRDFJdCHJtXESvG1zVGH6Lm+bhVySHzktnTJWHBaY+WUcYrW54k1wIBOqdBmtHIHl6Aqs+R6lCChk84=',
    region: 'us-east-1'
});

const s3 = new AWS.S3();
const bucketName = 'taller3-image';

// Función para subir archivos
document.getElementById('upload-button').addEventListener('click', () => {
    const files = document.getElementById('file-upload').files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const params = {
            Bucket: bucketName,
            Key: file.name,
            Body: file,
            ACL: 'public-read' // Para hacer las imágenes públicamente accesibles
        };

        s3.upload(params, (err, data) => {
            if (err) {
                console.error('Error subiendo el archivo:', err);
            } else {
                console.log('Archivo subido con éxito:', data.Location);
                mostrarImagenEnGaleria(data.Location);
            }
        });
    }
});


document.getElementById('registrationForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const dataPost = {
        "TableName":"TableTaller3",
            "Item":{
                "idNumber":document.getElementById('idNumber').value,
                "nombre": document.getElementById('firstName').value,
                "email": document.getElementById('email').value,
                "cedula": document.getElementById('idNumber').value
            }
    };

    try {
        await fetch('https://zxf73al9g3.execute-api.us-east-1.amazonaws.com/default/taller3', {
            method: 'POST',
            body: dataPost,
        });
        fetchRegistrations();
    } catch (error) {
        console.error('Error submitting the form', error);
    }
});


document.addEventListener('DOMContentLoaded', fetchRegistrations);
