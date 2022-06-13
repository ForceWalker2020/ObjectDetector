objectDetector= "";

img = "";
objects = [];
status = "";

function preload(){
  img = loadImage('AirConditionerAndRemoteProjectImage.jpeg');
}


function setup() {
  canvas = createCanvas(640, 420);
  canvas.center();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
  objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() 
{
  if (status != "") 
  {
  	  image(img, 0, 0, 640, 420);
      objectDetector.detect(img, gotResult);
    for ( i = 0; i < objects.length; i++) 
    {

      document.getElementById("status").innerHTML = "Status : Objects Detected";
      document.getElementById("number_of_objects").innerHTML = "Number of Objects detected are : "+ objects.length;

      fill(255, 0, 0);
      percent = floor(objects[i].confidence * 100);
      text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
      noFill()
      stroke(255, 0, 0);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
  }
}
