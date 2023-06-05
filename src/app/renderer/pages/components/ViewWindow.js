import React, {useState, useEffect} from "react";

function ImageDisplay({ filename }){
    const [imgURL, setImgURL] = useState('');

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
    }, [filename]);

    return (
        <div>
            {imgURL && <img src={imgURL} alt="Teste"/>}
        </div>
    );
}

export default ImageDisplay;