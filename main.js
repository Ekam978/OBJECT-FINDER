status = "";
objects = [];
object_search = "";

function setup() {
    canvas = createCanvas(400,325);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error,results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw() 
{
    image(video,0,0,400,325);
    r = random(255);
    g = random(255);
    b = random(255);
    if (status != "") 
    {
        objectDetector.detect(video,gotResult);
        for (i = 0; i < objects.length; i++) {
            percentage = floor(objects[i].confidence * 100);
            x = objects[i].x;
            y = objects[i].y;
            width = objects[i].width;
            height = objects[i].height;            
            label = objects[i].label;
            if (label == object_search) {
                video.stop();
                objectDetector.detect(gotResult);
                var synth = window.speechSynthesis;
                speak_data = objects[i].label + " found";
                var utterThis = new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis);
                document.getElementById("status_of_model").innerHTML = "Model Has Detected Object";
                document.getElementById("status").innerHTML = "Status : " + objects[i].label + " Found";
                fill(r,g,b);
                text(label + " " + percentage + "%" , x + 15 , y + 15);
                noFill();
                stroke(r,g,b);
                rect(x , y , width , height);
            }else{
                document.getElementById("status_of_model").innerHTML = "Model Has Not Detected Object";
                document.getElementById("status").innerHTML = "Status : " + objects[i].label + " Not Found";
                var synth = window.speechSynthesis;
                speak_data = objects[i].label + " not found";
                var utterThis = new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis);
            }
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Object";
    object_search = document.getElementById("object").value;
}
