import { useState, useEffect } from "react";

function Meme()
{
    const[meme,setMeme]=useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })

    
    const[allMemeImages,setAllMemeImages]=useState([])
    useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then(res=>res.json())
        .then(data=>setAllMemeImages(data.data.memes))

    },[])

    function getMemeImage()
    {
        const randomNumber=Math.floor(Math.random()*allMemeImages.length)
        const url=allMemeImages[randomNumber].url
        setMeme(prevMeme=>({
            ...prevMeme,
            randomImage:url
        }))
         
    }
    function handleChange(event)
    {
        const {name,value}=event.target
        setMeme(prevMeme=>({
            ...prevMeme,
            [name]: value

        }))
    }
    return(
        <main>
            <div className="form" >
                  
                <input className="form-input" 
                id ="top-text " 
                type="text" 
                placeholder="Top text" 
                name="topText"
                value={meme.topText}
                onChange={handleChange}
                />
                
            
                  
                <input className="form-input" 
                id="bottom-text" 
                type="text" 
                placeholder="Bottom text"
                name="bottomText"
                value={meme.bottomText}
                onChange={handleChange}
                />
                
                <button onClick={getMemeImage} className="form-button">Get a new image here 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} alt="image not loading" className='meme-image' />
                <h2 className='meme-text top'>{meme.topText}</h2>
                <h2 className='meme-text bottom'>{meme.bottomText}</h2>
                </div>
        </main>


    )
}
export default Meme