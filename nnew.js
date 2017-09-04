require('./keystate')

//
// Create the canvas
//

var canvas = document.createElement("canvas")
var ctx = canvas.getContext("2d")
canvas.width = 512
canvas.height = 480
document.body.appendChild(canvas)

//
// Game state
//

var player = {
  pos: [10, 10],
  speed: 10,
  src: './img/robot.png',
}

//
// main loop
//

var lastTime
function main() {
  var now = Date.now()
  var dt = (now - lastTime) / 1000.0

  update(dt)
  render()

  lastTime = now
  requestAnimationFrame(main)
}

//
// Update
//

function update(dt) {
  handleInput(dt)
}

function handleInput(dt) {
  if (keys['down'] || keys['s']) {
    player.pos[1] += player.speed * dt
  }

  if (keys['up'] || keys['w']) {
    player.pos[1] -= player.speed * dt
  }

  if (keys['left'] || keys['a']) {
    player.pos[0] -= player.speed * dt
  }

  if (keys['right'] || keys['d']) {
    player.pos[0] += player.speed * dt
  }
}

function render() {
    ctx.fillStyle = terrainPattern
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Render the player if the game isn't over
    renderEntity(player)

    // renderEntities(bullets)
    // renderEntities(enemies)
    // renderEntities(explosions)
}

// function renderEntities(list) {
//     for(var i=0 i<list.length i++) {
//         renderEntity(list[i])
//     }    
// }

function renderEntity(entity) {
  ctx.save()
  // ctx.translate(entity.pos[0], entity.pos[1])
  // console.log(entity.pos[0], entity.pos[1])
  // entity.sprite.render(ctx)
  drawImage(resources.get(this.url),
                  entity.pos[0], entity.pos[1],
                  this.size[0], this.size[1],
                  0, 0,
                  this.size[0], this.size[1])

  // image, dx, dy, dWidth, dHeight
// }

  ctx.restore()
}

function loadImg(url, cb){
  var img = new Image()
  img.onload = function() {
    cb(null, img)
  }
  img.src = url
}