import React, { Component, useState } from 'react';

function CargarDatos() {
    const [myValue, setMyValue] = useState('')
    const readFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const fileReader = new FileReader();

        fileReader.readAsText(file);

        fileReader.onload = () => {
            console.log(fileReader.result);
            setMyValue(fileReader.result);
        }

        fileReader.onerror = () => {
            console.log(fileReader.error);
        }

    }

    return (
        <div>

                <h1>Leer y escribir archivos de texto </h1>
                <textarea
                    cols="30"
                    rows="10"
                    placeholder="Ingrese lo que desea grabar"
                    value={myValue}
                    onChange={(e) => setMyValue(e.target.value)}
                ></textarea>

                <br />
                <input
                    type="file"
                    multiple={false}
                    onChange={readFile}
                />

                <br />

                

        </div>
    );
}

export default CargarDatos;