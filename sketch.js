var dog ,dogImage, happyDog;
var food, foodStock, foodS;
var database;

function preload(){
  dogImage=loadImage("images/Dog.png");
  happyDog=loadImage("images/happyDog.png");
}

function setup(){
  database = firebase.database();
  createCanvas(500,500);
  foodS = database.ref("food");
  foodS.on("value",readStock);

  dog = createSprite(430,430,5,5);
  dog.addImage("BUGGY 2.O", dogImage);
  dog.addImage("BUGGY", happyDog);
  dog.scale = 0.2;

  
}

function draw(){
  background(46, 139, 87);
  if(foodS!==undefined){

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.changeImage("BUGGY", happyDog);

  }

  drawSprites();
  
  fill("black");
  text("food stock: "+foodS,200,200);
  text("press the up key to feed doggo and make him happy",20,20);

  }
}

function readStock(data)
{
    foodS = data.val();
}

function writeStock(x)
{
  database.ref('/').update 
  ({
food:x
  })
}