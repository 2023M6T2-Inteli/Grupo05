import React, {useState, useEffect} from "react";

function ImageDisplay({ filename, updateImage }){
    const [imgURL, setImgURL] = useState('');

    useEffect(() => {
        console.log('Carregando imagem...');

        fetch('http://localhost:3000/image-mostrar/' + filename)
        .then(response => response.blob())
        .then(blob => {
            const reader = new FileReader();
            reader.onload = () => {
                setImgURL(reader.result);
            };

            reader.readAsDataURL(blob);

            console.log(imgURL);
        })
        .catch(error => console.log(error));
    }, [filename]);

    useEffect(() => {
        updateImage(filename);
      }, [filename, updateImage]);

    return (
        <div>
            {imgURL && <img src={imgURL} alt="Teste"/>}
        </div>
    );
}

export default ImageDisplay;