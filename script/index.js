const app = () => {
  const song = document.querySelector('.timer__audio');
  const play = document.getElementById('playID');
  const outline = document.querySelector('.timer__moving-outline circle');
  const video = document.querySelector('.vid-container video');

  const sounds = document.querySelectorAll('.background-buttons button');
  const timeDisplay = document.querySelector('.timer__display');
  const timeSelect = document.querySelectorAll('.time-buttons button');
  const outlineLength = outline.getTotalLength();
  let duration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  play.addEventListener('click', () => {
    checkPlaying(song);
  })

  timeSelect.forEach(option => {
    option.addEventListener('click', function (){
      duration = this.dataset.time;
      console.log(duration)
      timeDisplay.textContent = `${Math.floor(duration / 60)}:${Math.floor(duration % 60)}`;
    })
  })

  console.log(sounds)

  sounds.forEach(option => {
    option.addEventListener('click', function (){
      video.src = this.dataset.video
      song.src = this.dataset.sound
    })
  })

  const checkPlaying = song => {
    if(song.paused){
      song.play();
      video.play();
      play.src = './content/svg/pause.svg';
    }
    else{
      song.pause();
      video.pause();
      play.src = './content/svg/play.svg';
    }
  }

  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = duration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    outline.style.strokeDashoffset = outlineLength - (currentTime / duration) * outlineLength;

    timeDisplay.textContent = `${minutes}:${seconds}`;

    if(currentTime >= duration){
      song.pause();
      song.currentTime = 0;
      play.src = './content/svg/play.svg';
      video.pause();
    }
  }

}

app();