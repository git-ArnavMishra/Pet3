//Create variables here
var dog, happyDog, database, foodS = 0, foodStock, mydog;
var database;
var feed;
var foodObj
var addFood;
var fedTime;
var lastFed = 0;
var cGS;
var rGS;
var ldBed;
var ldGar;
var ldWash;
var gameState = "Hungry";
//watch objs highlites and normal highlites
function preload() {
  mydog = loadImage("Sprites/Dog.png");
  happyDog = loadImage("Sprites/happydog.png");
  ldBed = loadImage("Sprites/Bed Room.png");
  ldGar = loadImage("Sprites/Garden.png");
  ldWash = loadImage("Sprites/Wash Room.png");
}
function setup() {
  createCanvas(1000, 756);
  dog = createSprite(800, 250, 40, 40);
  mydog.resize(100, 100);
  happyDog.resize(100, 100);
  dog.addImage(mydog);
  database = firebase.database();
  foodStock = database.ref('Food');

  foodObj = new Food();
  foodStock.on("value", readStock);
  fedTime = database.ref('FeedTime');
  fedTime.on("value", readFeedTime);
  feed = createButton("Feed the Dog")
  feed.position(700, 95);
  feed.mousePressed(feedDog);
  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);
  currentTime = hour();
  if (currentTime == (lastFed + 1)) {
    update("Playing");
  } else if (currentTime == (lastFed + 2)) {
    update("Sleeping");
  } else if (currentTime > (lastFed + 2) && currentTime <= (lastFed + 4)) {
    update("Bathing");
  } else {
    update("Hungry");0  
  }
}
function update(state) {
  database.ref('/').update({
    gameState: state
  });
}

function addFoods() {
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
  foodObj.updateFoodStock(foodS);
}
function feedDog() {
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref('/').update({
    //Food: foodObj.getFoodStock()
    Food: foodObj.getFoodStock() - 1
  })
  database.ref('/').update({
    //Food: foodObj.getFoodStock()
    FeedTime: hour()
  })
  if (currentTime == (lastFed + 1)) {
    update("Playing");
  } else if (currentTime == (lastFed + 2)) {
    update("Sleeping");
  } else if (currentTime > (lastFed + 2) && currentTime <= (lastFed + 4)) {
    update("Bathing");
  } else {
    update("Hungry");
  
  }
}
function draw() {
  //background(46, 139, 87);
  //foodObj.garden();
  if (currentTime == (lastFed + 1)) {
    //update("Playing");
    background(ldGar);
    feed.hide();
    addFood.hide()
  } else if (currentTime == (lastFed + 2)) {
    //update("Sleeping");
    background(ldBed);
    feed.hide();
    addFood.hide()
  } else if (currentTime > (lastFed + 2) && currentTime <= (lastFed + 4)) {
    //update("Bathing");
    background(ldWash);
    feed.hide();
    addFood.hide()
  } else {
    //update("Hungry");
    background(46, 139, 87);
      feed.show();
      addFood.show();
    foodObj.display();
  }

  if (gameState != "Hungry") {
    feed.hide();
    addFood.hide()
  }
  

  foodObj.updateLastfed(lastFed);

  //;

  fill(255, 255, 254);
  textSize(15);
  if (lastFed >= 12) {
    text("Last Feed : " + lastFed % 12 + " PM ", 350, 30);
  }
  else if (lastFed == 0) {
    text("Last Feed : 12 AM", 350, 30);
  }
  else {
    text("Last Feed : " + lastFed + "AM", 350, 30);
  }
  //;
  drawSprites();
}
// function to read value in DB;

function readStock(data) {
  foodS = data.val();
}

function readFeedTime(data) {
  lastFed = data.val();
}

// function to write value in DB;
function writeStock(x) {
  if (x <= 0) {
    x = 0;
  }
  else {
    x = x - 1;
  }
  database.ref('/').update({
    Food: x
  })
}


