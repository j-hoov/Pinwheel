//declare variables
let rx;
let ry;
let rw;
let rh;
let num_seg;
let shape = [];
let rotate_speed;

function setup(){
  rx = 0;
  ry = 0;
  rw = 100;
  rh = 100;
  num_seg = 1;
  createCanvas(windowWidth, windowHeight);  
}

//keypress interaction
function keyPressed(){
  if (keyIsDown(70)){
    num_seg -= 1;
  }
  if (keyIsDown(74)){
    num_seg += 1;
  }
  if (keyIsDown(RIGHT_ARROW)){
      rw += 10;
  }
  if (keyIsDown(LEFT_ARROW)){
      rw -= 10;
  }
  if (keyIsDown(UP_ARROW)){
    rh += 10;
  }
  if (keyIsDown(DOWN_ARROW)){
      rh -= 10;
  }
}

function draw(){
//info button
fill(57,100);
stroke(200,20);
strokeWeight(1);
ellipseMode(CENTER);
ellipse(20,20,30,30);
fill(200);
textAlign(CENTER,CENTER);
textSize(20);
text("?",20,20);

//info text
let d = dist(mouseX,mouseY,20,20);
if(d < 30){
  textAlign(LEFT);
  textSize(15 );
  noStroke();
  text("move mouse horizontally: change rotation speed",10,50);
  text("move mouse vertically: change color",10,70);
  text("right arrow: increase width",10,110);
  text("left arrow: decrease width",10,90);
  text("up arrow: increase height",10,130);
  text("down arrow: decrease height",10,150);
  text("J: increase number of lines",10,170);
  text("F: decrease number of lines",10,190);

}
//alpha blended background
  fill(0,10);
  noStroke();
  rect(0,0,width,height); 
  
//invisible rectangle frame shape
  stroke(50);
  noFill();
  strokeWeight(0);
  
//rotate every frame
  rotate_speed = frameCount/(1/(.05*(mouseX+8)));
  if(frameCount % 1 == 0){
    translate(width/2,height/2);
    rotate(radians(rotate_speed % 360));
    rect(rx,ry,rw,rh);
  
//fill shape array with Seg objects
  for(i=0; i<num_seg; i++){
    shape[i] = new Seg(this.x1,this.y1,this.x2,this.y2,this.shade,this.stroke);
  }
  for(i=0; i<num_seg; i++){
    shape[i].display();
  }
  }
}

//establish Seg class - dimensions based on rectangle
  class Seg {
    constructor() {
      this.x1 = rx;
      this.y1 = ry+i*(rh/num_seg);
      this.x2 = rx+rw;
      this.y2 = ry+i*(rh/num_seg);
      this.shade = map(mouseY,0,height,50,180); //shade based on mouse height
      this.stroke = 5;
    }  
  
    display(){
      stroke(90,this.shade,250); //varying color
      strokeWeight(this.stroke);
      line(this.x1, this.y1, this.x2, this.y2, this.shade, this.stroke);
    }

  }
