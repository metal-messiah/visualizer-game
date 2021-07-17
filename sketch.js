const bubbles = []
const maxbubbles = 25
let stage, player, music, musicInput, amp, loadSong, playMode;
const lasers = []

const stagePadding = 200

const bumpDelay = 1000

function preload(){
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  stage = new Stage(stagePadding)
  playMode = new Slider(width/2 - 50, 25, "Mouse", "Keyboard")
  player = new Player({stage, playMode})
  timer = new Timer()
  loadSong = new LoadSong(115, 25)

  musicInput = createFileInput(e => {
    loadSong.handleFile(e)
    music = loadSound(e.data, (m) => m.play())
    amp = new Amp();
    addbubble()
    addLaser()
  })
}

function draw() {
  background(amp?.bg || 0);

  if (amp) amp.checkLevel()

  lasers.forEach(laser => laser.draw())

  bubbles.forEach(bubble => {
    bubble.draw()
  }) 
  
  
  player.draw()
  
  stage.draw()

  timer.draw()

  loadSong.draw()
  playMode.draw()
}

function addbubble(){
  const width = random(5,20), height = random(5,20);
  const bubble = new bubble(width, random(0, windowHeight), width, height, {stage, amp, bumpDelay})
  bubble.addEventListener('hitWall', (event) => {if (bubbles.length < maxbubbles) addbubble()})
  bubble.addEventListener('hitPlayer', event => hitPlayer())
  bubbles.push(bubble)
}

function addLaser(){
  const dir = random([0, 1])
  const laser = dir ? new Laser(dir, random(100, windowWidth - 100), windowHeight, {amp, bumpDelay}) : new Laser(dir, 0, random(100, windowHeight -100), {amp, bumpDelay})
  lasers.push(laser)
}

function hitPlayer(){
  console.log("HIT PLAYER")
  player.hurt()
  if (player.health < 1) {
    cursor()
    background('red')
    noLoop()
    music.stop()
  }
}

function keyPressed(){
  if (keyCode === 32) player.boost()
}

function mouseClicked(){
  loadSong.checkClick()
  playMode.checkClick()
}