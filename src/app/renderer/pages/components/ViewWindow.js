import React, {useState, useEffect} from "react";

function ImageDisplay(){
    const [imgURL, setImgURL] = useState('')

    useEffect(() => {
        fetch('http://localhost:3000/imagem-caminho/mapa-30-05-2023-164403.jpg')
        .then(response => response.json())
        .then(data => {setImgURL(data.path)})
        .catch(error => console.log(error));
    }, []);

    return (
        <div>
            {imgURL && <img src={imgURL} alt="Teste"/>}
        </div>
    );
}

export default ImageDisplay;