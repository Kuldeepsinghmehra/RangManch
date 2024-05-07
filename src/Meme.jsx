


import { useState, useEffect } from "react";

function Meme() {
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    });

    const [allMemeImages, setAllMemeImages] = useState([]);
    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemeImages(data.data.memes));
    }, []);

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemeImages.length);
        const url = allMemeImages[randomNumber].url;
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }));
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }));
    }

    function handleDownload() {
        const img = new Image();
        img.crossOrigin = "anonymous"; // Enable CORS for the image
        img.src = meme.randomImage;
        img.onload = function () {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
            context.font = "30px Arial";
            context.fillStyle = "white";
            context.textAlign = "center";
            context.fillText(meme.topText, canvas.width / 2, 40);
            context.fillText(meme.bottomText, canvas.width / 2, canvas.height - 20);
            const dataUrl = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.download = "meme.png";
            link.href = dataUrl;
            link.click();
        };
    }

    return (
        <main>
            <div className="form">
                <input
                    className="form-input"
                    id="top-text"
                    type="text"
                    placeholder="Top text"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />

                <input
                    className="form-input"
                    id="bottom-text"
                    type="text"
                    placeholder="Bottom text"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />

                <button onClick={getMemeImage} className="form-button">Get a new image here 🖼</button>
                <button onClick={handleDownload} className="form-button">Download Meme 📥</button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} alt="image not loading" className='meme-image' />
                <h2 className='meme-text top'>{meme.topText}</h2>
                <h2 className='meme-text bottom'>{meme.bottomText}</h2>
            </div>
        </main>
    );
}

export default Meme;
