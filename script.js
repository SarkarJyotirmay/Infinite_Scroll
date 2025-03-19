const API_ACCESS_KEY = "44emZQDoTjsry2VW4J9HnsAX_BH2UxkoftqXuBoTc4w";
const basePath = `https://api.unsplash.com/photos/random`;

let loaded;
const imageContainer = document.querySelector(".image-container");
const loader = document.querySelector(".lds-ripple");
const mode = document.querySelector(".mode");
const round = document.querySelector(".round");



async function getPhotos(){
   let data = await getData(`${basePath}?count=30&client_id=${API_ACCESS_KEY}`);
   displayPhotos(data);

}

 function displayPhotos(arr){
    loader.style.display = "block";
    const fragment = document.createDocumentFragment();

    arr.forEach((obj) => {
        const anchor = document.createElement("a");
        anchor.href = obj.links.html;
        anchor.target = "blank";

        const photoDiv = document.createElement("div");
        photoDiv.classList.add("photo-div");

        const image = document.createElement("img");
        image.src = obj.urls.small;

        photoDiv.append(image);
        anchor.append(photoDiv);
        fragment.append(anchor);
    });
    imageContainer.append(fragment);
    loaded = true;
    loader.style.display = "none";
}

async function getData(url){
   try{
    const response =  await fetch(url);
   const result = await response.json();
   console.log(result);
   return result;
   }
   catch{
    console.log("Error a gaya bhai");
   }
}

window.addEventListener("scroll", (e)=>{
    if(window.scroll.Y + window.innerHeight >= document.body.offsetHeight && loaded){
        getPhotos();
    }
})

getPhotos();

// mode
mode.addEventListener("click", (e)=>{
    round.classList.toggle("move-right");
        document.body.classList.toggle("dark-mode-body")
        round.classList.toggle("dark-mode-round");
        mode.classList.toggle("dark-mode-div");
    
})