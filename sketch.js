var bg,bg_image
var player,player_image,playerShooting_img
var zombie,zombie_img,zombies_grp
var heart_1,heart_2,heart_3,heart_1img,heart_2img,heart_3img;
var bullet,bullet_img,bullet_count=70,gameState="fight",bullet_grp


function preload() {
bg_image = loadImage("assets/bg.jpeg")
player_image = loadImage("assets/shooter_1.png")
playerShooting_img = loadImage("assets/shooter_3.png")
zombie_img = loadImage("assets/zombie.png")
heart_1img = loadImage("assets/heart_1.png")
heart_2img = loadImage("assets/heart_2.png")
heart_3img = loadImage("assets/heart_3.png")
bullet_img = loadImage("assets/bullet.png")
}

function setup(){
  createCanvas(windowWidth,windowHeight)
  //bg = createSprite(displayWidth/2-25,displayHeight/2-45)
  //bg.addImage("background",bg_image)

  player = createSprite(width/2-850,height/2+400)
  player.addImage(player_image)
  player.scale=0.9
  player.debug=true
  player.setCollider("rectangle",0,0,400,400)

  heart_1 = createSprite(width-950,50)
  heart_1.addImage(heart_1img)
  heart_1.scale=0.25
  heart_1.visible=false

  heart_2 = createSprite(width-875,50)
  heart_2.addImage(heart_2img)
  heart_2.scale=0.25
  heart_2.visible = false

  heart_3 = createSprite(width-750,50)
  heart_3.addImage(heart_3img)
  heart_3.scale=0.25
  heart_3.visible = false


  zombies_grp = new Group()
  bullet_grp = new Group()
}

function draw(){
 background(bg_image)

  if(keyWentDown("space")) {
    player.addImage(playerShooting_img)
    bullet = createSprite(player.x,player.y-42)
    bullet.addImage(bullet_img)
    bullet.scale=0.3
    bullet.velocityX = 10
    player.depth = bullet.depth
    player.depth +=2
    bullet_grp.add(bullet)
    bullet_count -=1


  }else if(keyWentUp("space")) {
     player.addImage(player_image)
  }

  if(keyDown("UP_ARROW")||touches.length>0){
   player.y-=10

  }

  if(keyDown("DOWN_ARROW")||touches.length>0){
    player.y+=10
 
   }
   if(zombies_grp.isTouching(player)){
     for (var i=0;i<zombies_grp.length;i++){
       if (zombies_grp[i].isTouching(player)){
         zombies_grp[i].destroy()
         
       }
     }
   }

   if (zombies_grp.isTouching(bullet_grp)){
     for(var i=0;i<zombies_grp.length;i++) {
       if (zombies_grp.isTouching(bullet_grp)){
         bullet_grp.destroyEach()
         zombies_grp[i].destroy()
       }
     }
   }
  
   if (gameState == "bullet"){
     textSize(25)
     fill("yellow")
     text("BULLETS ARE OVER PLEASE RELOAD",400,400)
     player.destroy()
     zombies_grp.destroyEach()
     bullet_grp.destroyEach()

   }else if (gameState == "lost"){
    textSize(25)
    fill("red")
    text("GAME OVER",400,400)
    player.destroy()
    zombies_grp.destroyEach()
    
   }else if (gameState == "won"){
    textSize(25)
    fill("green")
    text("CONGRAGULATIONS YOU WON",400,400)
    player.destroy()
    zombies_grp.destroyEach()
   }

   if (bullet_count==0){
     gameState="bullet"

   }
   enemy()

  drawSprites()
}

function enemy(){
  if (frameCount%100===0){
  zombie = createSprite(random(width/2+400,width),random(height/2,height-200))
  zombie.addImage(zombie_img)
  zombie.scale=0.5
  zombie.velocityX=-5
  zombie.debug=true
  zombie.setCollider("rectangle",0,0,800,800)
  zombie.lifetime=460
  zombies_grp.add(zombie)
  }
}