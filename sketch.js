const maxBubbles = 50
const maxLasers = 10
const maxSines = 10
const stagePadding = 200
const bumpDelay = 1000
const laserDebounce = 5000

let stage, player, music, musicInput, amp, loadSong, playMode, timer, bars, sine;

let bubbles = []
let lasers = []
let sines = []
let beatBombs = []

let addingLaser = false
let started = false

function preload(){
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // top
  showBubbles = new Slider(windowWidth/4 - 50, 25, "Off", "Bubbles")
  showLasers = new Slider(windowWidth/4 - 50, 50, "Off", "Lasers")
  showBeatBombs = new Slider(windowWidth/2 - 50, 25, "Off", "Beat Bombs")
  showSines = new Slider((3 * windowWidth/4) - 50, 25, "Off", "Waves")
  showBars = new Slider((3 * windowWidth/4) - 50, 50, "Off", "Bars", 'left')
  // bottom
  playMode = new Slider(windowWidth/2 - 50, windowHeight - 75, "Mouse", "Keyboard")
  isGame = new Slider(windowWidth/2 - 50, windowHeight - 50, "Visuals Only", "Game")

  loadSong = new LoadSong(windowWidth/2 - 50, windowHeight/2 - 25)
  stage = new Stage(stagePadding)

  musicInput = createFileInput(e => {
    started = true
    player = new Player({stage, playMode})
    timer = new Timer()
    loadSong.handleFile(e)
    music = loadSound(e.data, (m) => m.play())
    amp = new Amp();
    amp.addEventListener("bump", () => {
      addLaser()
      if (random() < 0.01) addBeatBomb()
      beatBombs.forEach(bb => bb.burst())
    })
    amp.addEventListener("bounce", () => {
      if (random() < 0.25) addBubble()
      if (random() < 0.05) addSine()
    })
    
    bars = new Bars({amp, stage, showBars})
  })
}

function draw() {
  background(amp?.bg || 0)
  
  // Objects
  amp?.checkLevel()
  lasers?.forEach(laser => laser.draw())
  bubbles?.forEach(bubble => bubble.draw()) 
  sines?.forEach(sine => sine.draw())
  bars?.draw()
  beatBombs?.forEach(bb => bb.draw())
  if (isGame?.selected === 'game') player?.draw()

  // GUI
  stage?.draw()
  timer?.draw()
  if (!started) loadSong?.draw()
  playMode?.draw()
  showBubbles?.draw()
  showLasers?.draw()
  showSines?.draw()
  showBars?.draw()
  showBeatBombs?.draw()
  isGame?.draw()
}

function addBeatBomb(){
  const beatBomb = new Beatbomb(random(stage.padding/2, windowWidth - stage.padding/2), {showBeatBombs})
    beatBomb.addEventListener('burst',() => {
      for(let i = 0; i < 25; i++) {
        addBubble(beatBomb.pos, true)
      }
      beatBombs = beatBombs.filter(bb => bb.id !== beatBomb.id)
    })

    beatBombs.push(beatBomb)
}

function addBubble(pos, force){
  if (force || (showBubbles.selected === 'bubbles' && bubbles.length < maxBubbles)){
    const width = random(5,20), height = random(5,20);
    const x = pos ? pos.x : random([random(0, stage.padding/2), random(windowWidth - stage.padding/2, windowWidth)])
    const y = pos ? pos.y : random(0, windowHeight)
    const bubble = new Bubble(x, y, width, height, {stage, amp, bumpDelay, player, showBubbles})
    bubble.addEventListener('hitWall', (event) => {
      bubbles = bubbles.filter(b => b.id !== bubble.id)
    })
    bubble.addEventListener('hitPlayer', event => hitPlayer())
    bubbles.push(bubble)
  }
}

function addSine(){
  if (showSines.selected === 'waves' && sines.length < maxSines){
    const sine = new Sine(0, random(stage.padding/2, windowHeight - stage.padding/2), {player, stage, showSines})
    sine.addEventListener("delete", () => {
      sines = sines.filter(s => s.id !== sine.id)
    })
    sine.addEventListener('hitPlayer', event => hitPlayer())
    sines.push(sine)
  }
}

function addLaser(){
  if (showLasers.selected === 'lasers' && lasers.length < maxLasers && !addingLaser){
    addingLaser = true
    const dir = random([0, 1])
    const laser = dir ? 
      new Laser(dir, random(100, windowWidth - 100), windowHeight, {amp, bumpDelay, player, stage, showLasers}) : 
      new Laser(dir, 0, random(100, windowHeight -100), {amp, bumpDelay, player, stage, showLasers})
    laser.addEventListener('hitPlayer', event => hitPlayer())
    laser.addEventListener('delete', event => {
      lasers = lasers.filter(l => l.id !== laser.id)
    })
    lasers.push(laser)

    setTimeout(() => {addingLaser = false}, laserDebounce)
  }
}

function hitPlayer(){
  if (isGame.selected === 'game'){
    player.hurt()
    if (player.health < 1) {
      cursor()
      push()
      background('red')
      textAlign(CENTER, CENTER)
      textSize(100)
      fill(0)
      noStroke()
      text('GAME OVER', windowWidth/2, windowHeight/2)
      pop()
      noLoop()
      music.stop()
      setTimeout(() => window.location.reload(), 2000)
    }
  }
}

function keyPressed(){
  if (keyCode === 32) player.boost()
}

function mouseClicked(){
  loadSong.checkClick()
  playMode.checkClick()
  showBubbles.checkClick()
  showLasers.checkClick()
  showSines.checkClick()
  showBars.checkClick()
  isGame.checkClick()
  showBeatBombs.checkClick()
}