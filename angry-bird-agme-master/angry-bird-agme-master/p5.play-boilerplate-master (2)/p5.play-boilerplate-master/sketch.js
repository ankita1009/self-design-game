const Engine = Matter.Engine;
const Bodies = Matter.Bodies;
const World = Matter.World;
const Constraint = Matter.Constraint;

var engine,world;
var player1,player1anime,player2,player2anime;
var player2scoreref;
var player1scoreref;
var player1score=0;
var player2score=0;
var player1pos,player2pos;
var rno;
var gameState;
var database;

function preload() {
      player1anime=loadImage("Images/character.png");
      player2anime=loadImage("Images/character2.png");
}

function setup() {
  createCanvas(1200,400);
  engine = Engine.create();
  world = engine.world;

  database=firebase.database();
  player1=createSprite(300,200,10,10);
  player1.addImage("p1",player1anime);
  player1.setCollider("rectangle",0,0,60,180);
  player1.debug=true;
  player2=createSprite(600,200,10,10);
  player2.addImage("p2",player2anime);
  player2.setCollider("rectangle",0,0,50,190);
  player2.debug=true;

  player1pos= database.ref('player1/position');
  player1pos.on("value",readPosition,showError);
  player2pos=database.ref('player2/position');
  player2pos.on("value",readPosition2,showError);

  player1scoreref=database.ref('player1/player1score');
  player1scoreref.on("value",readScore,showError);
  player2scoreref=database.ref('player2/player2score');
  player2scoreref.on("value",readScore2,showError);

  gameState=database.ref('gamestate');
  gameState.on("value",readGameState,showError);
}

function draw() {
  background("white");  
  //Engine.update(engine);

  // if(gameState===0) {
  //   textSize(30);
  //   text("PRESS SPACE TO START THE TOSS",600,200);

    // player1.visible=false;
    // player2.visible=false;

    // if(keyDown("space")) {
    //   rno=Math.round(random(1,2));

      // if(rno===1) {
      //   database.ref('/').update({
      //     'gamestate':1
      //   })

      //   alert("player1 won");
        
      // }

      // if(rno===2) {
      //   database.ref('/').update({
      //     'gamestate':2
      //   })

      //   alert("player2 won");
      // }

      database.ref('player1/position').update({
        'x':300,
        'y':200
      })

      database.ref('player2/position').update({
        'x':600,
        'y':200
      })
      
    //}

  //}

    // if(gameState===1) {

      player1.visible=true;
      player2.visible=true;

      if(keyDown(LEFT_ARROW)) {
        writePosition(-2,0);
    }

    else if(keyDown(RIGHT_ARROW)) {
      writePosition(2,0);
    }

    else if(keyDown(UP_ARROW)) {
      writePosition(0,-2);
    }

    else if(keyDown(DOWN_ARROW)) {
      writePosition(0,2);
    }

    if(player1.isTouching(player2)) {
      // database.ref('/').update({
      //   'player1score': player1score + 5,
      //   'player2score': player2score - 5
      // })
      player1score=player1score+5;
      player2score=player2score-5;
      console.log(player2score);
    console.log(player1score);

      //alert("player1 +5 points");
    }

  //}

  // if(gameState===2) {
 
    player1.visible=true;
    player2.visible=true;

    if(keyDown("a")) {
      writePosition2(-2,0);
  }

  else if(keyDown("s")) {
    writePosition2(2,0);
  }

  else if(keyDown("w")) {
    writePosition2(0,-2);
  }

  else if(keyDown("z")) {
    writePosition2(0,2);
  }

  if(player2.isTouching(player1)) {
    // database.ref('/').update({
    //   'player2score': player2score + 5,
    //   'player1score': player1score - 5
    // })
    player2score=player2score+5;
    player1score=player1score-5;
    console.log(player2score);
    console.log(player1score);
    //alert("player2 +5 points");
  }

//}

textSize(20);
text("player1:" + player1score,1000,100);
text("player2:" + player2score,1000,180);

  drawSprites();
}    

  function writePosition(x,y) {
    database.ref('player1/position').set({
      'x':position.x+x, 
      'y':position.y+y
    })
  }

  function writePosition2(x,y) {
    database.ref('player2/position').set({
      'x':position2.x+x,
      'y':position2.y+y
    })
  }

    function readPosition(data) {
      position=data.val();
      player1.x=position.x;

      player1.y=position.y;
    }

    function readPosition2(data) {
      position2=data.val();
      player2.x=position2.x;
      player2.y=position2.y;
    }

  function showError() {

  }
   
  function readScore(data) {
    player1score=data.val();
  }
  
  function readScore2(data) {
    player2score=data.val();
  }

  function readGameState(data) {
    gameState=data.val();
  }
 