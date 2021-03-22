status = "";
objects = [];

function setup() {
    canvas = createCanvas(400,325);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Object";
    object_search = document.getElementById("object").value;
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}

function gotResult(results , error) {
    if(error){
        console.error(error);
    }
    console.log(results);
    results = objects;
}

function draw() 
{
    image(video,0,0,400,325);

    if (status != "") 
    {
        objectDetector.detect(video,gotResult);

        for (i = 0; i < objects.length; i++) {
            if (objects[i].label == object_search) {
                var synth = window.speechSynthesis;
                speak_data = objects[i].label + " Found";
                var utterThis = new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis);
                document.getElementById("status_of_model").innerHTML = "Model Has Detected Object";
                document.getElementById("status").innerHTML = "Status : " + objects[i].label + " Found";
                percentage = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percentage + "%" , objects[i].x + 15 , objects[i].y + 15);
                rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
            }
        }
    }
}