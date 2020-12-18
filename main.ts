controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . 5 . . . . . . . . 
        . . . . . . . 5 . . . . . . . . 
        . . . . . . . 5 . . . . . . . . 
        . . . . . . . 5 . . . . . . . . 
        . . . . . . b 5 b . . . . . . . 
        . . . . . . b 5 b . . . . . . . 
        . . . . . . b 5 b . . . . . . . 
        . . . . . . b 5 b . . . . . . . 
        . . . . . . b 5 b . . . . . . . 
        . . . . . . b 5 b . . . . . . . 
        . . . . . . b 5 b . . . . . . . 
        . . . . . . b 5 b . . . . . . . 
        . . . . . . b 5 b . . . . . . . 
        . . . . . . b 5 b . . . . . . . 
        . . . . . . b 5 b . . . . . . . 
        . . . . . . b 5 b . . . . . . . 
        `, Player_ship, 0, -100)
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    Enemy_ship.destroy(effects.fire, 500)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    sprite.destroy()
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    statusbar.value += 50
})
let statusbar: StatusBarSprite = null
let Enemy_ship: Sprite = null
let projectile: Sprite = null
let Player_ship: Sprite = null
effects.starField.startScreenEffect()
Player_ship = sprites.create(img`
    ................
    ......d99d......
    ......d99d......
    ......d44d......
    ......1441......
    .....114411.....
    .....114411.....
    .....114411.....
    .....114411.....
    ....41144114....
    ...4411441144...
    ...4411441144...
    ..144114411441..
    ..144114411441..
    ..144114411441..
    ..144114411441..
    .....245542.....
    .....245542.....
    .....245542.....
    .....244442.....
    .....224422.....
    ......2222......
    `, SpriteKind.Player)
controller.moveSprite(Player_ship)
Player_ship.setFlag(SpriteFlag.StayInScreen, true)
info.setLife(5)
game.onUpdateInterval(1000, function () {
    Enemy_ship = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . 1 9 1 9 1 1 9 1 9 1 . . . 
        . . . . 9 1 9 1 1 9 1 9 . . . . 
        . . 9 9 9 1 9 1 1 9 1 9 9 9 . . 
        . . 9 9 9 1 9 1 1 9 1 9 9 9 . . 
        . . 9 9 9 1 9 1 1 9 1 9 9 9 . . 
        . . 9 9 . 1 9 1 1 9 1 . 9 9 . . 
        . . 9 9 . 1 9 1 1 9 1 . 9 9 . . 
        . . 9 9 . 1 9 1 1 9 1 . 9 9 . . 
        . . 4 4 . 1 9 1 1 9 1 . 4 4 . . 
        . . . . . 1 9 1 1 9 1 . . . . . 
        . . . . . 1 9 1 1 9 1 . . . . . 
        . . . . . 1 9 1 1 9 1 . . . . . 
        . . . . . 1 9 1 1 9 1 . . . . . 
        . . . . . . 9 1 1 9 . . . . . . 
        . . . . . . 9 1 1 9 . . . . . . 
        `, SpriteKind.Enemy)
    Enemy_ship.setPosition(randint(0, scene.screenWidth()), 0)
    statusbar = statusbars.create(15, 2, StatusBarKind.Health)
    Enemy_ship.vy = 25
    statusbar.attachToSprite(Enemy_ship)
    statusbar.setColor(5, 10)
})
forever(function () {
    if (info.score() == 100) {
        game.over(true)
    }
})
