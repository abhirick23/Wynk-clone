console.log("welcome to wynk");
//imitialize
let songIndex=0;
let audioElement = new Audio('wynk/songs-20220225T084800Z-001/songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgress = document.getElementById('myProgress');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songitems = Array.from(document.getElementsByClassName('songitems'));

let songs = [
    {songName:"love me", filePath: "wynk/songs-20220225T084800Z-001/songs/1.mp3", coverPath: "wynk/covers-20220225T085304Z-001/covers/1.jpg"},
    {songName:"love me", filePath: "wynk/songs-20220225T084800Z-001/songs/2.mp3", coverPath: "wynk/covers-20220225T085304Z-001/covers/2.jpg"},
    {songName:"love me", filePath: "wynk/songs-20220225T084800Z-001/songs/3.mp3", coverPath: "wynk/covers-20220225T085304Z-001/covers/3.jpg"},
    {songName:"love me", filePath: "wynk/songs-20220225T084800Z-001/songs/4.mp3", coverPath: "wynk/covers-20220225T085304Z-001/covers/4.jpg"},
    {songName:"love me", filePath: "wynk/songs-20220225T084800Z-001/songs/5.mp3", coverPath: "wynk/covers-20220225T085304Z-001/covers/5.jpg"},
    {songName:"love me", filePath: "wynk/songs-20220225T084800Z-001/songs/6.mp3", coverPath: "wynk/covers-20220225T085304Z-001/covers/6.jpg"},
]

songitems.forEach((element,i) => {
    document.getElementsByTagName('img')[0].src = songs[i].coverPath;
    document.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});


masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity =1;
    }
    else
    {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity =0;

    }
})

//listen
audioElement.addEventListener('timeupdate', ()=>{
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)/100);
    myProgress.value = progress;
})

myProgress.addEventListener('change',()=>{
    audioElement.currentTime = myProgress.value* audioElement.duration /100;
})


const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})