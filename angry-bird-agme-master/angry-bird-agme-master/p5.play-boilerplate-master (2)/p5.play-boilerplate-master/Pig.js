class Pig extends BaseClass{
    constructor(x,y) {
    super(x,y,50,50);
    this.image=loadImage("Images/enemy.png");
    this.Visibility=255;
    }

    display() {
        if(this.body.speed<3) {
            super.display();
        } else{
            var pos=this.body.position;
            World.remove(world,this.body);
            push();
            this.Visibility=this.Visibility-5;
            tint(255,this.Visibility);
            image(this.image,pos.x,pos.y,50,50);
            pop();
        }
        
    }
}