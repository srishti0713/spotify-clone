//initialization of variables
let songIndex = -1;
let audioElement = new Audio("song1.mp3");
let masterPlay = document.getElementById("masterPlay");
let masterSongName = document.getElementById("masterSongName");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let albumImg = document.getElementsByClassName("albumimg")[0];
let volumeSlider=document.getElementById("volumeSlider");
albumImg.src = "albumcvr.jpg";

const songs = [
  {
    songName: "Life Without Friends",
    filePath: "songs/song1.mp3",
    coverPath: "cover/cover1.jpg",
  },
  {
    songName: "Serenade",
    filePath: "songs/song2.mp3",
    coverPath: "cover/cover2.jpg",
  },
  {
    songName: "Christmas Melody",
    filePath: "songs/song3.mp3",
    coverPath: "cover/cover3.jpg",
  },
  {
    songName: "New Beginnings",
    filePath: "songs/song4.mp3",
    coverPath: "cover/cover4.jpg",
  },
  {
    songName: "Dreamscape",
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
    let songName = document.getElementsByClassName("songName")[songIndex];
    songName.style.color = "#1db954";
  } else {
    audioElement.pause();
    makeAllPlays();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
  }
});
audioElement.addEventListener("ended", () => {
  playNextSong();
});
const convertTime=(orignalTime)=>{
  let hr=parseInt(orignalTime/60);
  let min=parseInt(orignalTime%60);
  hr = hr < 10 ? `0${hr}` : `${hr}`;
  min = min < 10 ? `0${min}` : `${min}`;
  let time=`${hr}:${min}`;
  console.log(time);
  return time;
}
//Listen to events
audioElement.addEventListener("timeupdate", () => {
  //Update seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
  document.getElementById("timeUpdate").innerText=convertTime(audioElement.currentTime);
});
myProgressBar.addEventListener("input", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});
//function to play next song
const playNextSong = () => {
  if (songIndex == -1) {
    return false;
  } else if (songIndex >= 4) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  progress= 0;
  makeAllPlays();
  let songId = document.getElementById(`${songIndex}`);
  songId.classList.add("fa-circle-pause");
  audioElement.src = `songs/song${songIndex + 1}.mp3`;
  audioElement.addEventListener('loadedmetadata', () => {
    document.getElementById("songDuration").innerText = convertTime(audioElement.duration);
  });
  let songName = document.getElementsByClassName("songName")[songIndex];
      songName.style.color = "#1db954";
  masterSongName.innerText = `${songs[songIndex].songName} - Unknown Artist`;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  gif.style.opacity = 1;
};

//function to make all pause buttons play
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-circle-pause");
      element.classList.add("fa-circle-play");
    }
  );
  Array.from(document.getElementsByClassName("songName")).forEach(
    (songName) => {
      songName.style.color = "#ffff";
    }
  );
};
//change songs
Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (element) => {
      progress= 0;
      makeAllPlays();
      songIndex = parseInt(element.target.id);
      element.target.classList.remove("fa-circle-play");
      element.target.classList.add("fa-circle-pause");
      audioElement.src = `songs/song${songIndex + 1}.mp3`;
      audioElement.addEventListener('loadedmetadata', () => {
        document.getElementById("songDuration").innerText = convertTime(audioElement.duration);
      });
      masterSongName.innerText = `${songs[songIndex].songName} - Unknown Artist`;
      audioElement.currentTime = 0;
      audioElement.play();
      masterPlay.classList.remove("fa-circle-play");
      masterPlay.classList.add("fa-circle-pause");
      gif.style.opacity = 1;
      let songName = document.getElementsByClassName("songName")[songIndex];
      songName.style.color = "#1db954";
    });
  }
);
//handle forward button
document.getElementById("next").addEventListener("click", () => {
  playNextSong();
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
  progress = 0;
  makeAllPlays();
  let songId = document.getElementById(`${songIndex}`);
  songId.classList.add("fa-circle-pause");
  audioElement.src = `songs/song${songIndex + 1}.mp3`;
  audioElement.addEventListener('loadedmetadata', () => {
    document.getElementById("songDuration").innerText = convertTime(audioElement.duration);
  });
  masterSongName.innerText = `${songs[songIndex].songName} - Unknown Artist`;
  audioElement.currentTime = 0;
  audioElement.play();
  let songName = document.getElementsByClassName("songName")[songIndex];
      songName.style.color = "#1db954";
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  gif.style.opacity = 1;
});

//handle volume slider
audioElement.volume=1.0;
volumeSlider.addEventListener("input",(e)=>{
let volume=e.target.value/100;
audioElement.volume=volume;
})

