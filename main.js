prediction = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = '<img id="image_captured" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version:",ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/3QY6ITzZb/model.json',modelLoaded);

function modelLoaded() {
    console.log("Model Loaded Successfully!");
}

function speak() {
    var synth = window.speechSynthesis;
    var speak_data = "The Prediction Is "+prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("image_captured");
    classifier.classify(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if(results[0].label == "Amazing"){
            document.getElementById("result_emoji").innerHTML = "&#128076;";
            document.getElementById("quote").innerHTML = "Amazing, just like you";
        }
        if(results[0].label == "Best"){
            document.getElementById("result_emoji").innerHTML = "&#128077";
            document.getElementById("quote").innerHTML = "All The Best For Your Exam Today";
        }
        if(results[0].label == "Victory"){
            document.getElementById("result_emoji").innerHTML = "&#9996;";
            document.getElementById("quote").innerHTML = "Oh! You Won The Drawing Competition Congratulations";
        }
        if(results[0].label == "Unity"){
            document.getElementById("result_emoji").innerHTML = "&#9994;";
            document.getElementById("quote").innerHTML = "Unity in strength!";
        }
        if(results[0].label == "Clap"){
            document.getElementById("result_emoji").innerHTML = "&#128079;";
            document.getElementById("quote").innerHTML = "Happy birthday to you";
        }
        if(results[0].label == "Rock"){
            document.getElementById("result_emoji").innerHTML = "&#129304;";
            document.getElementById("quote").innerHTML = "ROCK & ROLL!!";
        }
        if(results[0].label == "Bye"){
            document.getElementById("result_emoji").innerHTML = "&#128075;";
            document.getElementById("quote").innerHTML = "Have an amazing day";
        }
    }
}