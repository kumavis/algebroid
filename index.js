require('./keystate')

//
// resource loading
//

var resources = undefined


;(function() {
    var resourceCache = {}
    var loading = []
    var readyCallbacks = []

    // Load an image url or an array of image urls
    function load(urlOrArr) {
        if(urlOrArr instanceof Array) {
            urlOrArr.forEach(function(url) {
                _load(url)
            })
        }
        else {
            _load(urlOrArr)
        }
    }

    function _load(url) {
        if(resourceCache[url]) {
            return resourceCache[url]
        }
        else {
            var img = new Image()
            img.onload = function() {
                resourceCache[url] = img

                if(isReady()) {
                    readyCallbacks.forEach(function(func) { func() })
                }
            }
            resourceCache[url] = false
            img.src = url
        }
    }

    function get(url) {
        return resourceCache[url]
    }

    function isReady() {
        var ready = true
        for(var k in resourceCache) {
            if(resourceCache.hasOwnProperty(k) &&
               !resourceCache[k]) {
                ready = false
            }
        }
        return ready
    }

    function onReady(func) {
        readyCallbacks.push(func)
    }

    resources = { 
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    }
})()

resources.load([
    'img/robot.png',
    'img/cactus.png'
])
resources.onReady(init)

//
// Create the canvas
//

var canvas = document.createElement("canvas")
var ctx = canvas.getContext("2d")
canvas.width = 512
canvas.height = 480
document.body.appendChild(canvas)

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

// Game state
var player = {
    pos: [10, 10],
    sprite: new Sprite('img/robot.png', [0, 0], [39, 39], 16, [0, 1])
}
var playerSpeed = 10

var terrainPattern

var gameTime = 0


//
// init
//

function init() {
    terrainPattern = ctx.createPattern(resources.get('img/cactus.png'), 'repeat')

    // document.getElementById('play-again').addEventListener('click', function() {
    //     reset()
    // })

    // reset()
    lastTime = Date.now()
    main()
}

//
// update
//

function update(dt) {
    gameTime += dt

    handleInput(dt)
    // updateEntities(dt)

    // // It gets harder over time by adding enemies using this
    // // equation: 1-.993^gameTime
    // if(Math.random() < 1 - Math.pow(.993, gameTime)) {
    //     enemies.push({
    //         pos: [canvas.width,
    //               Math.random() * (canvas.height - 39)],
    //         sprite: new Sprite('img/robot.png', [0, 78], [80, 39],
    //                            6, [0, 1, 2, 3, 2, 1])
    //     })
    // }

    // checkCollisions()

    // scoreEl.innerHTML = score
}

//
// handle input
//

function handleInput(dt) {
    if (keys['down'] || keys['s']) {
        player.pos[1] += playerSpeed * dt
    }

    if (keys['up'] || keys['w']) {
        player.pos[1] -= playerSpeed * dt
    }

    if (keys['left'] || keys['a']) {
        player.pos[0] -= playerSpeed * dt
    }

    if (keys['right'] || keys['d']) {
        player.pos[0] += playerSpeed * dt
    }

    // if(input.isDown('SPACE') &&
    //    !isGameOver &&
    //    Date.now() - lastFire > 100) {
    //     var x = player.pos[0] + player.sprite.size[0] / 2
    //     var y = player.pos[1] + player.sprite.size[1] / 2

    //     bullets.push({ pos: [x, y],
    //                    dir: 'forward',
    //                    sprite: new Sprite('img/robot.png', [0, 39], [18, 8]) })
    //     bullets.push({ pos: [x, y],
    //                    dir: 'up',
    //                    sprite: new Sprite('img/robot.png', [0, 50], [9, 5]) })
    //     bullets.push({ pos: [x, y],
    //                    dir: 'down',
    //                    sprite: new Sprite('img/robot.png', [0, 60], [9, 5]) })


    //     lastFire = Date.now()
    // }
}

//
// render
//

// Draw everything
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
    ctx.translate(entity.pos[0], entity.pos[1])
    // console.log(entity.pos[0], entity.pos[1])
    entity.sprite.render(ctx)
    ctx.restore()
}


//
// Sprite
//

function Sprite(url, pos, size, speed, frames, dir, once) {
    this.pos = pos
    this.size = size
    this.speed = typeof speed === 'number' ? speed : 0
    this.frames = frames
    this._index = 0
    this.url = url
    this.dir = dir || 'horizontal'
    this.once = once
}

Sprite.prototype.update = function(dt) {
    this._index += this.speed*dt
}

Sprite.prototype.render = function(ctx) {
    var frame

    // if(this.speed > 0) {
    //     var max = this.frames.length
    //     var idx = Math.floor(this._index)
    //     frame = this.frames[idx % max]

    //     if(this.once && idx >= max) {
    //         this.done = true
    //         return
    //     }
    // }
    // else {
    //     frame = 0
    // }


    // var x = this.pos[0]
    // var y = this.pos[1]

    var x = player.pos[0]
    var y = player.pos[1]

    // if(this.dir == 'vertical') {
    //     y += frame * this.size[1]
    // }
    // else {
    //     x += frame * this.size[0]
    // }

    // console.log(resources.get(this.url))
    console.log([x,y])
    console.log(this.size[0], this.size[1])

    ctx.drawImage(resources.get(this.url),
                  x, y,
                  this.size[0], this.size[1],
                  0, 0,
                  this.size[0], this.size[1])
}