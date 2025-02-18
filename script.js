//initialization of variables
let songIndex = -1;
let audioElement = new Audio("song1.mp3");
let masterPlay = document.getElementById("masterPlay");
let masterSongName = document.getElementById("masterSongName");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let albumImg = document.getElementsByClassName("albumimg")[0];
albumImg.src = "albumcvr.jpg";
const songs = [
  {
    songName: "Song 1",
    filePath: "songs/song1.mp3",
    coverPath: "cover/cover1.jpg",
  },
  {
    songName: "Song 2",
    filePath: "songs/song2.mp3",
    coverPath: "cover/cover2.jpg",
  },
  {
    songName: "Song 3",
    filePath: "songs/song3.mp3",
    coverPath: "cover/cover3.jpg",
  },
  {
    songName: "Song 4",
    filePath: "songs/song4.mp3",
    coverPath: "cover/cover4.jpg",
  },
  {
    songName: "Song 5",
    filePath: "songs/song5.mp3",
    coverPath: "cover/cover5.jpg",
  },
];
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});
//Handle master play/pause click
masterPlay.addEventListener("click", () => {
  if (songIndex == -1) {
    return false;
  } else if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    let songId = document.getElementById(`${songIndex}`);
    songId.classList.add("fa-circle-pause");
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    makeAllPlays();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
  }
});
//Listen to events
audioElement.addEventListener("timeupdate", () => {
  //Update seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});
myProgressBar.addEventListener("input", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});
// if(audioElement.currentTime==audioElement.duration){
//   songIndex+=songIndex;

// }
//function to make all pause buttons play
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-circle-pause");
      element.classList.add("fa-circle-play");
    }
  );
};
//change songs
Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (element) => {
      myProgressBar.value = 0;
      makeAllPlays();
      songIndex = parseInt(element.target.id);
      element.target.classList.remove("fa-circle-play");
      element.target.classList.add("fa-circle-pause");
      audioElement.src = `songs/song${songIndex + 1}.mp3`;
      masterSongName.innerText = `${songs[songIndex].songName} - Unknown Artist`;
      audioElement.currentTime = 0;
      audioElement.play();
      masterPlay.classList.remove("fa-circle-play");
      masterPlay.classList.add("fa-circle-pause");
      gif.style.opacity = 1;
    });
  }
);
//handle forward button
document.getElementById("next").addEventListener("click", () => {
  if (songIndex == -1) {
    return false;
  } else if (songIndex >= 4) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  myProgressBar.value = 0;
  makeAllPlays();
  let songId = document.getElementById(`${songIndex}`);
  songId.classList.add("fa-circle-pause");
  audioElement.src = `songs/song${songIndex + 1}.mp3`;
  masterSongName.innerText = `${songs[songIndex].songName} - Unknown Artist`;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  gif.style.opacity = 1;
});
//handle previous button
document.getElementById("previous").addEventListener("click", () => {
  if (songIndex == -1) {
    return false;
  } else if (songIndex <= 0) {
    songIndex = 4;
  } else {
    songIndex -= 1;
  }
  myProgressBar.value = 0;
  makeAllPlays();
  let songId = document.getElementById(`${songIndex}`);
  songId.classList.add("fa-circle-pause");
  audioElement.src = `songs/song${songIndex + 1}.mp3`;
  masterSongName.innerText = `${songs[songIndex].songName} - Unknown Artist`;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  gif.style.opacity = 1;
});

let temp = Math.random();
