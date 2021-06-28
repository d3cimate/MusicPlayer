const musicContainer = document.querySelector('.music-container')
const playButton = document.querySelector('#play')
const prevButton = document.querySelector('#prev')
const nextButton = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressBar = document.querySelector('.progress-bar')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

const songs = ['OHMAMI', 'PARANOID', 'ALEYUH']

let songIndex = 0

loadSong(songs[songIndex])

function loadSong(song)
{
    title.innerText = song
    audio.src = `./songs/${song}.mp3`
    cover.src = `./assets/imgs/${song}.jpg`
}

function playSong()
{
    musicContainer.classList.add('play')
    playButton.querySelector('i.fas').classList.remove('fa-play')
    playButton.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
}

function pauseSong()
{
    musicContainer.classList.remove('play')
    playButton.querySelector('i.fas').classList.remove('fa-pause')
    playButton.querySelector('i.fas').classList.add('fa-play')

    audio.pause()
}

function prevSong()
{
    songIndex -= 1
    if(songIndex < 0)
    {
        songIndex = songs.length - 1
    }

    loadSong(songs[songIndex])
    
    playSong()
}

function nextSong()
{
    songIndex++
    if(songIndex > songs.length - 1)
    {
        songIndex = 0
    }

    loadSong(songs[songIndex])

    playSong()
}

function updateProgress(e)
{
    const {duration, currentTime} = e.srcElement
    const percent = (currentTime/duration) * 100
    progress.style.width = `${percent}%` 
}

function scrub(e)
{
    //i called it scrub but it doesnt let u scrub so i need to fix that
    const width = this.clientWidth
    const clickedX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickedX/width) * duration
}

playButton.addEventListener('click', ()=>
{
    const isPlaying = musicContainer.classList.contains('play')
    if(isPlaying)
    {
        pauseSong()
    }
    else
    {
        playSong()
    }
})

prevButton.addEventListener('click', prevSong)
nextButton.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressBar.addEventListener('click', scrub)

audio.addEventListener('ended', nextSong)