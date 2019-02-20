//declare variables
let rx;
let ry;
let rw;
let rh;
let num_seg;
let shape = [];
let bez_shape = [];
let rotate_speed;
let shape_code;
let stroke_code;

function setup(){
  rx = 0;
  ry = 0;
  rw = 100;
  rh = 100;
  num_seg = 1;
  shape_code = 0;
  stroke_code = 2;
  createCanvas(windowWidth, windowHeight);  
}


// //keypress interaction
// function keyPressed(){
//   if (keyIsDown(70)){
//     num_seg -= 1;
//   }
//   if (keyIsDown(74)){
//     num_seg += 1;
//   }
//   if (keyIsDown(RIGHT_ARROW)){
//       rw += 10;
//   }
//   if (keyIsDown(LEFT_ARROW)){
//       rw -= 10;
//   }
//   if (keyIsDown(UP_ARROW)){
//     rh += 10;
//   }
//   if (keyIsDown(DOWN_ARROW)){
//     rh -= 10;
//   }
// }


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
  text("right arrow: increase width",10,90);
  text("left arrow: decrease width",10,110);
  text("up arrow: increase height",10,130);
  text("down arrow: decrease height",10,150);
  text("J: increase number of lines",10,170);
  text("F: decrease number of lines",10,190);
  text("B: change shape to bezier curve",10,210);
  text("S: return shape to line segment",10,230)
}

//alpha blended background
  fill(0,10);
  noStroke();
  rect(0,0,width,height); 

//keypress interaction
if(frameCount % 5 == 0){ //if key is held for more than 5 frames
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
  
//invisible rectangle frame shape
  noStroke();
  noFill();
 
//rotate rectangle every frame
  rotate_speed = frameCount/(1/(.1*(mouseX+8))); //rotation speed based on mouseX
  if(frameCount % 1 == 0){
    translate(width/2,height/2);
    rotate(radians(rotate_speed % 360));
    rect(rx,ry,rw,rh);
  }

//fill shape array with Seg objects, fill bez_shape array with Bez objects
  for(i=0; i<num_seg; i++){
    shape[i] = new Seg(this.x1,this.y1,this.x2,this.y2,this.shade,this.stroke);
    bez_shape[i] = new Bez(this.x1,this.y1,this.x2,this.y2,this.x3,this.y3,this.x4,this.y4);
  }

//display Seg or Bez depending on keycode
  if(keyCode == 83){
    shape_code = 0;
  }
  if(keyCode == 66){
    shape_code = 1;
  }
  for(i=0; i<num_seg; i++){
    if(shape_code == 0){
      shape[i].display();
    }
    if(shape_code == 1){
      bez_shape[i].display();
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
      this.shade = map(mouseY,0,height,50,220); //shade based on mouse height
      this.stroke = 5;
    }  
  
    display(){
      stroke(100,this.shade,300); //varying color
      strokeWeight(this.stroke);

      // if(keyCode>47 && keyCode<58){
      //   this.stroke = map(keyCode,48,57,1,30);
      //   //strokeWeight(keyCode);
      // }
      // else{
      //   strokeWeight(this.stroke);
      // }
     
      line(this.x1, this.y1, this.x2, this.y2, this.shade, this.stroke);
    }

  }

  class Bez{
    constructor(){
      this.x1 = rx;
      this.y1 = ry+i*(rh/num_seg);
      this.x2 = this.x1+.75*rw;
      this.y2 = this.y1+.25*rh;
      this.x3 = this.x1+.25*rw;
      this.y3 = this.y1-.25*rh;
      this.x4 = rx+1.25*rw;
      this.y4 = ry+i*(rh/num_seg);
      this.shade = map(mouseY,0,height,50,220); //shade based on mouse height
      this.stroke = 2;
    }

    display(){
      stroke(this.shade,210,150); //varying color
      strokeWeight(this.stroke);
      bezier(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3, this.x4, this.y4, this.shade, this.stroke);
    }
  }
