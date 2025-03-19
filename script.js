const API_ACCESS_KEY = "6qPx-WOPnlVxAD3cHUis2rVxAwPhsZJUafwFLHAZ_-w";
const API_ACCESS_KEY2 = "pPf0b6TnHCt3ROnc3nzNo1RpP42QQl_Cqbt68X7Hq9c";

const basePath = `https://api.unsplash.com/photos/random`;


let loaded = false; // to check if the images from API has been loaded atleast once or not

const imageContainer = document.querySelector(".image-container");
const loader = document.querySelector(".lds-ripple");
const mode = document.querySelector(".mode");
const round = document.querySelector(".round");


// calls getData and displayData function to fetch and show data(Images)
async function getPhotos(){
   let data = await getData(`${basePath}?count=30&client_id=${API_ACCESS_KEY2}`);
   console.log("get photos se a raha hai");
   displayPhotos(data);
}

// 
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
    console.log("Data nahi aya bhai");
   }
}

// implimenting throttling on the scroll
window.addEventListener("scroll", (e)=>{
    if(Math.ceil(window.scrollY) + window.innerHeight >= document.body.offsetHeight && loaded){
        getPhotos();
    }
})

//! Start of the code execution on page 
getPhotos();

// mode
mode.addEventListener("click", (e)=>{
    round.classList.toggle("move-right");
        document.body.classList.toggle("dark-mode-body")
        round.classList.toggle("dark-mode-round");
        mode.classList.toggle("dark-mode-div");
    
})