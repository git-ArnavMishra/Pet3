class Food {
  constructor(){
    var foodStock = 10;
    var lastFed;
    this.image = loadImage("Sprites/milk.png");
    this.bedroom = loadImage("Sprites/Bed Room.png");
    this.garden = loadImage("Sprites/Garden.png");
    this.washroom = loadImage("Sprites/Wash Room.png");
  }
  bedroom (){
    background(this.bedroom);
  }
  garden (){
    background(this.garden);
  }
  washroom (){
    background(this.washroom);
  }
  
  
  getFoodStock(){
    return this.foodStock;
  }
  updateFoodStock(mystock){
     this.foodStock = mystock;
  }
  deductFood(){
    this.foodStock--;
  }
  updateLastfed(lfed){
    this.lastFed = lfed;
  }
display(){
    var x = 80, y = 100;
    imageMode(CENTER);
    //this.foodStock = 20;

    image(this.image,720,220,70,70);
    if(this.foodStock!=0){
        for(var i=0;i<this.foodStock;i++){
        if(i%10==0){
            x = 80;
            y = y + 50;

        }
        image(this.image,x,y,50,50);
        x = x+30;
    }
}
  
   
  }
}
