import React, {useState, useEffect} from "react";

function ImageDisplay(){
    const [imgURL, setImgURL] = useState('')

    useEffect(() => {
        fetch('https://picsum.photos/1000/600')
        .then(response => response.url)
        .then(data => setImgURL(data))
        .catch(error => console.log(error));
    }, []);

    return (
        <div>
            {imgURL && <img src={imgURL} alt="Teste"/>}
        </div>
    );
}

export default ImageDisplay;