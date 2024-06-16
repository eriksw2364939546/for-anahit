const API_KEY = "AIzaSyCtDA0FIj2lntU3WbU2z8DZAq6NB3AYLRg";

const YT_URL = "https://www.youtube.com/iframe_api";

const playerInp = document.querySelector(".player input")
const playerForm = document.querySelector(".player .search__video-form")
const playerResult = document.querySelector(".player__search-results")
const playerScreen = document.querySelector(".player__screen")

let player

function playVideoById(id){
    player.loadVideoById(id);
    player.playVideo();
}

function loadScript (url){
    return new Promise((resolve, reject)=>{
        window.onYouTubeIframeAPIReady = resolve;

    let script = document.createElement('script');
    script.src = url;
    document.head.append(script);
    script.onerror = reject;
        
    })
    
}
 loadScript(YT_URL).then(()=> {
    setTimeout(()=>{
        player = new YT.Player(playerScreen, {
            width: "300",
            height: "210"
        })
    }, 200)

 })

function searchVideo (){
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${playerInp.value}&key=${API_KEY}`

    fetch (url).then(response => response.json()).then(data => renderVideo(data))
}

playerForm.addEventListener("submit", (e) => {
    e.preventDefault()
    searchVideo()
})

playerResult.addEventListener("click", (e) =>{
    let clikedVideo = e.target.closest(".player__search-video")

    if(clikedVideo){
        playVideoById(clikedVideo.dataset.id)
    }
})

function renderVideo (data){
    let videoHtml = ""

    data.items.forEach(element => {
        videoHtml += `
        <div class="player__search-video row" data-id="${element.id.videoId}">

        <div class="video__img">
            <img class="video__img-item" src="${element.snippet.thumbnails.default.url}" alt="video">
        </div>
        <div class="video__description">
            <h3 class="video__description-title">${element.snippet.title}</h3>
            <p class="video__description-title2">${element.snippet.channelTitle}</p>
        </div>

    </div>`
    })
    playerResult.innerHTML = videoHtml
}