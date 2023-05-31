import React, {useState, useEffect} from "react";

function ImageDisplay(){
    const [imgURL, setImgURL] = useState('');
    const filename = 'mapa-30-05-2023-164403.jpg';

    useEffect(() => {
        fetch('http://localhost:3000/image-mostrar/' + filename)
        .then(response => response.blob())
        .then(blob => {
            const reader = new FileReader();
            reader.onload = () => {
                setImgURL(reader.result);
            };

            reader.readAsDataURL(blob);
        })
        .catch(error => console.log(error));
    }, []);

    return (
        <div>
            {imgURL && <img src={imgURL} alt="Teste"/>}
        </div>
    );
}

export default ImageDisplay;